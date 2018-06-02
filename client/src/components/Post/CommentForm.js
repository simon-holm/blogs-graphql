import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { EmojiButton } from '../reusable'

import { COMMENT_BLOG } from '../../graphql/mutations'
import { FEED_QUERY } from '../../graphql/queries'

import withPagination from '../../HOC/withPagination'

class CommentForm extends Component {
  state = { content: '' }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (e, commentBlog, postId) => {
    e.preventDefault()
    if (!this.state.content) return

    const { content } = this.state
    commentBlog({ variables: { id: postId, content } })
    this.setState({ content: '' })
  }

  render() {
    const {
      _id,
      feedVariables: { skip, limit, searchTerm }
    } = this.props
    return (
      <Mutation
        mutation={COMMENT_BLOG}
        optimisticResponse={{
          __typename: 'Mutation',
          commentBlog: {
            __typename: 'Comment',
            _id: 'fakeIDforComment',
            content: this.state.content,
            createdAt: Date.now(),
            _user: {
              __typename: 'User',
              _id: 'fake',
              displayName: 'BAJS'
            },
            _blogPost: {
              __typename: 'Blog',
              _id
            }
          }
        }}
        update={(cache, { data: { commentBlog } }) => {
          const data = cache.readQuery({
            query: FEED_QUERY,
            variables: {
              skip,
              limit,
              searchTerm
            }
          })
          console.log(commentBlog)
          if (!commentBlog._id) console.log('comment has no id', commentBlog)
          const currentPost = data.feed.filter(post => post._id === _id)[0]

          // if the comment already exists we just return

          const commentExists = currentPost.comments.some(
            comment => comment._id === commentBlog._id
          )
          if (commentExists) return

          // just push it in! (make sure duplicates are also handled in subscription)
          currentPost.comments.push({ ...commentBlog })

          cache.writeQuery({
            query: FEED_QUERY,
            data: { ...data }
          })
        }}
      >
        {(commentBlog, { data, error, loading }) => (
          <Form onSubmit={e => this.handleSubmit(e, commentBlog, _id)}>
            <Input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <EmojiButton>
              <span role="img" aria-label="submit button">
                ✒️
              </span>
            </EmojiButton>
          </Form>
        )}
      </Mutation>
    )
  }
}

const Form = styled.form`
  display: flex;

  margin-top: 2rem;
`
const Input = styled.input`
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  padding: 0.1rem;
`

export default withPagination(CommentForm)

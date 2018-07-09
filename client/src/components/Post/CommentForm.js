import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { EmojiButton } from '../reusable'

import { FEED_QUERY } from '../../graphql/queries'

import withPagination from '../../HOC/withPagination'
import withUser from '../../HOC/withUser'

const COMMENT_BLOG = gql`
  mutation commentBlog($id: ID!, $content: String!) {
    commentBlog(id: $id, content: $content) {
      _id
      content
      createdAt
      _user {
        _id
        displayName
      }
      _blogPost {
        _id
      }
    }
  }
`

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
      feedVariables: { skip, limit, searchTerm },
      user
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
              _id: user._id,
              displayName: user.displayName
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
          const currentPost = data.feed.blogs.filter(
            post => post._id === _id
          )[0]

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
            <Textarea
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
const Textarea = styled.textarea`
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  padding: 0.1rem;

  &:focus {
    outline: none;
  }
`

export default withPagination(withUser(CommentForm))

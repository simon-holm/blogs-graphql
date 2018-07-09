import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { EmojiButton } from './reusable'

import withPagination from '../HOC/withPagination'

import { FEED_QUERY } from '../graphql/queries'

import { Form } from './reusable'

const CREATE_POST = gql`
  mutation createBlog($title: String!, $content: String!, $imageUrl: String!) {
    createBlog(title: $title, content: $content, imageUrl: $imageUrl) {
      _id
      title
      content
      imageUrl
    }
  }
`

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    imageUrl: ''
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })

  handleSubmit = (e, createBlog) => {
    const { title, content, imageUrl } = this.state
    e.preventDefault()
    if (!title || !content || !imageUrl)
      return console.log('empty fields! waah')

    createBlog({ variables: { ...this.state } })
    this.props.history.push('/')
  }

  // TODO - Add Update and optimisticUI to mutation?
  render() {
    const { feedVariables } = this.props
    return (
      <div>
        <Mutation
          mutation={CREATE_POST}
          refetchQueries={() => [
            {
              query: FEED_QUERY,
              variables: {
                skip: feedVariables.skip,
                limit: feedVariables.limit,
                searchTerm: feedVariables.searchTerm
              }
            }
          ]}
        >
          {(createBlog, { data, loading, error }) => (
            <Form onSubmit={e => this.handleSubmit(e, createBlog)}>
              <input
                name="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <input
                name="imageUrl"
                placeholder="Link to an Image"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
              <textarea
                name="content"
                placeholder="Your amazing blog-blag goes here"
                rows="4"
                value={this.state.content}
                onChange={this.handleChange}
              />
              <EmojiButton type="submit">
                <span role="img" aria-label="submit button">
                  📬
                </span>
              </EmojiButton>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default withPagination(CreatePost)

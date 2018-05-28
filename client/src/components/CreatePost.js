import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { EmojiButton } from './reusable'
import { FEED_QUERY } from './Feed'

import withPagination from '../HOC/withPagination'

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

  // TODO - Add Update and optimisticUI to mutation
  render() {
    const { feedVariables } = this.props
    return (
      <div>
        <Mutation
          mutation={CREATE_POST}
          update={(cache, { data: { createBlog } }) => {
            const { feed } = cache.readQuery({
              query: FEED_QUERY,
              variables: {
                skip: feedVariables.skip,
                limit: feedVariables.limit,
                searchTerm: feedVariables.searchTerm
              }
            })

            feed.unshift({
              ...createBlog,
              likes: [],
              _user: {
                __typename: 'Mutation',
                displayName: '',
                firstname: '',
                surname: ''
              }
            })

            cache.writeQuery({
              query: FEED_QUERY,
              data: { feed }
            })
          }}
          optimisticResponse={{
            createBlog: {
              __typename: 'Mutation',
              title: this.state.title,
              content: this.state.content,
              imageUrl: this.state.imageUrl
            }
          }}
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
              <EmojiButton type="submit">📬</EmojiButton>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;

  min-width: 50vw;

  input {
    margin-bottom: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`

export default withPagination(CreatePost)

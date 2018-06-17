import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Form, EmojiButton } from './reusable'

import withPagination from '../HOC/withPagination'
//import { FEED_QUERY } from '../graphql/queries'

const EDIT_POST = gql`
  mutation editPost(
    $id: ID!
    $title: String
    $content: String
    $imageUrl: String
  ) {
    updateBlog(id: $id, title: $title, content: $content, imageUrl: $imageUrl) {
      _id
      title
      content
      imageUrl
    }
  }
`

class EditPost extends Component {
  state = {
    title: this.props.post.title,
    content: this.props.post.content,
    imageUrl: this.props.post.imageUrl
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })

  handleSubmit = (e, editPost) => {
    const { title, content, imageUrl } = this.state
    e.preventDefault()
    if (!title || !content || !imageUrl)
      return console.log('empty fields! waah')

    editPost({ variables: { id: this.props.post._id, ...this.state } })
    this.props.toggleEdit()
  }

  render() {
    const { feedVariables } = this.props
    return (
      <Mutation mutation={EDIT_POST}>
        {(editPost, { data, loading, error }) => (
          <Modal>
            <ModalBody>
              <h3>Edit</h3>
              <ToggleButton onClick={this.props.toggleEdit}>❌</ToggleButton>
              <Form onSubmit={e => this.handleSubmit(e, editPost)}>
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
                <EmojiButton type="submit" style={{ marginLeft: 'auto' }}>
                  <span role="img" aria-label="submit button">
                    📬
                  </span>
                </EmojiButton>
              </Form>
            </ModalBody>
          </Modal>
        )}
      </Mutation>
    )
  }
}

const Modal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalBody = styled.div`
  position: relative;
  background: hotpink;
  border-radius: 3px;
  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  height: auto;
  width: auto;
  max-height: 80%;
  max-width: 90%;
`
const ToggleButton = EmojiButton.extend`
  background: white;
  padding: 5px;
  border-radius: 50%;
  font-size: 3rem;
  position: absolute;
  right: -20px;
  top: -25px;
`

export default withPagination(EditPost)

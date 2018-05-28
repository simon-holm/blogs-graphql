import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { EmojiButton } from './reusable'

import { FEED_QUERY } from './Feed'

const LIKE_BLOG = gql`
  mutation likeBlog($id: ID!) {
    likeBlog(id: $id) {
      _id
    }
  }
`

const Post = ({ _id, title, content, imageUrl, likes }) => {
  return (
    <PostBody>
      <h2>{title}</h2>
      <img src={imageUrl} />
      <FlexRow>
        <Mutation
          mutation={LIKE_BLOG}
          update={(cache, { data: { likeBlog } }) => {
            const { feed } = cache.readQuery({ query: FEED_QUERY })

            let currentPost = feed.filter(post => post._id === _id)[0]
            currentPost.likes.push({ ...likeBlog })

            cache.writeQuery({
              query: FEED_QUERY,
              data: { feed }
            })
          }}
          optimisticResponse={{
            likeBlog: {
              __typename: 'Mutation',
              _id
            }
          }}
        >
          {(likeBlog, { data, error, loading }) => (
            <EmojiButton onClick={() => likeBlog({ variables: { id: _id } })}>
              👍
            </EmojiButton>
          )}
        </Mutation>

        {likes.map(like => <Like key={like._id}>❤️</Like>)}
      </FlexRow>
      <pre>{content}</pre>
    </PostBody>
  )
}

const PostBody = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 50px;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  &:last-of-type {
    margin-bottom: 50rem;
  }

  h2 {
    font-size: 4rem;
  }
  pre {
    font-size: 2rem;
  }
  img {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  button {
    margin-right: auto;
  }
`
const FlexRow = styled.div`
  display: flex;
  width: 100%;
`
const Like = styled.p`
  font-size: 3rem;
`

export default Post

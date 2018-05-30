import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { EmojiButton } from './reusable'

import { FEED_QUERY } from './Feed'

import withPagination from '../HOC/withPagination'

const LIKE_BLOG = gql`
  mutation likeBlog($id: ID!) {
    likeBlog(id: $id) {
      _id
    }
  }
`

class Post extends React.Component {
  render() {
    const { _id, title, imageUrl, content, likes, feedVariables } = this.props
    return (
      <PostBody>
        <h2>{title}</h2>
        <img src={imageUrl} />
        <FlexRow>
          <Mutation
            mutation={LIKE_BLOG}
            optimisticResponse={{
              __typename: 'Mutation',
              likeBlog: {
                __typename: 'Like',
                _id
              }
            }}
            update={(cache, { data: { likeBlog } }) => {
              const data = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                  skip: feedVariables.skip,
                  limit: feedVariables.limit,
                  searchTerm: feedVariables.searchTerm
                }
              })

              const currentPost = data.feed.filter(post => post._id === _id)[0]

              /* if the like already exists we just return
                (say if unlimited likes are allowed, spamming likes
                can result in duplicates) */
              const likeExists = currentPost.likes.some(
                like => like._id === likeBlog._id
              )
              if (likeExists) return

              // just push it in! (make sure duplicates are also handled in subscription)
              currentPost.likes.push({ ...likeBlog })

              cache.writeQuery({
                query: FEED_QUERY,
                data: { ...data }
              })
            }}
          >
            {(likeBlog, { data, error, loading }) => (
              <EmojiButton onClick={() => likeBlog({ variables: { id: _id } })}>
                {error ? '🛑' : loading ? '⏱' : '👍'}
              </EmojiButton>
            )}
          </Mutation>

          {likes.length <= 10 ? (
            likes.map(like => <Like key={like._id}>❤️</Like>)
          ) : (
            <React.Fragment>
              <Like>❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️</Like>
              <LikeNumber>
                <span>❌</span>
                {likes.length - 10}
              </LikeNumber>
            </React.Fragment>
          )}
        </FlexRow>
        <pre>{content}</pre>
      </PostBody>
    )
  }
}

const PostBody = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  margin-bottom: 50px;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  &:last-of-type {
    margin-bottom: 10rem;
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
  max-width: 60rem;
  height: 7.5rem;
`

const Like = styled.p`
  font-size: 3rem;
`
const LikeNumber = styled.div`
  padding-top: 12px;
  font-size: 3rem;
  font-family: serif;
  color: white;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0px 0px 5px black;
  span {
    font-size: 2rem;
  }
`
export default withPagination(Post)

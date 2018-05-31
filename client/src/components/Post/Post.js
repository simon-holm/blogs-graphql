import React from 'react'
import styled from 'styled-components'

import Likes from './Likes'
import LikeButton from './LikeButton'

const Post = ({ _id, title, imageUrl, content, likes, comments }) => (
  <PostBody>
    <h2>{title}</h2>
    <img src={imageUrl} alt={title} />
    <FlexRow>
      <LikeButton _id={_id} />
      <Likes likes={likes} />
    </FlexRow>
    <pre>{content}</pre>
    {comments.map(comment => (
      <Comment key={comment._id}>
        <span role="img" aria-label="pin">
          📌
        </span>
        {`${comment._user.displayName}: ${comment.content}`}
      </Comment>
    ))}
  </PostBody>
)

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

const Comment = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  background: white;
  padding: 5px;
  margin: 5px 0;
  transition: transform 0.2s ease-in-out;
  &:nth-child(even) {
    transform: rotate(-1deg);
  }
  &:nth-child(odd) {
    transform: rotate(1deg);
  }
  &:hover {
    transform: rotate(0deg);
  }
`
export default Post

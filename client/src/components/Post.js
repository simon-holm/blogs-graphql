import React from 'react'
import styled from 'styled-components'

const Post = ({ _id, title, content, imageUrl }) => {
  return (
    <PostBody>
      <h2>{title}</h2>
      <img src={imageUrl} />
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

  h2 {
    font-size: 4rem;
  }
  pre {
    font-size: 2rem;
  }
`

export default Post

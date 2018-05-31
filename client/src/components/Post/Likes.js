import React from 'react'
import styled from 'styled-components'

const Likes = ({ likes }) => {
  if (likes.length <= 10)
    return likes.map(like => (
      <Like key={like._id}>
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </Like>
    ))

  return (
    <React.Fragment>
      <Like>
        <span role="img" aria-label="hearts">
          ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
        </span>
      </Like>
      <LikeNumber>
        <span role="img" aria-label="cross">
          ❌
        </span>
        {likes.length - 10}
      </LikeNumber>
    </React.Fragment>
  )
}

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

export default Likes

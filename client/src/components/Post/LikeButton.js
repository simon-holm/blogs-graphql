import React from 'react'
import { Mutation } from 'react-apollo'

import { EmojiButton } from '../reusable'

import { LIKE_BLOG } from '../../graphql/mutations'
import { FEED_QUERY } from '../../graphql/queries'

import withPagination from '../../HOC/withPagination'

const LikeButton = ({ _id, feedVariables: { skip, limit, searchTerm } }) => {
  return (
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
            skip,
            limit,
            searchTerm
          }
        })

        const currentPost = data.feed.blogs.filter(post => post._id === _id)[0]

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
          <span role="img" aria-label="like-button">
            {error ? '👌' : loading ? '🤜' : '👍'}
          </span>
        </EmojiButton>
      )}
    </Mutation>
  )
}

export default withPagination(LikeButton)

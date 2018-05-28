import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Post from './Post'

export const FEED_QUERY = gql`
  {
    feed {
      _id
      title
      content
      imageUrl
      likes {
        _id
      }
      _user {
        displayName
        firstname
        surname
      }
    }
  }
`

const Feed = () => (
  <Query query={FEED_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return data.feed.map(post => <Post key={post._id} {...post} />)
    }}
  </Query>
)

export default Feed

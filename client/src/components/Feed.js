import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { EmojiButton } from './reusable'

import FeedList from './FeedList'

import withPagination from '../HOC/withPagination'

export const FEED_QUERY = gql`
  query feed($skip: Int, $limit: Int, $searchTerm: String) {
    feed(skip: $skip, limit: $limit, searchTerm: $searchTerm) {
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
const LIKES_SUBSCRIPTION = gql`
  subscription newLike {
    newLike {
      _id
      _user {
        _id
      }
      _blogPost {
        _id
      }
    }
  }
`

class Feed extends Component {
  render() {
    const {
      feedVariables: { skip, limit, searchTerm },
      paginateBack,
      paginateForward
    } = this.props

    return (
      <React.Fragment>
        <Query query={FEED_QUERY} variables={{ skip, limit, searchTerm }}>
          {({ subscribeToMore, loading, error, data, refetch }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`

            return (
              <React.Fragment>
                <FeedList
                  feed={data.feed}
                  subscribeToNewLikes={() =>
                    subscribeToMore({
                      document: LIKES_SUBSCRIPTION,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev

                        const newLike = subscriptionData.data.newLike

                        // check if the newLike already exists and return early if so
                        const isDuplicateLike = prev.feed
                          .filter(post => post._id === newLike._blogPost._id)[0]
                          .likes.some(like => newLike._id === like._id)

                        if (isDuplicateLike) return prev

                        let newFeed = []
                        // TODO 💀 uugh ineffective! how to do better?
                        for (let post of prev.feed) {
                          if (post._id === newLike._blogPost._id) {
                            newFeed.push({
                              ...post,
                              likes: [
                                { _id: newLike._id, __typename: 'Like' },
                                ...post.likes
                              ]
                            })
                          } else {
                            newFeed.push({ ...post })
                          }
                        }

                        return { ...prev, feed: newFeed }
                      }
                    })
                  }
                />
                <Pagination>
                  {!!skip && (
                    <EmojiButton onClick={() => paginateBack()}>👈</EmojiButton>
                  )}

                  {data.feed.length === 5 && (
                    <EmojiButton
                      style={{ marginLeft: 'auto' }}
                      onClick={() => paginateForward()}
                    >
                      👉
                    </EmojiButton>
                  )}
                </Pagination>
              </React.Fragment>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;

  width: 50vw;
  margin: 10rem 0;
`

export default withPagination(Feed)

import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { EmojiButton } from './reusable'

import Post from './Post'

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

    console.log('feed rendered')
    return (
      <React.Fragment>
        <Query query={FEED_QUERY} variables={{ skip, limit, searchTerm }}>
          {({ subscribeToMore, loading, error, data, refetch }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`

            return (
              // Designa om.. så en komponent ansvarar för att mappa upp...
              // då bara 1 subscribeToMore listener
              <React.Fragment>
                {data.feed.map(post => (
                  <Post
                    key={post._id}
                    {...post}
                    subscribeToNewLikes={() =>
                      subscribeToMore({
                        document: LIKES_SUBSCRIPTION,
                        updateQuery: (prev, { subscriptionData }) => {
                          console.log(prev.feed[0].likes.length)
                          console.log('that was prev')
                          if (!subscriptionData.data) return prev

                          const newLike = subscriptionData.data.newLike
                          console.log({ newLike })
                          let newFeed = { ...prev }
                          // newFeed.feed.map(post => {
                          //   if (post._id === newLike._blogPost._id) {
                          //     console.log('RÄTT FUCKER')
                          //     console.log(post.likes.length)
                          //     // post.likes = post.likes.concat([{ ...newLike }])
                          //     return Object.assign({}, post, {
                          //       likes: [newLike, ...post.likes]
                          //     })
                          //     console.log(post.likes.length)
                          //   }
                          // })
                          for (let post in newFeed.feed) {
                            if (post._id === newLike._blogPost._id) {
                              console.log('RÄTT POST')
                              Object.assign({}, post, {
                                likes: [newLike, ...post.likes],
                                ...post
                              })
                            }
                          }

                          console.log(newFeed.feed[0].likes.length)

                          console.log({ newFeed })
                          return newFeed
                        }
                      })
                    }
                  />
                ))}
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

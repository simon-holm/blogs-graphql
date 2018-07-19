import React, { Component } from 'react'
import { Query } from 'react-apollo'
import FeedList from './FeedList'
import Pagination from './Pagination'

import withPagination from '../HOC/withPagination'

import {
  LIKES_SUBSCRIPTION,
  COMMENTS_SUBSCRIPTION
} from '../graphql/subscriptions'
import { FEED_QUERY } from '../graphql/queries'

class Feed extends Component {
  render() {
    const {
      feedVariables: { skip, limit, searchTerm }
    } = this.props

    return (
      <React.Fragment>
        <Query query={FEED_QUERY} variables={{ skip, limit, searchTerm }}>
          {({ subscribeToMore, loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`

            const pagesCount = Array.from(
              new Array(Math.ceil(data.feed.count / limit), (e, index) => index)
            )

            return (
              <React.Fragment>
                <FeedList
                  blogs={data.feed.blogs}
                  subscribeToNewLikes={() =>
                    subscribeToMore({
                      document: LIKES_SUBSCRIPTION,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev

                        const newLike = subscriptionData.data.newLike

                        // check if the newLike already exists and return early if so
                        const isDuplicateLike = prev.feed.blogs
                          .filter(post => post._id === newLike._blogPost._id)[0]
                          .likes.some(like => newLike._id === like._id)

                        if (isDuplicateLike) return prev

                        let newBlogs = []
                        for (let post of prev.feed) {
                          if (post._id === newLike._blogPost._id) {
                            newBlogs.push({
                              ...post,
                              likes: [
                                { _id: newLike._id, __typename: 'Like' },
                                ...post.likes
                              ]
                            })
                          } else {
                            newBlogs.push({ ...post })
                          }
                        }

                        return {
                          ...prev,
                          feed: { ...prev.feed, blogs: newBlogs }
                        }
                      }
                    })
                  }
                  subscribeToNewComments={() =>
                    subscribeToMore({
                      document: COMMENTS_SUBSCRIPTION,
                      updateQuery: (prev, { subscriptionData }) => {
                        // TODO! refactor? (just a straight copy of subscribe for likes)
                        if (!subscriptionData.data) return prev

                        const newComment = subscriptionData.data.newComment

                        // check if the newComment already exists and return early if so
                        const isDuplicateComment = prev.feed.blogs
                          .filter(
                            post => post._id === newComment._blogPost._id
                          )[0]
                          .comments.some(
                            comment => newComment._id === comment._id
                          )

                        if (isDuplicateComment) return prev

                        let newBlogs = []
                        for (let post of prev.feed.blogs) {
                          if (post._id === newComment._blogPost._id) {
                            newBlogs.push({
                              ...post,
                              comments: [
                                ...post.comments,
                                { __typename: 'Comment', ...newComment }
                              ]
                            })
                          } else {
                            newBlogs.push({ ...post })
                          }
                        }

                        return {
                          ...prev,
                          feed: { ...prev.feed, blogs: newBlogs }
                        }
                      }
                    })
                  }
                />
                <Pagination pagesCount={pagesCount} />
              </React.Fragment>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default withPagination(Feed)

import gql from 'graphql-tag'

export const LIKES_SUBSCRIPTION = gql`
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
export const COMMENTS_SUBSCRIPTION = gql`
  subscription newComment {
    newComment {
      _id
      createdAt
      content
      _user {
        displayName
      }
      _blogPost {
        _id
      }
    }
  }
`

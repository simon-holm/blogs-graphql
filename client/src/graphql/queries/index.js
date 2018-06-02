import gql from 'graphql-tag'

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
      comments {
        _id
        createdAt
        content
        _user {
          _id
          displayName
        }
      }
      _user {
        _id
        displayName
        firstname
        surname
      }
    }
  }
`

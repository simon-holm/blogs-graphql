import gql from 'graphql-tag'

export const CREATE_POST = gql`
  mutation createBlog($title: String!, $content: String!, $imageUrl: String!) {
    createBlog(title: $title, content: $content, imageUrl: $imageUrl) {
      _id
      title
      content
      imageUrl
    }
  }
`
export const LIKE_BLOG = gql`
  mutation likeBlog($id: ID!) {
    likeBlog(id: $id) {
      _id
    }
  }
`

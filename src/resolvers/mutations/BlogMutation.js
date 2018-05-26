const Blog = require('../../database/models/Blog')

const createBlog = async () => {
  // auth needed here

  // todo: Auth

  //create blogpost
  const blogPost = new Blog({
    title,
    content,
    imageUrl,
    createdAt: new Date.now()
  })

  // Return something
}
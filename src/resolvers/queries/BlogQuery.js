const Blog = require('../../database/models/Blog')

const allBlogs = async (parent, args, context, info) => {
  // authenticate?? no

  // todo: pagination
  const blogs = await Blog.find().lean()
  
  return blogs
}

const oneBlog = async (parent, args, context, info) => {
  // auth?? no?

  const blog = await Blog.findOne({ id: args.id }).lean()

  return blog
}

module.exports = {
  allBlogs,
  oneBlog
}
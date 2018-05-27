const Blog = require('../../database/models/Blog')
const User = require('../../database/models/User')
const Like = require('../../database/models/Like')
const { authenticate } = require('../../utils')

const createBlog = async (
  parent,
  { title, content, imageUrl },
  context,
  info
) => {
  
  // auth needed here
  const userId = authenticate(context)

  //create blogpost
  const blogPost = await new Blog({
    title,
    content,
    imageUrl,
    createdAt: Date.now(),
    _user: userId // ? id matching user._id is it enough?
  }).save()

  // Return blogpost
  return blogPost
}

const likeBlog = async (parent, args, context, info) => {
  // authenticate
  const userId = authenticate(context)

  const blogPost = await Blog.findById(args.blogId)

  if (!blogPost) throw new Error('The blog does not exist and cannot be liked!')

  const like = await new Like({
    _user: userId,
    _blogPost: args.blogId
  }).save()

  return like
}

module.exports = {
  createBlog,
  likeBlog
}

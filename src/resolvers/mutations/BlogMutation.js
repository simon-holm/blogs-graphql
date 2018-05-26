const Blog = require('../../database/models/Blog')
const User = require('../../database/models/User')
const { authenticate } = require('../../utils')

const createBlog = async (
  parent,
  { title, content, imageUrl },
  context,
  info
) => {
  // auth needed here
  console.log('in createBlog - context', context)
  console.log(authenticate)
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

module.exports = {
  createBlog
}

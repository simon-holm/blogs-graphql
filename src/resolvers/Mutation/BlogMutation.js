const Blog = require('../../database/models/Blog')
const User = require('../../database/models/User')
const Like = require('../../database/models/Like')
const Comment = require('../../database/models/Comment')

const { pubSub } = require('../index')

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
    _user: userId
  }).save()

  // Return blogpost
  return blogPost
}

const likeBlog = async (parent, args, context, info) => {
  try {
    // authenticate
    const userId = authenticate(context)

    const blogPost = await Blog.findById(args.id)
    if (!blogPost)
      throw new Error('The blog does not exist and cannot be liked!')

    const alreadyLiked = await Like.findOne({
      $and: [{ _user: userId }, { _blogPost: args.id }]
    })
    if (alreadyLiked) throw new Error('User already liked this post')

    const like = await new Like({
      _user: userId,
      _blogPost: args.id
    }).save()

    // notify for subscription
    context.pubsub.publish('newLike', { newLike: like })

    return like
  } catch (error) {
    throw new Error(error)
  }
}

const commentBlog = async (parent, args, context, info) => {
  try {
    const userId = authenticate(context)

    const blogPost = await Blog.findById(args.id)
    if (!blogPost)
      throw new Error('The blog does not exist and cannot be commented on!')

    const comment = await new Comment({
      _user: userId,
      _blogPost: args.id,
      createdAt: Date.now(),
      content: args.content
    }).save()

    // notify subscription
    context.pubsub.publish('newComment', { newComment: comment })

    return comment
  } catch (error) {
    throw new Error(error)
  }
}

const updateBlog = async (
  parent,
  { id, title, content, imageUrl },
  context,
  info
) => {
  try {
    const userId = authenticate(context)

    const blogPost = await Blog.findById({ _id: id })
    if (!blogPost) throw new Error('Could not find blogpost to update!')
    if (blogPost._user.toString() !== userId)
      throw new Error('Can only update your own blogposts!')

    if (title) blogPost.title = title
    if (content) blogPost.content = content
    if (imageUrl) blogPost.imageUrl = imageUrl

    blogPost.save()

    return blogPost
  } catch (error) {
    throw new Error(error)
  }
}

const removeBlog = async (parent, args, context, info) => {
  // remove the blogpost
  const blogPost = await Blog.findById({ _id: args.id })
  if (!blogPost) throw new Error('Could not find the blog to remove')

  blogPost.remove()

  return { _id: id }
}

module.exports = {
  createBlog,
  likeBlog,
  updateBlog,
  commentBlog
}

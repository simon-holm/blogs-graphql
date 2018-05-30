const Blog = require('../../database/models/Blog')

const _blogPost = async (parent, args, context, info) => {
  try {
    const blog = await Blog.findOne({ _id: parent._blogPost })

    if (!blog)
      throw new Error('Could not find the related Blog for the comment')

    return blog
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  _blogPost
}

const Blog = require('../../database/models/Blog')

const _blogPost = async (parent, args, context, info) => {
  //
  const blog = await Blog.findOne({ _id: parent._blogPost })

  if (!blog) throw new Error('Could not find the related Blog for the like')
  
  return blog
}

module.exports = {
  _blogPost
}
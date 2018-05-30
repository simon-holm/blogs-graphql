const Comment = require('../../database/models/Comment')

const comments = async (parent, args, context, info) => {
  // return likes based on parent blogs

  const comments = await Comment.find({ _blogPost: parent._id }).lean()

  return comments
}

module.exports = { comments }

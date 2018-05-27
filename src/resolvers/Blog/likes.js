const Like = require('../../database/models/Like')

const likes = async (parent, args, context, info) => {
  // return likes based on parent blogs

  const likes = await Like.find({ _blogPost: parent._id }).lean()

  return likes
}

module.exports = { likes }

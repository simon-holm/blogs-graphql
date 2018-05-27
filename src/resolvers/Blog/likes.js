const Like = require('../../database/models/Like')

const likes = async (parent, args, context, info) => {
  // return likes based on parent blogs
  console.log({
    parent,
    args,
    context,
    info
  })

  const likes = Like.find({ _blogPost: parent._id }).lean()

  return likes
}

module.exports = { likes }

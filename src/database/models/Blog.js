const mongoose = require('mongoose')
const { Schema } = mongoose

const blogSchema = new Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

// Statics maybe pointless in GraphQL?? wait and see
blogSchema.statics.nbrOfLikes = function(id) {
  const blogPost = mongoose.model('Blog')

  return blogPost.findById(id).then(blog => blog.likes.length)
}

module.exports = mongoose.model('Blog', blogSchema)

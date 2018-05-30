const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _blogPost: { type: Schema.Types.ObjectId, ref: 'Blog' },
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true }
})

module.exports = mongoose.model('Comment', commentSchema)

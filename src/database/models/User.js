const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  displayName: {
    type: String,
    unique: true,
    required: true
  },
  firstname: { type: String },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false, required: true }
})

module.exports = mongoose.model('User', userSchema)

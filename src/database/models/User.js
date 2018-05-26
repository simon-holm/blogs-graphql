const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  displayName: {
    type: String,
    unique: true
  },
  firstname: { type: String },
  surname: { type: String },
  email: { type: String, required, unique },
  password: { type: String, select: false, required }
})

mongoose.model('User', userSchema)

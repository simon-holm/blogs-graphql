const newLike = require('./newLike')
const newComment = require('./newComment')

module.exports = {
  ...newLike,
  ...newComment
}

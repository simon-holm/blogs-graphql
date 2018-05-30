const likes = require('./likes')
const comments = require('./comments')
const _user = require('./user')

module.exports = {
  ...comments,
  ...likes,
  ..._user
}

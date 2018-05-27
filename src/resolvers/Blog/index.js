const likes = require('./likes')
const _user = require('./user')

module.exports = {
  ...likes,
  ..._user
}

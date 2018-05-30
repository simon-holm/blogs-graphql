const _user = require('./user')
const _blogPost = require('./blog')

module.exports = {
  ..._user,
  ..._blogPost
}

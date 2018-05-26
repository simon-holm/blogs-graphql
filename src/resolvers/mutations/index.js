const AuthMutation = require('./AuthMutation')
const BlogMutation = require('./BlogMutation')

module.exports = {
  ...AuthMutation,
  ...BlogMutation
}
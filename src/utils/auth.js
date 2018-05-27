const jwt = require('jsonwebtoken')
const { SESSION_SECRET } = require('./../config/config')

const authenticate = context => {
  const Authorization = context.request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, SESSION_SECRET)

    return userId
  }

  throw new Error('Not authorized')
}

module.exports = {
  authenticate
}

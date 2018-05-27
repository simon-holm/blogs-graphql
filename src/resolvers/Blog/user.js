const User = require('../../database/models/User')

const _user = async (parent, args, context, info) => {
  //
  const user = await User.findOne({ _id: parent._user })

  if (!user) throw new Error('Could not find the User who liked')

  return user
}

module.exports = {
  _user
}

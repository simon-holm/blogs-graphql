const User = require('../../database/models/User')

const _user = async (parent, args, context, info) => {
  try {
    const user = await User.findOne({ _id: parent._user })

    if (!user) throw new Error('Could not find the User who commented')

    return user
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  _user
}

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../database/models/User')
const { SESSION_SECRET } = require('../../config/config')

const signup = async (
  parent,
  { email, password, displayName, firstname, surname },
  context,
  info
) => {
  // check if already a user with email

  try {
    let user = await User.findOne({
      $or: [{ email }, { displayName }]
    }).lean()

    if (user) {
      throw new Error({
        message: 'Name or Email already exists',
        email: user.email,
        displayName: user.displayName,
        user
      })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    // persist the user in db
    user = await new User({
      displayName,
      email,
      password: hashedPassword,
      firstname,
      surname
    }).save()

    // sign jwt
    const token = jwt.sign({ userId: user._id }, SESSION_SECRET)
    console.log({
      token, user
    })
    //return token and user
    return {
      token,
      user
    }
  } catch (error) {
    throw new Error(error)
  }
}

const login = async (parent, args, context, info) => {
  try {
    const user = await User.findOne(
      { email: args.email }
    ).select('+password').lean()
    console.log(user)

    if (!user) throw new Error('User not found')

    // check if password is matching
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) throw new Error('Invalid password')

    // clean up password before sending response
    user.password = undefined

    // sign token and return token + user
    return {
      token: jwt.sign({ userId: user._id }, SESSION_SECRET),
      user
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  signup,
  login
}

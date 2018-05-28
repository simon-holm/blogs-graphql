const { withFilter } = require('graphql-subscriptions')
const { pubSub } = require('../index')

const subscribe = (parent, args, { pubsub }) => {
  console.log(pubsub)
  return pubsub.asyncIterator('newLike', (payload, variables) => payload.like)
}

module.exports = {
  newLike: {
    subscribe
  }
}

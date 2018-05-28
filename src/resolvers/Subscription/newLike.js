const subscribe = (parent, args, { pubsub }) => {
  return pubsub.asyncIterator('newLike', (payload, variables) => payload.like)
}

module.exports = {
  newLike: {
    subscribe
  }
}

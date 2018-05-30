const subscribe = (parent, args, { pubsub }) => {
  return pubsub.asyncIterator(
    'newComment',
    (payload, variables) => payload.comment
  )
}

module.exports = {
  newComment: {
    subscribe
  }
}

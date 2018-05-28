import { GraphQLServer, PubSub } from 'graphql-yoga'
import mongoose from 'mongoose'

import { DB_URI } from './config/config'

import resolvers from './resolvers'
console.log(resolvers)

mongoose.Promise = global.Promise

mongoose.connect(DB_URI)

mongoose.connection
  .once('open', () => console.log('MongoDB connected!'))
  .on('error', () => console.error('MongoDB connection error!'))

const pubsub = new PubSub()
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, pubsub })
})
server.start(() => console.log('Server is running on localhost:4000'))

import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'

import { DB_URI } from './config/config'

import Query from './resolvers/queries'
import Mutation from './resolvers/mutations'

mongoose.Promise = global.Promise

mongoose.connect(DB_URI)

mongoose.connection
  .once('open', () => console.log('MongoDB connected!'))
  .on('error', () => console.error('MongoDB connection error!'))

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({...req})
})
server.start(() => console.log('Server is running on localhost:4000'))

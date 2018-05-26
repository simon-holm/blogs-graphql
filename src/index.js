import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(
  'mongodb://spixooze:abc123@ds219040.mlab.com:19040/blogs-graphql'
)

mongoose.connection
  .once('open', () => console.log('MongoDB connected!'))
  .on('error', () => console.error('MongoDB connection error!'))

const typeDefs = `
type Query {
  hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name || 'World'}`
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))

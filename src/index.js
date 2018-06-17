import { GraphQLServer, PubSub } from 'graphql-yoga'
import mongoose from 'mongoose'

import { DB_URI } from './config/config'

import resolvers from './resolvers'

mongoose.Promise = global.Promise

mongoose.connect(DB_URI)

mongoose.connection
  .once('open', () => console.log('MongoDB connected!'))
  .on('error', () => console.error('MongoDB connection error!'))

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, pubsub: new PubSub() })
})

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.express.get('/', (req, res) => res.send('<h1>HEJ</h1>'))

server.start(options, ({ port }) =>
  console.log(`Server is running on port:${port}`)
)

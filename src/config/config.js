const Config = {
  SESSION_SECRET: process.env.SESSION_SECRET || '1928kojdoiu3rlkjd',
  DB_URI: process.env.DB_URI || 'mongodb://spixooze:abc123@ds219040.mlab.com:19040/blogs-graphql'
}

module.exports = {
  ...Config
}
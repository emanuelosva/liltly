const mongoose = require('mongoose')
const config = require('../config/database')
const logger = require('./utils/logger')

mongoose.Promise = global.Promise

const MongoConnection = mongoose.createConnection(config.mongodb.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  auth: {
    user: config.mongodb.USER,
    password: config.mongodb.PASSWORD
  },
  poolSize: 10
})

MongoConnection.once('open', () => logger.info('Mongo db connection open'))

MongoConnection.on('connected', () => logger.info('Mongo DB - connection stablished'))

MongoConnection.on('disconnected', () => logger.info('Mongo connection is disconnected'))

MongoConnection.on('error', (error) => {
  logger.error(`Error on mongo db: ${error.message}`)
  process.exit(1)
})

process.on('SIGINT', () => {
  MongoConnection.close(() => {
    logger.info('Mongo connection is disconnected due to application termination')
    process.exit(1)
  })
})

module.exports = {
  MongoConnection
}

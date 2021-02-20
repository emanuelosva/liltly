const prefix = require('./environment')

module.exports = {
  mongodb: {
    URI: process.env[`${prefix}MONGODB_URI`] || '',
    USER: process.env[`${prefix}MONGODB_USER`] || '',
    PASSWORD: process.env[`${prefix}MONGODB_PASSWORD`] || ''
  }
}

const logger = require('./logger')

const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    logger.error(`${url} is not a valid url`)
    return false
  }
}

module.exports = {
  isValidURL
}

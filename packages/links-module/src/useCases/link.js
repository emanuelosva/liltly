const { BussinesError, logger, validators } = require('../utilities')
const { errorTypes } = require('../constants')

const makeLinkUseCases = ({ model, hashGenerator }) => {
  const createShortUrl = async ({ originalUrl, fullHostNameURL }) => {
    if (!validators.isValidURL(originalUrl) || !validators.isValidURL(fullHostNameURL)) {
      logger.error(`Error on create link - invalid url: ${originalUrl} or hotname: ${fullHostNameURL}`)
      BussinesError.throwError(`Error on create link - invalid url: ${originalUrl} or hotname: ${fullHostNameURL}`, 400)
    }

    let url
    try {
      url = await model.create({ originalUrl, hash: hashGenerator() })
    } catch (error) {
      BussinesError.throwError(errorTypes.WRITE_DATA_BASE_ERROR)
    }
    return `${fullHostNameURL}/${url.hash}`
  }

  const readUrlByHash = async (hash, select = { _id: 1, originalUrl: 1 }) => {
    if (!hash) BussinesError.throwError('The hash is required', 400)

    let link
    try {
      link = await model.findOne({ hash }, select)
    } catch (error) {
      logger.error(`Error on read url by hash: ${error.message}`)
      BussinesError.throwError(errorTypes.READ_DATA_BASE_ERROR)
    }
    return link
  }

  return Object.freeze({
    createShortUrl,
    readUrlByHash
  })
}

module.exports = makeLinkUseCases

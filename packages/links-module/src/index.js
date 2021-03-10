const { makeLinkUseCases } = require('./useCases')
const { LinkModel } = require('./entities')
const { nanoid } = require('nanoid')

module.exports = {
  linkService: makeLinkUseCases({
    model: LinkModel,
    hashGenerator: () => nanoid(10)
  })
}

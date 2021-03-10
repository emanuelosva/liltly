const { makeLinkUseCases } = require('./useCases')
const { LinkModel } = require('./entities')
const { nanoId } 

module.exports = {
  linkServices: makeLinkUseCases({ model: LinkModel, hashGenerator: })
}
const { BusinessError: { BuildBusinessError } } = require('@liltly/common-module')
const config = require('../../config')

module.exports = new BuildBusinessError(config.MODULE_NAME)

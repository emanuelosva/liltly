const { Logger } = require('@liltly/common-module')
const config = require('../../config')

const logger = new Logger(config.MODULE_NAME)
module.exports = logger

const dotenv = require('dotenv')
const path = require('path')
const { supportedEnvs } = require('../src/utils/constants')


let environment
let env = '.env'
const pathToEnvFile = path.resolve(__dirname, '../', env)

switch(process.env.NODE_ENV) {
  case supportedEnvs.PRODUCTION:
    environment = ''
    break
  case supportedEnvs.DEVELOPMENT:
    environment = 'DEV_'
    break
}

dotenv.config({ path: pathToEnvFile })

module.exports = environment

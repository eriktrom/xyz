import Winston from 'winston'
import Config from './config'
import 'winston-redis'

let Logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)({ level: 'log' }),
    new (Winston.transports.Redis)({ level: 'debug', length: 0, container: 'xyz'}),
    new (Winston.transports.File)({ filename: Config.winstonLogPath, level: 'debug' })
  ]
})

export default Logger

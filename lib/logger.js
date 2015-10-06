import Winston from 'winston'
import Config from './config'

let Logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)({ level: 'log' }),
    new (Winston.transports.File)({ filename: Config.winstonLogPath, level: 'debug' })
  ]
})

export default Logger

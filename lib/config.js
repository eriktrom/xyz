require('dotenv').config()
import Path from 'path'
import Fs from 'fs'
import Mkdirp from 'mkdirp'

const Config = {
  get logDir() {
    return Path.resolve(__dirname, '..', 'log')
  },

  get esLogPath() {
    Mkdirp.sync(Config.logDir)
    return Path.resolve(this.logDir, `${process.env.NODE_ENV}.elasticsearch.log`)
  },

  get winstonLogPath() {
    Mkdirp.sync(Config.logDir)
    return Path.resolve(this.logDir, `${process.env.NODE_ENV}.winston.log`)
  },

  /*
  TODO: this list of types should be dynamic, meaning at runtime I should
  be able to add to it and start a new connection to a new slack, irc, gitter
  team/channel on the fly.

  This should drop when UI configured index templates for ES land. The UI
  seems similar and I'll know more by then about ES in general
   */
  types: {
    get slack() {
      if (this._slack) return this._slack
      return JSON.parse(Fs.readFileSync(process.env.CONFIGURED_TEAMS_PATH))
    },

    set slack(val) {
      this._slack = val
    }
  }
}

export default Config

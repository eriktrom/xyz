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

  get configuredTeamsPath() {
    return process.env.CONFIGURED_TEAMS_PATH || 'teams.json'
  },

  /*
  TODO: This list of types should be dynamic, meaning at runtime I should
  be able to add to it and start a new connection to a new slack, irc or gitter
  team/channel on the fly. Consider any streaming api for thought experiment.
  Twitter for example, is obvious here too, although i'm not a fan, but others are.

  This should be considered along with UI configured index templates for ES.
  The UI seems similar and I'll know more by then about ES in general.
   */
  types: {
    get slack() {
      if (this._slack) return this._slack

      try {
        return JSON.parse(Fs.readFileSync(Config.configuredTeamsPath))
      } catch(err) {
        if (/teams\.json/.test(err.message)) {

          let msg = `
Please make a teams.json in root of the application or make an env
variable named CONFIGURED_TEAMS_PATH that points to its path.

It may contain:

  {
    "hapi": {
      "name": "Hapi Community",
      "index": "hapicommunity.slack.com",
      "token": "a-token-that-you-should-not-commit-to-git"
    },
    "ember": {
      "name": "Ember Community",
      "index": "embercommunity.slack.com",
      "token": "a-different-token-keep-me-safe"
    },
    "work": {
      "name": "A Nice Place to Work During the Day",
      "index": "somaplacenice.slack.com",
      "token": "keep-extremely-safe"
    }
  }
          `;

          if (process.env.NODE_ENV !== 'test') console.error(msg, err)
        } else {
          throw err
        }
      }
    },

    // now that i've done this setter stuff > 1 in this lib, do i like it?
    // It makes the getter easier to test. Yay, nay?
    set slack(val) { this._slack = val }
  }
}

export default Config

import utils from './utils'
import SlackHttpClient from '../../lib/connections/slack/http'
import Config from '../../lib/config'

// To run the slack http client tests, cd into rack-vcr-proxy and run rake start
let slackHttpClient = new SlackHttpClient({
  host: 'http://localhost:9001',
  token: Config.types.slack.ember.token
})

export default function World(callback) {
  let world = {
    utils,
    slackHttpClient
  }
  callback(world)
}

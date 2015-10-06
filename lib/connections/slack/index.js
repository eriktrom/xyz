/* $lab:coverage:off$ */
import Promise from 'bluebird'
import Config from '../../config'
import SlackSocketClient from './socket'
import SlackHttpClient from './http'
/* $lab:coverage:on$ */

export default {
  start() {
    let slack = Config.types.slack,
        connections = []

    for (let teamName in slack) {
      if (!{}.hasOwnProperty.call(slack, teamName)) continue;

      let team = slack[teamName]
      connections.push(this.newConnection(team))
    }

    return Promise.all(connections)
  },

  newConnection(team, HttpClient=SlackHttpClient, SocketClient=SlackSocketClient) {
    return new HttpClient({token: team.token})
      .get('rtm.start')
      .then(body => new SocketClient(body.url, team).connect())
  }
}

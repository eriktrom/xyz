import WebSocket from 'ws'
import Logger from '../../logger'
import Es from '../../es'

// TODO: when losing internet connection no failure currently surfaces.
// TODO: after fixing ^^, do an exponential connection backoff retry, copy it from nes

export default class Socket {

  constructor(url, team) {
    if (!url || !team) throw Error('Must pass url and team to make a new slack socket connection')

    this.name = team.name
    this.index = team.index
    this.connection = new WebSocket(url)
  }

  connect() {
    this.connection.on('open', this.didReceiveOpen.bind(this));
    this.connection.on('close', this.didReceiveClose.bind(this));
    this.connection.on('message', this.didReceiveMessage.bind(this))
    this.connection.on('error', this.didReceiveError.bind(this))
  }

  didReceiveMessage(message) {
    let data = JSON.parse(message)
    let newRecord = {index: this.index, type: data.type, body: data}
    Logger.info(data);
    return Es.client.index(newRecord)
  }

  didReceiveOpen() {
    Logger.info(`native - open: The connection to ${this.name} has been opened`)
  }

  didReceiveClose() {
    Logger.info(`native - close: The connection to ${this.name} has been closed`)
  }

  didReceiveError(err) {
    Logger.error('Slack websocket error event received', err)
  }
}

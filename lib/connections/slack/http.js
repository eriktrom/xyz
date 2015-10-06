import Wreck from 'wreck'
import Promise from 'bluebird'
import Hoek from 'hoek'
import QueryString from 'querystring'
import Logger from '../../logger'

Promise.promisifyAll(Wreck)

export default class HttpClient {

  constructor(options={}) {
    options = Hoek.applyToDefaults({
      host: 'https://slack.com'
    }, options)

    if (!options.token) throw Error('Must provide api token when instantiating a new slack http client')

    this.host = options.host
    this.token = options.token
  }

  get() {
    return this._request(...arguments)
  }

  getAllChannelHistory(options={}) {
    options = Hoek.applyToDefaults({
      delay: 20000
    }, options)

    let delay = Number(options.delay)
    var self = this;
    function waitThenFetch(channel, idx) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          Logger.info("channel.id is %o", channel.id);
          resolve(self.get('channels.history', {query: {channel: channel.id, latest: '1443068979.007719'}}))
        }, delay*(idx+1))
      })
    }

    return this.get('channels.list')
      .then(res => {

        var responses = []
        for (var i = 0; i < res.channels.length; i++) {
          var channel = res.channels[i]
          responses.push(waitThenFetch(channel, i))
        }

        return Promise.settle(responses)
      })
  }

  // private

  _request(type, options={ query: {} }) {
    let defaults = { method: 'GET', requestOptions: {} }
    options = Hoek.applyToDefaults(defaults, options)

    let method = options.method,
        url = this._buildUrl(type, options.query),
        requestOptions = options.requestOptions;

    return Wreck.requestAsync(method, url, requestOptions)
      .then(res => Wreck.readAsync(res, {json: 'force'}))
      .then(body => {
        if (body.ok) return body
        else throw Error(body)
      })
      .catch(err => Logger.error(`Error reading response for ${type} with options ${options}`, err))
  }

  _buildUrl(type, query={}) {
    query = Hoek.applyToDefaults({token: this.token}, query)
    return `${this.host}/api/${type}?${QueryString.stringify(query)}`
  }
}

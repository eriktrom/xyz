import Promise from 'bluebird'
import Hoek from 'hoek'
import ElasticSearch from 'elasticsearch'
import Config from '../config'

const Es = {

  set client(client) {
    this._client = client
  },

  get client() {
    if (this._client) return this._client
    else throw Error('You must call create before using a getter to get the client')
  },

  create(options={}) {
    return Promise.resolve(new ElasticSearch.Client(Hoek.applyToDefaults({
      hosts: [
        {
          host: 'localhost',
          port: '9200'
        }
      ],
      log: {
        type: 'file',
        level: 'trace',
        path: Config.esLogPath, // TODO: handle environments, connection pool, winston, etc
        sniffOnStart: true,
        sniffInterval: 60000,
        sniffOnConnectionFault: true,
        maxSockets: 30,
        suggestCompression: true
      },
      defer: () => Promise.defer(),
      apiVersion: '1.7'
    }, options))).then(client => {
      this.client = client
      return client
    })
  }
}

export default Es

import Code from 'code'
import Lab from 'lab'
import Promise from 'bluebird'

import Es from '../../../lib/es'
import ElasticSearch from 'elasticsearch'

export const lab = Lab.script();
const [, afterEach, describe, context, expect, it] =
  [lab.beforeEach, lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]


describe(`Es`, () => {

  let originalElasticSearchClient = ElasticSearch.Client
  afterEach(done => {
    ElasticSearch.Client = originalElasticSearchClient
    Es.client = void 0;
    done()
  })

  context(`#create`, () => {
    it(`should merge pass options with defaults`, done => {
      ElasticSearch.Client = (options) => {
        expect(options.hosts[0].host).to.equal('localhost')
        expect(options.hosts[0].port).to.equal('9200')
        expect(options.apiVersion).to.equal('oh hai')
        return Promise.resolve('oh hai, im a client')
      }

      Es.create({apiVersion: 'oh hai'})
      done()
    })
  })

  context(`get #client`, () => {
    it(`should throw an error when create has not been called yet`, done => {
      try {
        Es.client
      } catch(err) {
        expect(err.message).to.equal('You must call create before using a getter to get the client')
        done()
      }
    })

    it(`should only ever call create once`, done => {
      let counter = 0
      ElasticSearch.Client = () => {
        counter++
        return Promise.resolve('oh hai, im a client')
      }

      Es.create().then(client => {
        expect(client, 'should return the client').to.equal('oh hai, im a client')
        expect(Es.client).to.equal('oh hai, im a client')
        expect(Es.client).to.equal('oh hai, im a client')
        expect(counter).to.equal(1)
        done()
      })
    })
  })

  context(`set #client`, () => {
    it(`should set the client`, done => {
      Es.client = 'booyah'
      expect(Es.client).to.equal('booyah')
      done()
    })
  })

})

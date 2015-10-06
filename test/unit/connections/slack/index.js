import Code from 'code'
import Lab from 'lab'
import Promise from 'bluebird'

export const lab = Lab.script();
const [, afterEach, describe, , expect, it] =
  [lab.beforeEach, lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]

import Config from '../../../../lib/config'
import Connections from '../../../../lib/connections/slack'

describe(`#start`, () => {

  let originalConfig = Config.types.slack
  let originalNewConnection = Connections.newConnection
  afterEach(done => {
    Config.types.slack = originalConfig
    Connections.newConnection = originalNewConnection
    done()
  })

  it(`should use the http client to create a new web socket connection for each slack type in config`, done => {
    Config.types.slack = {
      trom: {
        name: 'Trom Slack Team',
        index: 'trom.slack.com',
        token: 'my-trom-community-slack-token'
      },

      booyah: {
        name: 'Da Hoopla Community',
        index: 'hoopla.slack.com',
        token: 'abc-booyah-community-is-not-for-me'
      }
    }

    let counter = 0
    Connections.newConnection = function(team) {
      counter++
      return Promise.resolve({counter, team})
    }

    /*
    This is a pretty weak smoke test, but nice thing is it does not
    test implementation details, just that we literally return an array
    of promise connections made by calling Connections.newConnection, where
    newConnection also returns a promise

    The real logic lies within calling rtm.start and handling messages from
    the web socket we open after doing so. This logic is hard to unit test
    so we use cucumber to test rtm.start and ATM we don't test the incoming
    websocket message handling but will do so when we create our own web socket
    server for our own front end client. See similar note in the socket file
     */
    Connections.start().then((connections) => {
      expect(counter).to.equal(2)

      let c1 = connections[0]
      let c2 = connections[1]

      expect(c1.team.name).to.equal('Trom Slack Team')
      expect(c1.team.index).to.equal('trom.slack.com')
      expect(c1.team.token).to.equal('my-trom-community-slack-token')
      expect(c1.counter).to.equal(1)

      expect(c2.team.name).to.equal('Da Hoopla Community')
      expect(c2.counter).to.equal(2)

      done()
    })
  })

  it(`should have the following interface`, done => {
    expect(typeof Connections.start).to.equal('function')
    expect(typeof Connections.newConnection).to.equal('function')
    done()
  })
})

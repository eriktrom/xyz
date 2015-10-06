import Code from 'code'
import Lab from 'lab'

import Socket from '../../../../lib/connections/slack/socket'

export const lab = Lab.script();
const [, , describe, , expect, it] =
  [lab.beforeEach, lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]

/*
TODO: this is hard to test. A good test would just start a web socket server
and assert that things really work as by actually opening, closing, erroring
and sending messages to this client

B/c the logic in this class is so simple, we pass for now. In the future
when we create a web socket server for our client side app, we'll use
that logic to setup a fake here and finish this test off
 */
describe(`SlackSocketClient`, () => {
  it(`should exist`, done => {
    expect(Socket).to.exist()
    done()
  })

  it(`should have the following interface`, done => {
    expect(typeof Socket.prototype.connect).to.equal('function')
    expect(typeof Socket.prototype.didReceiveMessage).to.equal('function')
    expect(typeof Socket.prototype.didReceiveOpen).to.equal('function')
    expect(typeof Socket.prototype.didReceiveClose).to.equal('function')
    expect(typeof Socket.prototype.didReceiveError).to.equal('function')
    done()
  })
})

import Code from 'code'
import Lab from 'lab'

export const lab = Lab.script();
const [, , describe, , expect, it] =
  [lab.beforeEach, lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]

import SlackHttpClient from '../../../../lib/connections/slack/http'

/*
@see features/step-definitions/slack/http-client-steps for e2e tests that
actually make real http requests with the slack http client

Make sure to cd rack-vcr-proxy then run rake start to prevent actually hitting
the slack api when running those e2e tests
 */

describe(`SlackHttpClient`, () => {
  it(`should exist`, done => {
    expect(SlackHttpClient).to.exist()
    done()
  })

  it(`should have the following interface`, done => {
    let client = new SlackHttpClient({token: 'some-token'})

    expect(typeof client.get).to.equal('function')
    expect(typeof client.getAllChannelHistory).to.equal('function')
    expect(typeof client._request).to.equal('function')
    expect(typeof client._buildUrl).to.equal('function')

    expect(client.token).to.equal('some-token')

    done()
  })
})

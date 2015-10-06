import Code from 'code'
import Lab from 'lab'

import Logger from '../../lib/logger'
import Catcher from '../../lib/catcher'

export const lab = Lab.script();
const [beforeEach, afterEach, describe, context, expect, it] =
  [lab.beforeEach, lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]

describe(`Catcher get #logger`, () => {
  it(`should return Logger by default`, done => {
    expect(Catcher.logger).to.equal(Logger)
    done()
  })
})

describe(`Catcher`, () => {

  let originalNow = Date.now
  beforeEach(done => {
    Date.now = () => 'stubbed date'
    Catcher.logger = {}
    done()
  })

  afterEach(done => {
    Date.now = originalNow
    Catcher.logger = Logger
    done()
  })

  context(`set #logger`, () => {
    it(`should return a set logger`, done => {
      Catcher.logger = 'blah'
      expect(Catcher.logger).to.equal('blah')
      done()
    })
  })

  context(`#setup`, () => {
    it('should exist', done => {
      expect(typeof Catcher.setup).to.equal('function')
      done()
    })
  })

  context('#logStack', () => {
    it(`should pass an empty string as the msg to Logger.error when none provided`, done => {
      Catcher.logger.error = (msg) => {
        expect(msg).to.equal('')
        done()
      }

      Catcher.logStack(Error('thrown error message'))
    })

    it(`should log custom message when provided as first arg`, done => {
      Catcher.logger.error = (msg) => {
        expect(msg).to.equal('oh hai')
        done()
      }

      Catcher.logStack('oh hai', Error('Boom'))
    })

    it(`should call callback when provided (no msg)`, done => {
      Catcher.logger.error = (msg, formattedError) => {
        let actualError = JSON.parse(formattedError)

        expect(actualError.message).to.equal('thrown error message')
        expect(actualError.stack).to.exist()
        expect(actualError.timestamp).to.equal('stubbed date')
      }

      let callback = () => 'the result of the callback'
      let result = Catcher.logStack(Error('thrown error message'), callback)

      expect(result).to.equal('the result of the callback')
      done()
    })

    it(`should handle a msg, error and callback (smoke test)`, done => {
      let givenCallback = () => 'the result of the callback'

      Catcher.logger.error = (msg, formattedError) => {
        let actualError = JSON.parse(formattedError)

        expect(msg).to.equal('oh hai')
        expect(actualError.message).to.equal('thrown error message')
        expect(actualError.stack).to.exist()
        expect(actualError.timestamp).to.equal('stubbed date')
      }

      let result = Catcher.logStack('oh hai', Error('thrown error message'), givenCallback)
      expect(result).to.equal('the result of the callback')
      done()
    })
  })
})

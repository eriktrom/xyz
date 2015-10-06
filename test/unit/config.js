import Code from 'code'
import Lab from 'lab'
import Config from '../../lib/config'

export const lab = Lab.script();
const [describe, expect, it] = [lab.experiment, Code.expect, lab.test]

describe('Config', () => {

  it('should have slack teams', done => {
    expect(Object.keys(Config.types.slack).length > 0).to.equal(true)
    done()
  })

  it('should provide a log directory', done => {
    expect(Config.logDir).to.contain('log')
    done()
  })

  it(`should provide a log path`, done => {
    expect(Config.esLogPath).to.contain('test.elasticsearch.log')
    done()
  })

});

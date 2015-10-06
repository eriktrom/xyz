import Code from 'code'
import Lab from 'lab'
import Config from '../../lib/config'

export const lab = Lab.script();
const [,, describe, , expect, it] =
  [lab.afterEach,lab.afterEach, lab.experiment, lab.experiment, Code.expect, lab.test]

describe('Config', () => {

  it('should provide a log directory', done => {
    expect(Config.logDir).to.contain('log')
    done()
  })

  it(`should provide a log path`, done => {
    expect(Config.esLogPath).to.contain('test.elasticsearch.log')
    done()
  })

  it(`TEST TODO: it should show a descriptive error when teams.json does not exist`)

});

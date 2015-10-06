import Catcher from './catcher'
import Es from './es'
import Connections from './connections/slack'

if (!module.parent) { start() }

function start() {
  Catcher.setup()

  return Es.create()
    .then(() => Connections.start())
    .catch(err => Catcher.logStack(err, () => process.exit(1)))
}

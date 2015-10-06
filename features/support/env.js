import Code from 'code'
global.expect = Code.expect

// ----- //

import World from './world'
import { aroundHooks, beforeHooks, afterHooks } from './hooks'

import slackHttpClientSteps from '../step-definitions/slack/http-client-steps'

export default function () {
  this.World = World

  beforeHooks.call(this)
  aroundHooks.call(this)
  afterHooks.call(this)

  slackHttpClientSteps.call(this)
}

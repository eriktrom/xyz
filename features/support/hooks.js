export function beforeHooks() {

}

export function afterHooks() {

}

export function aroundHooks() {

}


/*
Examples:

export function aroundHooks() {
  this.Around('@something', function(runScenario) {
    runScenario(function(callback) {
      // this refers to any object included into world
      // if function is thenable, simply return it
      // if its not and its async, must call 'callback'
      // if its sync, must call 'callback'
      return this.doSomethingThenable()
    })
  })
}

export function afterHooks() {
  this.After('@something', function(callback) {
    // do stuff
    // return a thenable or call the callback when your 'done'
  })
}

export function beforeHooks() {
  this.Before('@es-test', function (callback) {
    if (this.esClient.transport._config.host === 'localhost:9220') {
      return this.esClient.indices.delete({index: '_all'})
    } else {
      callback()
    }
  })
}

 */


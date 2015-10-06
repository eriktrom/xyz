let actual;

export default {

  prettyPrint(string) {
    return JSON.stringify(string, null, 2)
  },

  log(log=true) {
    return function(res) {
      actual = res
      if (log) console.log('actual is %o', actual);
      return actual
    }
  }

}

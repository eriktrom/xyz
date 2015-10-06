export default function() {
  this.Given(/^I save "([^"]*)"$/, function (type) {
    return this.slackHttpClient.get(type).then(this.utils.log(false))
  });

  this.Given(/^I save "([^"]*)" with options:$/, function (type, table) {
    let query = table.rowsHash()
    return this.slackHttpClient.get(type, { query }).then(this.utils.log(false))
  });

  this.When(/^I save channel history for all channels$/, function () {
    return this.slackHttpClient.getAllChannelHistory({delay: 1})
      .then(this.utils.log(true))
  });
}

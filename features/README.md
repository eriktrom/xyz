# Cucumber Features

Use cucumber when running end to end tests (e2e) in order to exercise the whole system.

## Using Rack VCR Proxy

To prevent actually hitting api's and becoming rate limited or banned a ruby tool accompanies this repo as a submodule. It is called rack-vcr-proxy and it will reverse proxy request/response cycles and record them for later playback.

To start rack vcr proxy:

    $ cd rack-vcr-proxy

    $ bundle

    $ rake start

In some cases we may need more than one rack reverse proxy running to run all the tests, when those tests hit different hosts. Not a big deal, just start another instance of rack vcr proxy, passing in the ENV variables needed on the
command line before running `rake start`

## Using Cucumber

The general flow is to mark tests that are work in progress with the `@wip` tag, run `make cucumber-auto` and go about your business. Only those Scenarios or Features tagged with `@wip` will run

To run all features, except those with the `@pending` flag, run `make cucumber-all`

## Note of caution

- don't get rate limited, use the proxy
- don't delete data, start a new elastic search cluster when running tests. More on how to do this to come. More than one node per machine is now disabled so Vagrant + Chef is needed to provision a test node.

## Using Elastic Search During Test Runs

TODO

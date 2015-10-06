test:
	./node_modules/.bin/lab --colors --transform ./test/babel-transform.js -a code ./test/unit

auto-test:
	./node_modules/.bin/nodemon --exec ./node_modules/.bin/lab --sourcemaps --colors --debug --transform ./test/babel-transform.js -a code -t 100 -Lv -r console -o stdout -r html -o coverage.html ./test/unit

test-cov:
	./node_modules/.bin/lab --sourcemaps --colors --debug --transform ./test/babel-transform.js -a code -t 100 -Lv -r console -o stdout -r html -o coverage.html ./test/unit



build:
	./node_modules/.bin/babel lib --out-dir dist --source-maps

start:
	make build && NODE_ENV=production node dist/index.js



cucumber-wip:
	NODE_ENV=cucumber ./node_modules/.bin/babel-node ./node_modules/.bin/cucumber.js --tags @wip --require ./features/support/env.js

cucumber-all:
	NODE_ENV=cucumber ./node_modules/.bin/babel-node ./node_modules/.bin/cucumber.js --tags ~@pending --tags ~@wip --require ./features/support/env.js

cucumber-auto-all:
	NODE_ENV=cucumber ./node_modules/.bin/nodemon --exec ./node_modules/.bin/babel-node ./node_modules/.bin/cucumber.js --tags ~@pending --tags ~@wip --require ./features/support/env.js

cucumber-auto:
	NODE_ENV=cucumber ./node_modules/.bin/nodemon --exec ./node_modules/.bin/babel-node ./node_modules/.bin/cucumber.js --tags @wip --require ./features/support/env.js



es-start-test:
	ES_HEAP_SIZE=512m dotenv elasticsearch --cluster.name=elasticsearch-test --config=./elasticsearch.yml

es-start:
	ES_HEAP_SIZE=512m dotenv elasticsearch -Xmx512m -Xms512m --cluster.name=elasticsearch-clifford --network.host=127.0.0.1 --config=./elasticsearch.yml


.PHONY: test build start auto-test cucumber-wip cucumber-all cucumber-auto-all cucumber-auto es-start-test es-start

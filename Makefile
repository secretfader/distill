MOCHA_OPTS= --ui exports

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(MOCHA_OPTS)

.PHONY: test

MOCHA_OPTS= --ui exports --reporter list

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(MOCHA_OPTS)

.PHONY: test

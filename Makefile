TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)

all: test

test:
	./node_modules/.bin/mocha -r should -r co-mocha $(TESTS)

.PHONY: all test
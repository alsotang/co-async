# co-async

[![Build Status](https://travis-ci.org/alsotang/co-async.svg?branch=master)](https://travis-ci.org/alsotang/co-async)

## quick start

```js
var coAsync = require('co-async')
var initValues = {a: 1, b: 2, c: 3, d: 4}

var start = new Date
var values = yield coAsync.map(initValues, 1, function * (v, k) {
  yield sleep(10)
  return v * 2
});
(new Date - start).should.aboveOrEqual(40)
values.should.eql({a: 2, b: 4, c: 6, d: 8})
```

## API

### map(obj, gen)
### map(obj, limit, gen)


`obj` -- array or object. e.g. `[1,2,3,4]` or `{a: 1, b: 2}`

`limit` -- concurrency limit
 
`gen` -- a generator

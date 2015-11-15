var coAsync = require('../../')
var sleep = require('ko-sleep')

describe('test/lib/co_async.test.js', function () {
  it('should ok', function * () {
    true.should.ok()
  })

  it('should get all values with array', function * () {
    var initValues = [1, 2, 3, 4]
    var values = yield coAsync.map(initValues, function * (v, k) {
      return yield Promise.resolve(v)
    })

    values.should.length(initValues.length);
    values.should.eql(initValues)
  })

  it('should get all values with object', function * () {
    var initValues = {a: 1, b: 2, c: 3, d: 4}
    var values = yield coAsync.map(initValues, function * (v, k) {
      return yield Promise.resolve(v)
    })

    values.should.eql(initValues)
  })

  it('should get all values with object but limit 1', function * () {
    var initValues = {a: 1, b: 2, c: 3, d: 4}

    var start = new Date
    var values = yield coAsync.map(initValues, 1, function * (v, k) {
      yield sleep(10)
      return v * 2
    });
    (new Date - start).should.aboveOrEqual(40)
    values.should.eql({a: 2, b: 4, c: 6, d: 8})
  })

  it('should handle error', function * () {
    try {
      yield coAsync.map([1], function * () {
        throw 'haha'
      })
    } catch (e) {
      e.should.eql('haha')
    }
  })


})
var co = require('co')
var async = require('async')

function each(obj, fn) {
  if (Array.isArray(obj)) {
    obj.forEach(fn)
  } else {
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];
      fn(value, key);
    })
  }
}

var map = function (obj, limit, gen) {
  if (!gen) {
    gen = limit;
    limit = Infinity
  }
  return new Promise(function (resolve, reject) {
    var finalResult = Array.isArray(obj) ? [] : {};

    async.forEachOfLimit(obj, limit, function (value, key, done) {
      co(gen(value, key)).then(function (v) {
        finalResult[key] = v
        done()
      }).catch(done)
    }, function (err) {
      if (err) {
        return reject(err)
      }
      resolve(finalResult)
    })
  })

}
exports.map = map;


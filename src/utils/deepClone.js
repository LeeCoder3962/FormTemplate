// JSON.parse(JSON.stringify(obj))
const deepClone = (obj) => {
  var o
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {
    // 如果  他是空的话
    if (obj === null) {
      o = null
    } else {
      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = []
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(deepClone(obj[ i ]))
        }
      } else {
        // 如果  他是对象object的话
        o = {}
        for (var j in obj) {
          o[ j ] = deepClone(obj[ j ])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}
export default deepClone

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}


function deepClone(data) {
  const type = typeOf(data);
  let result;
  if (type === 'array') {
    result = []
  } else if (type === 'object') {
    result = {}
  } else {
    return data
  }

  if (type === 'array') {
    for (const item of data) {
      result.push(deepClone(item))
    }
  } else if (type === 'object') {
    for (const key in data) {
      result[key] = deepClone(data[key]);
    }
  }
  return result
}

export { deepClone }
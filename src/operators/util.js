const empty = require('lodash.isempty')
const get = require('lodash.get')
const unset = require('lodash.unset')

function removeEmptyKeys(target, key) {
  const segments = key.split('.')
  segments
    .map((segment, index) => segments.slice(0, segments.length - index).join('.'))
    .forEach(segment => {
      if (empty(get(target, segment))) {
        unset(target, segment)
      }
    })

  return target
}

module.exports = {
  removeEmptyKeys
}

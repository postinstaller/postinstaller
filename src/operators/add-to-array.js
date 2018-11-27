const set = require('lodash.set')
const equal = require('lodash.isequal')

const {removeEmptyKeys} = require('./util')

module.exports = (/* options */) => ({
  add: key => hasOperator(key)
    && function (result, value, key, {source}) {
      key = stripOperator(key)
      const currentValue = currentValueAsArray(source, key)

      if (currentValue.some(v => equal(v, value))) {
        return result
      }

      return set(result, key, [...currentValue, value])
    },

  remove: key => hasOperator(key)
    && ((result, value, key, {source}) => {
      key = stripOperator(key)

      const newValue
        = currentValueAsArray(source, key).filter(x => !equal(x, value))

      return removeEmptyKeys(set(result, key, newValue), key)
    })
})

function hasOperator(key) {
  return /\[]$/.test(key)
}

function stripOperator(key) {
  return key.replace(/\[]$/, '')
}

function currentValueAsArray(source, key) {
  const currentValue = require('lodash.get')(source, key)
  if (currentValue === null || currentValue === undefined) {
    return []
  }

  return Array.isArray(currentValue)
    ? currentValue
    : [currentValue]
}

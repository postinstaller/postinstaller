const get = require('lodash.get')

module.exports = function ExistentialOperator(/* options */) {
  function addOrRemove(key) {
    return hasOperator(key)
      && ((result, value, condition, {apply, source}) => {
        const key = stripOperator(condition)
        const conditionKeyExists = get(source, key) !== undefined
        if (!conditionKeyExists) {
          return result
        }

        return apply(value)
      })
  }

  return ({
    add: addOrRemove,
    remove: addOrRemove
  })
}

function hasOperator(key) {
  return key.match(/^if\s+has\s+|\?/)
}

function stripOperator(key) {
  return /^if\s+has\s+/.test(key)
    ? key.replace(/^if\s+has\s+/, '')
    : key.split('?').slice(0, -1).join('.')
}

const debug = require('debug')('postinstaller')
const get = require('lodash.get')
const set = require('lodash.set')

module.exports = install

function install(config, source, operators) {
  console.log(operators)
  return Object
    .entries(config)
    .reduce((result, [key, value]) => {
      const operator =
        findOperatorFor(operators, key, value) ||
        setOperator

      return operator(
        (config, source) => install(config, source, operators),
        source,
        result,
        key,
        value)
    }, {...source})

  function findOperatorFor(array, key, value) {
    for (const operator of array) {
      const result = operator(key, value)
      if (result) {
        return result
      }
    }
  }
}
install.add = []
install.remove = []

function ConditionalOperator(key) {
  return key.includes('?') ? (install, source, result, condition, value) => {
    const key = condition.split('?').slice(0, -1).join('.')
    const conditionKeyExists = get(source, key) !== undefined
    debug('Found condition', key, conditionKeyExists)
    return conditionKeyExists ?
      {...result, ...install(value, source)} :
      result
  } : undefined
}
install.add.push(ConditionalOperator)

function AddToArrayOperator(key) {
  if (!key.endsWith('[]')) {
    return false
  }

  return (install, source, result, key, value) => {
    key = key.substr(key, key.length - 2)
    let currentValue = get(source, key)
    if (currentValue === null || currentValue === undefined) {
      currentValue = []
    } else if (!Array.isArray(currentValue)) {
      currentValue = [currentValue]
    }

    if (currentValue.includes(value)) {
      return result
    }

    return {
      ...result,
      [key]: [...currentValue, value]
    }
  }
}
install.add.push(AddToArrayOperator)

function setOperator(install, source, target, key, value) {
  return set(target, key, value)
}
install.add.push(setOperator)

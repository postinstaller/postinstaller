const get = require('lodash.get')
const set = require('lodash.set')
const unset = require('lodash.unset')
const equal = require('lodash.isequal')

const error = require('../errors')
const {removeEmptyKeys} = require('./util')

module.exports = () => ({
  add: () => (target, value, key, {overwrite}) => {
    if (!overwrite) {
      const currentValue = get(target, key)
      if (currentValue !== undefined && !equal(currentValue, value)) {
        throw error('SET0001', {key, value})
      }
    }

    return set(target, key, value)
  },

  remove: () => (target, value, key, /* */) => {
    const currentValue = get(target, key)
    if (currentValue !== undefined && !equal(currentValue, value)) {
      return target
    }

    unset(target, key)

    return removeEmptyKeys(target, key)
  }
})

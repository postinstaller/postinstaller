const cloneDeep = require('clone-deep')

module.exports = {
  install(recipe, where, options) {
    return apply(recipe, where, apply.add, options)
  },
  uninstall(recipe, where, options) {
    return apply(recipe, where, apply.remove, options)
  }
}

function apply(recipe, source, operators, options = {}) {
  const reporter = Object.assign({
    error() {},
    success() {}
  }, options.reporter)

  source = cloneDeep(source)

  return Object
    .entries(recipe)
    .reduce((result, [key, value]) => {
      const operator = findOperatorFor(operators, key, value)
      if (!operator) {
        reporter.error('Syntax error', key)
        return result
      }

      const context = {
        ...options,
        source,
        apply: recipe => apply(recipe, source, operators, options)
      }

      try {
        return operator(
          result,
          value,
          key,
          context)
      } catch (error) {
        reporter.error(error)
        return result
      }
    }, source)

  function findOperatorFor(array, key, value) {
    for (const checkOperator of array) {
      const result = checkOperator(key, value)
      if (result) {
        return result
      }
    }
  }
}

apply.add = []
apply.remove = []

new Array(...[
  './operators/existential',
  './operators/add-to-array',
  // `Set` should be last so that it is the fallback operator
  './operators/set'
])
  .map(require)
  .map(f => f())
  .forEach(({add, remove}) => {
    apply.add.push(add)
    apply.remove.push(remove)
  })

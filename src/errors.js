module.exports = function (code, args) {
  return Object.assign(new Error(errors[code]), {
    message: errors[code],
    code,
    ...args
  })
}

const errors = {
  SET0001: 'Key already has a different value and `overwrite` is not specified'
}

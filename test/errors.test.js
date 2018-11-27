const test = require('ava')
const errors = require('../src/errors')

test('errors', t => {
  const expect = {
    key: Math.random().toString(36).substr(2),
    value: Math.random() * 1000 | 0
  }

  const error = errors('SET0001', expect)
  t.true(error instanceof Error)
  t.is(error.code, 'SET0001')
  t.is(error.key, expect.key)
  t.is(error.value, expect.value)
})

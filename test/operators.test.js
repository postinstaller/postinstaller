const test = require('ava')
const arrify = require('arrify')
const fs = require('graceful-fs')
const {install, uninstall} = require('../src/postinstaller')

testFixture.title = (providedTitle = '', fixture, operator) => `${operator}: ${fixture.title || providedTitle}`

fs.readdirSync('./test/fixtures/').forEach(testOneOperator)

function testOneOperator(operator) {
  const tests = require(`./fixtures/${operator}`)
  arrify(tests).forEach((e, i) => test(`[${i}]`, testFixture, e, operator, i))
}

function testFixture(t, fixture) {
  const resultAfterInstall = fixture.afterInstall && install(fixture.recipe, fixture.beforeInstall || {}, fixture.options)
  if (fixture.afterInstall) {
    t.deepEqual(resultAfterInstall, fixture.afterInstall)
  }

  const beforeRemove = fixture.beforeRemove || resultAfterInstall
  const expectAfterRemove = fixture.afterRemove || fixture.beforeInstall
  if (expectAfterRemove) {
    const resultAfterRemove = uninstall(fixture.recipe, beforeRemove)
    t.deepEqual(resultAfterRemove, expectAfterRemove)
  }
}

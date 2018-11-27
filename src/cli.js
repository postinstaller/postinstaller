#! /usr/bin/env node

// Ue `npm_lifecycle_event`
// Use `npm_lifecycle_script`

const {join} = require('path')
const log = require('npmlog')
const {readFileSync, writeFileSync} = require('graceful-fs')
const get = require('lodash.get')
const set = require('lodash.set')
const yargs = require('yargs')

log.heading = 'postinstaller'
log.level = process.env.npm_config_loglevel || 'info'

const npmRunDir = process.env.INIT_CWD || process.cwd()
log.silly('', process.env.npm_lifecycle_event)
log.silly('', {
  npmRunDir,
  cwd: process.cwd()
})

yargs // eslint-disable-line no-unused-expressions
  .scriptName('postinstaller')
  .options({
    'recipe-file': {
      alias: 'f',
      desc: 'recipe JSON file',
      default: join(process.cwd(), './package.json'),
      type: 'string',
      conflicts: 'deps',
      global: true
    },
    'recipe-key': {
      alias: 'k',
      desc: 'key in `file` containing recipe',
      default: 'postinstaller',
      type: 'string',
      conflicts: 'deps',
      global: true
    },
    'target-file': {
      alias: 't',
      desc: 'target JSON file',
      type: 'string',
      default: join(npmRunDir, './package.json'),
      global: true
    },
    'target-key': {
      type: 'string'
    },
    force: {
      desc: 'overwrite existing values',
      boolean: true,
      global: true
    },
    'dry-run': {
      desc: 'just print out the results, don’t actually write to files',
      boolean: true,
      global: true
    }
  })
  .command({
    command: ['install [package]', ...process.env.npm_lifecycle_event === 'postinstall' ? ['$0'] : []],
    aliases: ['i', 'add', 'a'],
    desc: 'install',
    handler: installOrUninstall('install')
  })
  .command({
    command: ['uninstall [package]', ...process.env.npm_lifecycle_event === 'preuninstall' ? ['$0'] : []],
    aliases: ['u', 'remove', 'r'],
    desc: 'uninstall',
    handler: installOrUninstall('uninstall')
  })
  .demandCommand(1, 'You need at least specify one command before moving on')
  .epilogue('for more information, see the docs at https://github.com/postinstaller')
  .wrap(yargs.terminalWidth())
  .help()
  .argv

// > Scripts are run from the root of the module, regardless of what your current
// > working directory is when you call npm run. If you want your script to use
// > different behavior based on what subdirectory you’re in, you can use the
// > INIT_CWD environment variable, which holds the full path you were in when
// > you ran npm run.
// https://docs.npmjs.com/cli/run-script

function installOrUninstall(method) {
  return argv => {
    log.silly('', {argv})

    const packageFile = argv.package && (() => {
      const pkg = require('resolve-pkg')(argv.package, {cwd: npmRunDir})
      if (!pkg) {
        throw new Error('Module not found', argv.package)
      }
      return join(pkg, 'package.json')
    })()

    const recipes = readJsonFile(packageFile || argv['recipe-file'], argv['recipe-key'])
    if (!recipes.cwd) {
      log.notice('skipped', 'No recipes found.')
      return
    }

    log.info(method, recipes.data.name)

    const target = readJsonFile(argv['target-file'], argv['target-key'])
    const updated = require('./postinstaller')[method](recipes.cwd, target.cwd)
    if (require('deep-equal')(updated, target.cwd)) {
      log.verbose('', 'no changes.')
      return
    }
    const path = 'data'
      + (argv['target-key']
        ? `.${argv['target-key']}`
        : '')

    set(target, path, updated)
    if (argv['dry-run']) {
      log.info('dry-run', target.toString())
    } else {
      writeFileSync(argv['target-file'], target.toString(), {encoding: 'utf-8'})
    }
    log.notice(`${method}ed`, recipes.data.name)
  }
}

function readJsonFile(filename, cwdKey) {
  const text = readFileSync(filename, 'utf-8')
  const [/* unused */, ending] = text.match(/}(\s*)$/) || [null, '\n']
  const [indent] = text.match(/^\s+/m) || [2]
  const data = JSON.parse(text)
  const cwd = cwdKey ? get(data, cwdKey) : data

  const self = {
    data,
    cwd,
    ending,
    indent,
    toString: () => JSON.stringify(self.data, null, self.indent) + self.ending
  }
  return self
}

// Accuracy creates clarity.
// Ambiguity creates confusion.

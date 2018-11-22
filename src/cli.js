#! /usr/bin/env node

const {join} = require('path')
const install = require('./postinstaller')

const pkg = require(join(process.cwd(), 'package.json'))
console.log(install(pkg.postinstaller, pkg, install.add))

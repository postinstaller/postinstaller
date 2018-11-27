module.exports = [{
  title: 'Condition on existing nested keys',
  recipe: {
    'if has devDependencies.husky': {
      'if has devDependencies.@commitlint/cli': {
        'husky.hooks.commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
      }
    }
  },
  beforeInstall: {
    devDependencies: {
      husky: '*',
      '@commitlint/cli': '*'
    }
  },
  afterInstall: {
    devDependencies: {
      husky: '*',
      '@commitlint/cli': '*'
    },
    husky: {
      hooks: {
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
      }
    }
  },
  afterRemove: {
    devDependencies: {
      husky: '*',
      '@commitlint/cli': '*'
    }
  }
}, {
  title: 'Condition on non-existing key',
  recipe: {
    'devDependencies.husky?': {
      'devDependencies.@commitlint/cli?': {
        'husky.hooks.commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
      }
    }
  },
  beforeInstall: {
    devDependencies: {
      husky: '*'
    }
  },
  afterInstall: {
    devDependencies: {
      husky: '*'
    }
  }
}]

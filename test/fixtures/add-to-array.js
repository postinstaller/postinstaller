module.exports = [
  {
    title: 'Add to a non-existing array',
    recipe: {
      'xo.extends[]': 'plugin:react/recommended'
    },
    beforeInstall: {
      xo: {
        semicolon: false,
        space: true
      }
    },
    afterInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'plugin:react/recommended'
        ]
      }
    }
  },
  // ---------------------------------------------------------------------------
  {
    title: 'Add to an existing array',
    recipe: {
      'xo.extends[]': 'plugin:react/recommended'
    },
    beforeInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended'
        ]
      }
    },
    afterInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'plugin:react/recommended'
        ]
      }
    }
  },
  // ---------------------------------------------------------------------------
  {
    title: 'Add to an existing value',
    recipe: {
      'xo.extends[]': 'plugin:react/recommended'
    },
    beforeInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: 'eslint:recommended'
      }
    },
    afterInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'plugin:react/recommended'
        ]
      }
    },
    beforeRemove: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'some-other-extension',
          'plugin:react/recommended'
        ]
      }
    },
    afterRemove: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'some-other-extension'
        ]
      }
    }
  },
  // ---------------------------------------------------------------------------
  {
    title: 'Does not add duplicate values',
    recipe: {
      'xo.extends[]': 'plugin:react/recommended'
    },
    beforeInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'plugin:react/recommended'
        ]
      }
    },
    afterInstall: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended',
          'plugin:react/recommended'
        ]
      }
    },
    afterRemove: {
      xo: {
        semicolon: false,
        space: true,
        extends: [
          'eslint:recommended'
        ]
      }
    }
  }
]

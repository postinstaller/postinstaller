module.exports = [{
  title: 'Set a string',
  recipe: {
    'scripts.release': 'standard-version'
  },
  beforeInstall: {
    scripts: {
      test: 'ava'
    }
  },
  afterInstall: {
    scripts: {
      test: 'ava',
      release: 'standard-version'
    }
  }
}, {
  title: 'Set a boolean',
  recipe: {
    'scripts.release': false
  },
  beforeInstall: {
    scripts: {
      test: 'ava'
    }
  },
  afterInstall: {
    scripts: {
      test: 'ava',
      release: false
    }
  }
}, {
  title: 'Set & overwrite an existing value (string)',
  recipe: {
    'scripts.release': 'standard-version'
  },
  options: {
    overwrite: true
  },
  beforeInstall: {
    scripts: {
      test: 'ava',
      release: 'some-other-value'
    }
  },
  afterInstall: {
    scripts: {
      test: 'ava',
      release: 'standard-version'
    }
  },
  afterRemove: {
    scripts: {
      test: 'ava'
    }
  }
}, {
  title: 'Keep a value that’s been changed (string)',
  recipe: {
    'scripts.release': 'standard-version'
  },
  beforeRemove: {
    scripts: {
      test: 'ava',
      release: 'some-other-value'
    }
  },
  afterRemove: {
    scripts: {
      test: 'ava',
      release: 'some-other-value'
    }
  }
}, {
  title: 'Set an existing value (string)',
  recipe: {
    'scripts.release': 'standard-version'
  },
  beforeInstall: {
    scripts: {
      test: 'ava',
      release: 'some-other-value'
    }
  },
  afterInstall: {
    scripts: {
      test: 'ava',
      release: 'some-other-value'
    }
  }
}]

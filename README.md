✨🎩 postinstaller
=================

> ~~The missing~~ automagic configuration for npm packages.

Motivation
----------
Adding a package to your project often requires manual configuration of `package.json`. This can be tedious and error prone, especially when adding multiple packages in one go.

Postinstaller does that automatically, and also cleans up upon uninstall.

Features
--------
+ **Automatic install.**
+ **Automatic cleanup.**
+ **Easy to set up.**


For Package Owners
------------------
```sh
npm add postinstaller
```

### Conditional Entries

**Example:** if `devDependencies.husky` exists, add `husky.hooks.commit-msg`:

```json
{
  "postinstaller": {
    "devDependencies.husky?": {
      "husky.hooks.commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

**Example:** if `devDependencies.husky` AND `devDependencies.@commitlint/cli?` exist, add `husky.hooks.commit-msg`:

```json
{
  "postinstaller": {
    "devDependencies.husky?": {
      "devDependencies.@commitlint/cli?": {
        "husky.hooks.commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    }
  }
}
```

**Example:** configure ava

```json
{
  "postinstaller": {
    "devDependencies.ava?": {
      "ava.require[]": "setup-browser-env",
      "devDependencies.nyc?": {
        "scripts.test/": ["ava|mocha", "nyc $0"]
      }
    }
  }
}
```

**Example:** configure standard-version

```json
{
  "postinstaller": {
    "devDependencies.standard-version?": {
      "scripts.release": "standard-version"
    }
  }
}
```

**Example:** configure another file

```json
{
  "postinstaller": {
    "file babel.json": {
      :
    }
  }
}
```

# Shared Postinstall Scripts

Some packages unfold their full power when they are used together with other packages: `ava` and `nyc`, `commitlint` and `husky` are good examples for this.

+ Include in one package. Negative: requires to keeping a certain installation order, but that can’t be guaranteed and is likely going to to fail.
+ Include the same `postinstaller` section in both packages. This will trigger


+ **Create a package `postinstaller-abc-def`.**
+ **Publish to npm.**
+ **Add as a dependency to all packages.**

# Guidelines

+ Never overwrite values. Smartly append instead.

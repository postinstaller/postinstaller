<center><h1>
✨🎩
postinstaller
</h1>
[![postinstaller](https://postinstaller-badge.now.sh/postinstaller?style=flat-square)](https://github.com/postinstaller/postinstaller) [![npm](https://flat.badgen.net/npm/v/postinstaller)]() [![npm](https://flat.badgen.net/npm/license/postinstaller)]() [![npm](https://flat.badgen.net/travis/postinstaller/postinstaller)]() [![npm](https://flat.badgen.net/coveralls/c/github/postinstaller/postinstaller)]()

</center>

Postinstaller makes packages a lot easier to use and saves hours of precious developer time.

Motivation
----------
Adding new packages to a project often requires manual configuration of `package.json`, which can be tedious, error prone and frustrating.

Wouldn’t life be great if we could just add a package and be done?

**Postinstaller** does exctly that. It’s a **tool for package authors** that configures `package.json` automatically when their package gets installed - and also cleans up again if the package gets removed.

Features
--------
+   **Automatic configuration.**
+   **Automatic cleanup.**
+   **Easy to set up.**

Use Cases
---------
+   **Zero-Config plugins**. Automatically add your plugin to the right `package.json` key.

For Package Developers
----------------------

## Setting a value
Postinstaller makes it very easy to set values in a JSON config file. Here’s an example:

**Example**
```json
{
  "postinstaller": {
    "scripts.hello": "echo 'hello, world!'"
  }
}
```

Postinstaller uses _dot notation_ to address values. In the example above, the recipe will set `hello` in the `scripts` section to `echo 'hello, world!'`.

**Result**

```json
{
  "scripts": {
    "hello": "echo 'hello, world!'"
  }
}
```

Postinstaller never silenty overwrites values.

Operations
----------

+   **Set.** Set a value.
+   **Insert.** Insert a value into an array.
+   **If has.** Check if a file has a certain key.

### Set


**Example: standard-version**

```json
{
  "postinstaller": {
    "scripts.release": "standard-version"
  }
}
```

### If has ✓

**Example: ava and setup-browser-env**
> If `ava` is installed, add `setup-browser-env` to the list of `require`d modules

```json
{
  "postinstaller": {
    "devDependencies.ava?": {
      "ava.require[]": "setup-browser-env"
    }
  }
}
```

**Example: husky and commitlint**
> if `devDependencies.husky` AND `devDependencies.@commitlint/cli?` exist, add `husky.hooks.commit-msg`:

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

Backlog
=======

#### Concatenate Shell Commands

**Example: postinstaller**

*   `&&before`
*   `after&&`

```json
{
  "postinstaller": {
    "&& scripts.postinstaller": "postinstaller install",
    "&& scripts.preuninstall": "postinstaller uninstall",
  }
}
```


#### Configure other files
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

#### Regex Replace

**Example:** configure ava (Regex Replace)

```json
{
  "postinstaller": {
    "devDependencies.nyc?": {
      "scripts.test": "/ava|mocha/nyc $0"
    }
  }
}
```

#### Shared Postinstaller Scripts

Some packages unfold their full power when they are used together with other packages: `ava` and `nyc`, `commitlint` and `husky` are good examples for this.

+   **Create a package `postinstaller-abc-def`.**
+   **Publish to npm.**
+   **Add as a dependency to all packages.**

Guidelines
==========

+   Never overwrite or delete values. Append and remove *smartly* instead.

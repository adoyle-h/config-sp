# Config-SP
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

A simple, zero-dependency library helps you make a configuration for your library or module.

It helps you define a set of default parameters(in `default.js`), and extend them(in `local.js` or others files) recursively.

It is highly recommended to use [lorenwest/node-config](https://github.com/lorenwest/node-config) when you are willing to build an application rather than a library. It is a pretty awesome library and provides many useful features.

## Document Translations

[简体中文](./doc/README.zh-Hans.md)

## TOC

<!-- MarkdownTOC -->

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Config Object](#config-object)
- [Reserved Words](#reserved-words)
- [Environment Variables](#environment-variables)
    - [`CONFIG_SP_LOAD_FILE_MISSING`](#config_sp_load_file_missing)
- [API](#api)
- [Versioning](#versioning)
- [Copyright and License](#copyright-and-license)

<!-- /MarkdownTOC -->


<a name="installation"></a>
## Installation

`npm install --save config-sp`

<a name="quick-start"></a>
## Quick Start

1. mkdir a folder.

    ```bash
    mkdir config
    ```

2. edit the default configuration via `vim config/default.js`.

    ```js
    {
        a: {
            b: {
                c: 'hello',
                c2: 'world',
                c3: 1,
            },
            d: [1, 2, 3],
        },
        e: false,
        f: null,
        g: 1,
    }
    ```

3. edit the local configuration via `vim config/local.js`.

    ```js
    {
        a: {
            b: {
                c: 'bye',
                c3: 0,
            },
            d: [],
        },
        e: true,
        g: undefined,
        h: null,
    }
    ```

4. edit the index file to indicate the default and local files via `vim config/index.js`.

    ```js
    var Config = require('config-sp');
    // the default.js and local.js are relative path to __dirname
    var config = Config.load(__dirname, ['default.js', 'local.js']);

    // the config will be:
    // {
    //     a: {
    //         b: {
    //             c: 'bye',
    //             c2: 'world',
    //             c3: 0,
    //         },
    //         d: [],
    //     },
    //     e: true,
    //     f: null,
    //     g: 1,
    //     h: null,
    // }

    // to get a child config
    var c = config.get('a.b.c');
    // or
    c = config.a.b.c;

    var a = config.get('a');
    // the child config returned by `get` method, will also have `get` method
    c = a.get('b.c');

    var b = config.a.b;
    // c = b.get('c');  // will throw an error, because `b` has no `get` method

    // var d = config.get('d');  // it will throw an error, because `d` is missing
    ```

<a name="config-object"></a>
## Config Object

The config object returned by `load` and `create` function will have `get` method, which is used to get a child config.

`get` method will throw an exception for undefined value to help catch typos and missing values.

<a name="reserved-words"></a>
## Reserved Words

the following configuration names cannot be used as config key:

- get

<a name="environment-variables"></a>
## Environment Variables

<a name="config_sp_load_file_missing"></a>
### `CONFIG_SP_LOAD_FILE_MISSING`

supported values:

- 'warn': `console.warn` the error message
- 'error': `console.error` the error message
- 'ignore': neither print anything nor throw an error

If `CONFIG_SP_LOAD_FILE_MISSING` is not set, it will throw an error when the file is missing.

<a name="api"></a>
## API

see http://adoyle.me/config-sp/

<a name="versioning"></a>
## Versioning

The versioning follows the rules of SemVer 2.0.0.

**BUT**, anything may have **BREAKING CHANGES** at **ANY TIME** when major version is zero (0.y.z), which is for initial development and the public API should not be considered stable.

For more information on SemVer, please visit http://semver.org/.

<a name="copyright-and-license"></a>
## Copyright and License

Copyright (c) 2015-2016 ADoyle. The project is licensed under the **Apache License Version 2.0**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

See the [NOTICE][] file distributed with this work for additional information regarding copyright ownership.


<!-- Links -->

[LICENSE]: ./LICENSE
[NOTICE]: ./NOTICE


<!-- links -->

[Node Version Image]: https://img.shields.io/node/v/config-sp.svg
[Npm Package Version Image]: https://img.shields.io/npm/v/config-sp.svg
[Npm Package Version LINK]: https://www.npmjs.com/package/config-sp
[License Image]: https://img.shields.io/npm/l/config-sp.svg
[License LINK]: https://github.com/adoyle-h/config-sp/blob/master/LICENSE
[NodeJS Package Dependencies Link]: https://david-dm.org/adoyle-h/config-sp.svg
[Build Status Image]: https://travis-ci.org/adoyle-h/config-sp.svg?branch=master
[Build Status Link]: https://travis-ci.org/adoyle-h/config-sp
[Code Climate Image]: https://codeclimate.com/github/adoyle-h/config-sp/badges/gpa.svg
[Code Climate Link]: https://codeclimate.com/github/adoyle-h/config-sp
[Test Coverage Image]: https://codeclimate.com/github/adoyle-h/config-sp/badges/coverage.svg
[Test Coverage Link]: https://codeclimate.com/github/adoyle-h/config-sp/coverage

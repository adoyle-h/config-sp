# Config-SP
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

一个简单的，零依赖的类库。用来帮助你为类库或者模块管理自身的配置。

它将帮助你定义一系列默认配置（如在 `default.js` 中），然后递归地扩展默认配置（比如在 `local.js` 或者其他文件中）。

当你想要开发一个应用，而不是类库时，强烈推荐你使用 [lorenwest/node-config](https://github.com/lorenwest/node-config)。这是一个非常赞的类库，它提供了许多有用的功能。

## 安装（Installation）

`npm install --save config-sp`

## 快速上手（Quick Start）

1. 创建一个目录。

    ```bash
    mkdir config
    ```

2. 编辑默认配置，如 `vim config/default.js`。

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

3. 编辑本地配置，如 `vim config/local.js`。

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

4. 编辑主文件，来指示默认配置和本地配置的位置，如 `vim config/index.js`.

    ```js
    var Config = require('config-sp');
    // default.js 和 local.js 是相对与 __dirname 的路径。
    var config = Config.load(__dirname, ['default.js', 'local.js']);

    // config 将会是这样：
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

    // 获取子配置的值
    var c = config.get('a.b.c');
    // 或者这样
    c = config.a.b.c;

    var a = config.get('a');
    // 通过 `get` 方法返回的子配置，同样带有 `get` 方法
    c = a.get('b.c');

    var b = config.a.b;
    // c = b.get('c');  // 这将会抛错，因为 `b` 没有 `get` 方法

    // var d = config.get('d');  // 这将会抛错，因为 `d` 的值是 `undefined`
    ```

## Config 对象

`load` 以及 `create` 函数将返回一个 Config 对象，它将带有 `get` 方法，可以用来获取子配置的值。

当使用 `get` 方法查询到的值为 `undefined`，它将抛出异常，用来帮助捕捉打字错误以及字段缺失。

## 保留字（Reserved Words）

以下名称不能作为配置的键（key）：

- get

## 环境变量

### `CONFIG_SP_LOAD_FILE_MISSING`

支持以下值：

- 'warn': 以 `console.warn` 打印错误信息
- 'error': 以 `console.error` 打印错误信息
- 'ignore': 既不打印错误信息，也不抛出错误

如果没有设置 `CONFIG_SP_LOAD_FILE_MISSING`，加载文件缺失时将抛出错误。

## API

请看 http://adoyle.me/Ero.js/

## 版本（Versioning）

版本迭代遵循 SemVer 2.0.0 的规则。

*但是*，当主版本号是零（0.y.z），一切*随时*都可能有*不兼容的修改*。这处于开发初始阶段，其公共 API 是不稳定的。

关于 SemVer 的更多信息，请访问 http://semver.org/。

## 版权声明（Copyright and License）

Copyright 2015-2016 ADoyle

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

See the NOTICE file distributed with this work for additional information regarding copyright ownership.


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

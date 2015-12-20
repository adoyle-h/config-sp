'use strict';

var FS = require('fs');
var Path = require('path');
var extend = require('./extend');
var bindGetMethod = require('./get').bindGetMethod;

function loadFile(path) {
    try {
        FS.accessSync(path, FS.F_OK | FS.R_OK); // eslint-disable-line no-bitwise
        return require(path);
    } catch (e) {
        throw e;
    }
}


/**
 * Load your config files.
 *
 * You could invoke the `load` function many times. Each returned config is independent and not affected by each other.
 *
 *     @example
 *
 *     ```js
 *     // Assume that there are two files 'test/config/default.js', 'test/config/local.js',
 *     // and the codes in 'test/config/index.js':
 *     load(__dirname, ['default.js', 'local.js']);
 *     ```
 *
 * @param  {String} fromPath  A absolute path to sub-config folder.
 * @param  {Array<String>} relativePaths  The paths of config files, which relative to `fromPath`.
 *                                        The latter item will overwrite the former recursively.
 * @return {Object}  The final config object.
 * @function load(fromPath, relativePaths)
 */
function load(fromPath, relativePaths) {
    var conf = {};
    relativePaths.forEach(function(relativePath) {
        var path = Path.resolve(fromPath, relativePath);
        var config = loadFile(path);
        extend(conf, config);
    });

    if (conf.get === undefined) {
        bindGetMethod(conf);
    } else {
        throw new Error('`get` property cannot be the root key of config');
    }

    return conf;
}

exports.load = load;

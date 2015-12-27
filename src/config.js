'use strict';

/**
 * @class Config
 * @singleton
 */

var FS = require('fs');
var Path = require('path');
var extend = require('./extend');
var bindGetMethod = require('./get').bindGetMethod;

function loadFile(path) {
    try {
        FS.accessSync(path, FS.F_OK | FS.R_OK); // eslint-disable-line no-bitwise
        return require(path);
    } catch (e) {
        /* eslint-disable no-console */
        var env = process.env.CONFIG_SP_LOAD_FILE_MISSING;
        if (env === 'warn') {
            console.warn(e.message);
        } else if (env === 'error') {
            console.error(e.message);
        } else if (env === 'ignore') {
            // do nothing
        } else {
            throw e;
        }
        return {};
    }
}

/**
 * Load your config files.
 *
 * You could invoke the `load` function many times. Each returned config is independent and not affected by each other.
 *
 *     @example
 *     // Assume that there are two files 'test/config/default.js', 'test/config/local.js',
 *     // and the codes in 'test/config/index.js':
 *     load(__dirname, ['default.js', 'local.js']);
 *
 * @param  {String} fromPath  A absolute path to sub-config folder.
 * @param  {String[]} relativePaths  The paths of config files, which relative to `fromPath`.
 *                                   The latter item will overwrite the former recursively.
 * @return {Object}  The final config object.
 * @throws Throw an error if the files of relativePaths are missing.
 *         You could set `CONFIG_SP_LOAD_FILE_MISSING` environment variable for toleration
 * @method load
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

/**
 * create a config with multi objects.
 *
 * The latter object will overwrite the former recursively.
 *
 *     @example
 *     create({a: 1, b: 2}, {a: 0, c: 3});  // => {a: 0, b: 2, c: 3}
 *
 * @param  {Object...} source  a set of config objects.
 * @return {Object}  The final config object.
 * @method create
 */
function create() {
    var args = Array.prototype.slice.call(arguments);
    var conf = {};

    args.forEach(function(config) {
        extend(conf, config);
    });

    if (conf.get === undefined) {
        bindGetMethod(conf);
    } else {
        throw new Error('`get` property cannot be the root key of config');
    }

    return conf;
}
exports.create = create;

'use strict';

/**
 * @class Config
 * @singleton
 */

var util = require('util');
var FS = require('fs');
var Path = require('path');
var extend = require('./extend');
var bindGetMethod = require('./get').bindGetMethod;

var S_IRUSR = 256;
function isReadableFile(stat) {
    // eslint-disable-next-line no-bitwise
    return Boolean(stat.mode & S_IRUSR);
}

function loadFile(path, ignores) {
    var env, stat;
    var fileName = Path.basename(path);
    try {
        stat = FS.statSync(path); // eslint-disable-line no-bitwise
        if (!stat.isFile()) throw new Error(util.format('"%s" is not a normal file.'), path);
        if (!isReadableFile(stat)) throw new Error(util.format('File "%s" is not readable.'), path);
        return require(path);
    } catch(e) {
        if (e.message && e.message.startsWith('ENOENT: no such file or directory')) {
            if (ignores.indexOf(fileName) !== -1) {
                return {};
            }
        }
        /* eslint-disable no-console */
        env = process.env.CONFIG_SP_LOAD_FILE_MISSING;
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

var Config = module.exports = {};

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
 * @param  {Object} [opts]
 * @param  {String|String[]} [opts.ignores] Filenames that allowed missing when loading these files.
 * @return {Object}  The final config object.
 * @throws Throw an error if the files of relativePaths are missing.
 *         You could set `CONFIG_SP_LOAD_FILE_MISSING` environment variable for toleration
 * @method load
 */
function load(fromPath, relativePaths, opts) {
    opts = opts || {};
    var ignores = opts.ignores || [];
    if (typeof ignores === 'string') ignores = [ignores];

    var conf = {};
    relativePaths.forEach(function(relativePath) {
        var path = Path.resolve(fromPath, relativePath);
        var config = loadFile(path, ignores);
        extend(conf, config);
    });

    if (conf.get === undefined) {
        bindGetMethod(conf);
    } else {
        throw new Error('`get` property cannot be the root key of config');
    }

    return conf;
}

Config.load = load;

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
Config.create = create;

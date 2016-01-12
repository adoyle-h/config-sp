'use strict';

/**
 * @class Get
 * @singleton
 */

var isPlainObject = require('./isPlainObject');

/**
 * refer to node_modules/lodash/internal/baseGet.js
 *
 * @private
 */
function baseGet(object, pathArray) {
    pathArray.forEach(function(path) {
        if (object !== undefined) {
            if (typeof object === 'object' && object !== null) {
                object = object[path];
            } else {
                object = undefined;
            }
        }
    });
    return object;
}

/**
 * Used to match property names within property paths.
 *
 * @private
 * @type {RegExp}
 */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
/**
 * Used to match backslashes in property paths.
 *
 * @private
 * @type {RegExp}
 */
var reEscapeChar = /\\(\\)?/g;

/**
 * refer to node_modules/lodash/internal/toPath.js
 *
 * @private
 */
function getPathArray(path) {
    var pathArray = [];
    path.replace(rePropName, function(match, number, quote, string) {
        pathArray.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
    });
    return pathArray;
}

/**
 * Gets the property value at path of config.
 * If the resolved value is undefined, it will throw an error.
 *
 * @param  {String} path
 * @return {*}
 * @method get
 */
function get(path) {
    var conf = this;

    if (typeof path !== 'string') {
        throw new Error('path should be a string!');
    } else if (path.length === 0) {
        throw new Error('path cannot be empty!');
    }

    var result = baseGet(conf, getPathArray(path));
    if (result === undefined) {
        throw new Error('the value is undefined!');
    } else {
        bindGetMethod(result);  // eslint-disable-line
    }

    return result;
}

function bindGetMethod(obj) {
    if (isPlainObject(obj) === false) {
        return undefined;
    }

    Object.defineProperty(obj, 'get', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: get,
    });
}

module.exports = {
    bindGetMethod: bindGetMethod,
    get: get,
    getPathArray: getPathArray,
    baseGet: baseGet,
};

'use strict';

var isPlainObject = require('./isPlainObject');

function _extend(dest, src) {
    if (!src || typeof src !== 'object') {
        return dest;
    }

    var keys = Object.keys(src);
    var i, key, srcVal, destVal;
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        srcVal = src[key];
        destVal = dest[key];
        if (isPlainObject(srcVal)) {
            if (isPlainObject(destVal)) {
                _extend(destVal, srcVal);
            } else if (destVal === undefined) {
                dest[key] = srcVal;
            } else {
                throw new Error('the destination and source are not in same format. key=' + key);
            }
        } else if (srcVal !== undefined) {
            dest[key] = srcVal;
        } else {
            // do nothing if src[key] is undefined
        }
    }

    return dest;
}

/**
 * Recursively assigns own enumerable properties of source object(s) to the destination object for all destination properties that resolve to undefined.
 * Once a property is set, additional values of the same property are ignored.
 *
 * @return {Object} the destination
 * @function extend(destination, [sources...])
 */
function extend() {
    var destination = arguments[0] || {};
    if (arguments.length < 2) return destination;

    var sources = Array.prototype.slice.call(arguments, 1);

    sources.forEach(function(source) {
        _extend(destination, source);
    });

    return destination;
}

module.exports = extend;

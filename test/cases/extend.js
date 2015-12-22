'use strict';

describe('#extend', function() {
    var extend = require('../../src/extend');
    var checkout = require('../mocks/checkout');
    var defaultConfig = {
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
    };
    var localConfig = {
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
    };

    beforeEach(function() {
        defaultConfig = JSON.parse(JSON.stringify(defaultConfig));
        localConfig = JSON.parse(JSON.stringify(localConfig));
    });

    it('assign to a new object', function() {
        var result = extend({}, defaultConfig, localConfig);
        result.should.deepEqual(checkout);
    });

    it('assign to dest object', function() {
        extend(defaultConfig, localConfig);
        defaultConfig.should.deepEqual(checkout);
    });
});

'use strict';

describe('#config', function() {
    var Path = require('path');
    var Config = require('../../src/config');
    var checkout = require('../mocks/checkout');

    describe('load()', function() {
        it('should load multi files to make a config', function() {
            var configDir = Path.resolve(TEST_ROOT, './mocks');
            var config = Config.load(configDir, ['default.js', 'local.js']);

            config.get.should.be.a.Function();
            config.should.deepEqual(checkout);
        });
    });

    describe('create()', function() {
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

        it('should create a config with multi objects', function() {
            var config = Config.create(defaultConfig, localConfig);

            config.get.should.be.a.Function();
            config.should.deepEqual(checkout);
        });
    });
});

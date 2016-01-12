'use strict';

describe('#config', function() {
    var should = require('should');
    var Path = require('path');
    var Config = require('../../src/config');
    var checkout = require('../mocks/checkout');
    var defaultConf = require('../mocks/default');

    describe('load()', function() {
        var configDir = Path.resolve(TEST_ROOT, './mocks');

        afterEach(function() {
            delete require.cache[configDir];
        });

        it('should load multi files to make a config', function() {
            var config = Config.load(configDir, ['default.js', 'local.js']);
            config.get.should.be.a.Function();
            config.should.deepEqual(checkout);
        });

        it('should throw an error when file is missing', function() {
            should.throws(function() {
                Config.load(configDir, ['default.js', 'missing.js']);
            }, function(e) {
                return (e.message.indexOf('no such file or directory') !== -1);
            });
        });

        describe('CONFIG_SP_LOAD_FILE_MISSING', function() {
            /* eslint-disable no-console */
            var warn;
            var error;
            before(function() {
                warn = console.warn;
                error = console.error;
            });

            beforeEach(function() {
                console.warn = sinon.spy();
                console.error = sinon.spy();
            });

            afterEach(function() {
                delete process.env.CONFIG_SP_LOAD_FILE_MISSING;
            });

            after(function() {
                console.warn = warn;
                console.error = error;
            });

            it('should not throw an error when file is missing and CONFIG_SP_LOAD_FILE_MISSING is "ignore"', function() {
                process.env.CONFIG_SP_LOAD_FILE_MISSING = 'ignore';

                var config = Config.load(configDir, ['default.js', 'missing.js']);
                config.get.should.be.a.Function();
                config.should.deepEqual(defaultConf);
            });

            it('should console.warn the error when file is missing and CONFIG_SP_LOAD_FILE_MISSING is "ignore"', function() {
                process.env.CONFIG_SP_LOAD_FILE_MISSING = 'warn';

                var config = Config.load(configDir, ['default.js', 'missing.js']);
                console.warn.should.be.calledOnce();
                config.get.should.be.a.Function();
                config.should.deepEqual(defaultConf);
            });

            it('should console.error the error when file is missing and CONFIG_SP_LOAD_FILE_MISSING is "ignore"', function() {
                process.env.CONFIG_SP_LOAD_FILE_MISSING = 'error';

                var config = Config.load(configDir, ['default.js', 'missing.js']);
                console.error.should.be.calledOnce();
                config.get.should.be.a.Function();
                config.should.deepEqual(defaultConf);
            });
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

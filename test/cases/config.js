'use strict';

describe('#config', function() {
    var Path = require('path');
    var Config = require('../../src/config');

    it('tests load()', function() {
        var configDir = Path.resolve(TEST_ROOT, './mocks');
        var config = Config.load(configDir, ['default.js', 'local.js']);

        config.get.should.be.a.Function();
        config.should.deepEqual({
            a: {
                b: {
                    c: 'bye',
                    c2: 'world',
                    c3: 0,
                },
                d: [],
            },
            e: true,
            f: null,
            g: 1,
            h: null,
        });
    });
});

'use strict';

describe('#get', function() {
    var should = require('should');
    var Module = require('../../src/get');

    it('check exports methods', function() {
        Module.should.have.properties([
            'baseGet', 'getPathArray', 'get',
        ]);
    });

    describe('getPathArray()', function() {
        var getPathArray = Module.getPathArray;

        it('"a.b.c.d"', function() {
            var result = getPathArray('a.b.c.d');
            result.should.deepEqual(['a', 'b', 'c', 'd']);
        });

        it('"a"', function() {
            var result = getPathArray('a');
            result.should.deepEqual(['a']);
        });

        it('"a_b-c"', function() {
            var result = getPathArray('a_b-c');
            result.should.deepEqual(['a_b-c']);
        });
    });

    describe('baseGet()', function() {
        var baseGet = Module.baseGet;
        var obj = {
            a: {
                b: 2,
                c: null,
            },
        };

        it('get obj.a.b', function() {
            var result = baseGet(obj, ['a', 'b']);
            result.should.equal(2);
        });

        it('get obj.a.c', function() {
            var result = baseGet(obj, ['a', 'c']);
            should(result).equal(null);
        });

        it('get obj.a.d', function() {
            var result = baseGet(obj, ['a', 'd']);
            should(result).equal(undefined);
        });

        it('get obj.a.c.d', function() {
            var result = baseGet(obj, ['a', 'c', 'd']);
            should(result).equal(undefined);
        });
    });

    describe('get()', function() {
        var get = Module.get;
        var obj = {
            a: {
                b: 2,
                c: null,
            },
        };

        it('obj.a.b', function() {
            var result = get.call(obj, 'a.b');
            result.should.equal(2);
        });

        it('obj.a.c', function() {
            var result = get.call(obj, 'a.c');
            should(result).equal(null);
        });

        it('obj.a.d', function() {
            should.throws(function() {
                get.call(obj, 'a.d');
            });
        });

        it('obj.a.c.d', function() {
            should.throws(function() {
                get.call(obj, 'a.c.d');
            });
        });

        it('should throw error when argument is not a string', function() {
            should.throws(function() {
                get.call(obj, 1);
            });

            should.throws(function() {
                get.call(obj, null);
            });

            should.throws(function() {
                get.call(obj, undefined);
            });
        });

        it('should throw error when argument is an empty array', function() {
            should.throws(function() {
                get.call(obj, []);
            });
        });

        it('child object should have `get` method, and it can get child value', function() {
            var result = get.call(obj, 'a');
            result.should.deepEqual({
                b: 2,
                c: null,
            });
            result.get.should.be.an.Function();
            result.get('b').should.equal(2);
            should(result.get('c')).equal(null);
        });

        it('leaf value should have not `get` method', function() {
            var result = get.call(obj, 'a.b');
            should(result.get).equal(undefined);
        });
    });
});

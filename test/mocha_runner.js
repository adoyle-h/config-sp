'use strict';

var Mocha = require('mocha');
var util = require('lodash');

var config = require('./config');
var globals = require('./globals');
var loadCases = require('./load_cases');

var mocha;

function configMocha(mocha) {
    mocha.globals(util.keys(globals));
    mocha.reporter(config.reporter);
    mocha.ignoreLeaks(config.ignoreLeaks);
    mocha.ui(config.ui);
    mocha.useColors(config.colors);
    mocha.useInlineDiffs(config.inlineDiffs);
    mocha.suite.bail(config.bail);
    mocha.suite.slow(config.slow);
    mocha.suite.timeout(config.timeout);
    if (config.grep) mocha.grep(config.grep);
    if (config.invert) mocha.invert();
    if (config.growl) mocha.growl();
    if (config.asyncOnly) mocha.asyncOnly();
}

function init() {
    mocha = new Mocha();
    configMocha(mocha);

    // set limit of stack trace
    Error.stackTraceLimit = config.stackTraceLimit || Infinity;

    // set globals
    util.each(globals, function(val, key) {
        global[key] = val;
    });

    loadCases(mocha);

    return mocha;
}

exports.init = init;

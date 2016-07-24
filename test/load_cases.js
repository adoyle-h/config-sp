'use strict';

var FS = require('fs');
var Path = require('path');

module.exports = function(mocha) {
    var dirPath = Path.resolve(__dirname, './cases');
    FS.readdirSync(dirPath).forEach(function(filename) {
        var filePath = Path.join(dirPath, filename);
        if (FS.statSync(filePath).isFile()
            && filename.endsWith('.js')
        ) {
            mocha.addFile(filePath);
        }
    });
};

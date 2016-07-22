/*
 * grunt-protractor-invoker
 * 
 *
 * Copyright (c) 2015 stoneChen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    var shell = require('shelljs');
    grunt.registerMultiTask('protractor_invoker', 'just to invoke global protractor', function () {
        var protractorCfgFile = this.data.configFile;
        if (protractorCfgFile && !grunt.file.exists(protractorCfgFile)) {
            grunt.log.error('Source file "' + protractorCfgFile + '" not found.');
            return;
        }else if(!protractorCfgFile){
            grunt.log.warn('protractor config file is not specified');
        }
        var child = shell.exec("protractor " + protractorCfgFile,
            {
                aysnc: false,
                silent: false
            }
        );
    });

};

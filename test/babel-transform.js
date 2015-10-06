'use strict';

let Babel = require('babel-core');

module.exports = [{
  ext: '.js',
  transform: function(content, filename) {

    let isNodeModules = filename.split('/').indexOf('node_modules') === 0;
    let isTest = filename.split('/').indexOf('test') === 0;
    let isLib = filename.split('/').indexOf('lib') === 0;

    // Make sure to only transform your code or the dependencies you want
    if (isTest || isLib) {
      let result = Babel.transform(content, {
        sourceMap: 'inline',
        filename: filename,
        sourceFileName: filename
      });
      return result.code;
    } else if (isNodeModules) {
      return content;
    }

    throw Error('babel transform has had some issues, content %o, filename %s', content, filename);
  }
}];

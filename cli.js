#!/usr/bin/env node
// Generated by CoffeeScript 1.6.3
var argv, coffee, errors, help, hintFiles, other, _, _ref, _ref1;

_ = require("underscore");

hintFiles = require("./lib-js/hint");

_ref = require("optimist").usage('$0 [options] filename.coffee ...').options({
  options: {
    alias: 'o',
    describe: 'comma separated list of JSHint options to turn on'
  },
  'default-options-off': {
    type: 'boolean',
    describe: 'turns off default options'
  },
  jshintrc: {
    alias: 'j',
    describe: 'path to a file that holds JSHint configuration options'
  },
  globals: {
    alias: 'g',
    describe: 'comma separated list of global variable names to permit'
  },
  verbose: {
    alias: 'v',
    type: 'boolean',
    describe: 'print more detailed output'
  },
  version: {
    type: 'boolean',
    describe: 'print the version'
  },
  help: {
    alias: 'h',
    type: 'boolean',
    describe: 'print usage info'
  }
}), argv = _ref.argv, help = _ref.help;

switch (false) {
  case !argv.version:
    console.log(require("./package.json").version);
    break;
  case !argv.help:
    console.log(help());
    break;
  default:
    _ref1 = _(argv._).groupBy(function(path) {
      if (/.+\.coffee$/.test(path)) {
        return "coffee";
      } else {
        return "other";
      }
    }), coffee = _ref1.coffee, other = _ref1.other;
    if (argv.verbose && (other != null ? other.length : void 0) > 0) {
      console.log("Skipping files that don't end in .coffee:\n" + other.join('\n'));
    }
    errors = hintFiles(coffee, argv, true);
    if (_.flatten(errors).length === 0) {
      process.exit(0);
    } else {
      process.exit(1);
    }
}

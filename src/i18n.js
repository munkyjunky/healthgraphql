const Polyglot = require('node-polyglot');
const polyglot = new Polyglot();
const strings = require('../res/i18n/en.json');

polyglot.extend(strings);

module.exports = polyglot;
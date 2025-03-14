'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const { runDev } = require('../core/webpack.dev.js');
runDev();

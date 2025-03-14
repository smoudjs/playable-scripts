'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { runBuild } = require('../core/webpack.build.js');
runBuild();

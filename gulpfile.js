const gulp  = require('gulp');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

// Pull in some optional configuration from the package.json file, a la:
// "vfConfig": {
//   "vfName": "My Component Library",
//   "vfNameSpace": "myco-",
//   "vfComponentPath": "./src/components",
//   "vfComponentDirectories": [
//      "vf-core-components",
//      "../node_modules/your-optional-collection-of-dependencies"
//     NOTE: Don't forget to symlink: `cd components` `ln -s ../node_modules/your-optional-collection-of-dependencies`
//    ],
//   "vfBuildDestination": "./build",
//   "vfThemePath": "@frctl/mandelbrot"
// },
// all settings are optional
// todo: this could/should become a JS module
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('./package.json'));
const vfCoreConfig = JSON.parse(fs.readFileSync(require.resolve('@visual-framework/vf-core/package.json')));
config.vfConfig = config.vfConfig || [];
global.vfName = config.vfConfig.vfName || "Visual Framework 2.0";
global.vfNamespace = config.vfConfig.vfNamespace || "vf-";
global.vfComponentPath = config.vfConfig.vfComponentPath || path.resolve('.', __dirname + '/components');
global.vfBuildDestination = config.vfConfig.vfBuildDestination || __dirname + '/temp/build-files';
global.vfThemePath = config.vfConfig.vfThemePath || './tools/vf-frctl-theme';
global.vfVersion = vfCoreConfig.version || 'not-specified';
const componentPath = path.resolve('.', global.vfComponentPath).replace(/\\/g, '/');
const componentDirectories = config.vfConfig.vfComponentDirectories || ['vf-core-components'];
const buildDestionation = path.resolve('.', global.vfBuildDestination).replace(/\\/g, '/');

// Tasks to build/run vf-core component system
require('./node_modules/\@visual-framework/vf-core/tools/gulp-tasks/_gulp_rollup.js')(gulp, path, componentPath, componentDirectories, buildDestionation);

// Store fractal build mode
let fractalBuildMode;

// Prepare Eleventy
process.argv.push('--config=eleventy.js'); // Eleventy config
let elev;

// Watch folders for changess
gulp.task('watch', function() {
  gulp.watch(['./src/components/**/*.scss', '!./src/components/**/package.variables.scss'], gulp.parallel('vf-css'));
  gulp.watch(['./src/components/**/*.js'], gulp.parallel('vf-scripts'));
  // gulp.watch(['./src/**/*.{njk,html,md}'], gulp.series('eleventy:reload'));
});

gulp.task('fractal:development', function(done) {
  fractalBuildMode = 'server';
  global.vfOpenBrowser = true; // if you want to open a browser tab for the component library
  done();
});

gulp.task('fractal:build', function(done) {
  fractalBuildMode = 'dataobject'; // run fractal in server mode as there's no need for static html assets
  global.vfOpenBrowser = false; // if you want to open a browser tab for the component library
  done();
});

// Run eleventy, but only after we wait for fractal to bootstrap
gulp.task('fractal', function(done) {
  global.vfBuilderPath = __dirname + '/build/vf-core-components';
  global.vfDocsPath = __dirname + '/node_modules/\@visual-framework/vf-eleventy--extensions/fractal/docs';
  global.fractal = require('@visual-framework/vf-core/fractal.js').initialize(fractalBuildMode,fractalReadyCallback); // make fractal components are available gloablly

  function fractalReadyCallback(fractal) {
    global.fractal = fractal; // save fractal globally
    console.log('Done building Fractal');
    done();
  }
});

// Init Eleventy
gulp.task('eleventy:init', function(done) {
  elev = require('./node_modules/\@visual-framework/vf-eleventy--extensions/11ty/cmd.js');
  done();
});

// Run elevent for local development
gulp.task('eleventy:develop', function(done) {
  process.argv.push('--serve');
  process.env.ELEVENTY_ENV = 'development';

  // You could instead use elev.write() here, but then you should add your own browsersync task
  elev.watch().then(function() {
    console.log('Eleventy loaded, serving to browser');
    elev.serve('3000');
    done();
  });
});

// Run eleventy as a static build
gulp.task('eleventy:build', function(done) {
  process.argv.push('--quiet');
  process.env.ELEVENTY_ENV = 'production';

  elev.write().then(function() {
    console.log('Done building 11ty');
    done();
  });
});

// Refresh eleventy
// This is more thorough than elev.watch() as it will
// also capture variable changes
gulp.task('eleventy:reload', function(done) {
  elev.restart()
  elev.write()
});

// Eleventy doesn't always finish promptly, this ensures we exit gulp "cleanly"
gulp.task('manual-exit', function(done) {
  done()(process.exit());
});

// Let's build this sucker.
gulp.task('build', gulp.series(
  'vf-clean',
  gulp.parallel('vf-css','vf-scripts','vf-component-assets'),
  'fractal:build',
  'fractal',
  'eleventy:init',
  'eleventy:build',
  'manual-exit'
));

// Build and watch things during dev
gulp.task('dev', gulp.series(
  'vf-clean',
  gulp.parallel('vf-css','vf-scripts','vf-component-assets'),
  'fractal:development',
  'fractal',
  'eleventy:init',
  'eleventy:develop',
  gulp.parallel('watch','vf-watch')
));

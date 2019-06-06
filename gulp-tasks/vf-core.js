// 'use strict';

const fs = require('fs');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const SassInput = './src/components/vf-componenet-rollup/index.scss';
const SassOutput = './build/css';
const autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
const config = JSON.parse(fs.readFileSync('./package.json'));
global.vfName = config.vfConfig.vfName;
global.vfNamespace = config.vfConfig.vfNamespace;
global.vfComponentPath = './src/components';
// global.vfThemePath = './tools/vf-frctl-theme';

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

const gulp = require('gulp');
const path = require('path');
const notify = require('gulp-notify');
const shell = require('gulp-shell');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const ListStream = require('list-stream');
const connect = require('gulp-connect');
const glob = require('glob');
const replace = require('gulp-replace');

// Sass and CSS Stuff
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const nodeModuleImport = require('@node-sass/node-module-importer');
const recursive = require('../node_modules/\@visual-framework/vf-core/tools/css-generator/recursive-readdir.js');

// Linting things
const postcss     = require('gulp-postcss');
const reporter    = require('postcss-reporter');
const syntax_scss     = require('postcss-scss');
const gulpStylelint   = require('gulp-stylelint');
const backstopjs        = require('backstopjs');

// Image things
const svgmin = require('gulp-svgmin');

// JS Stuff
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rollup = require('gulp-better-rollup');
const includePaths = require('rollup-plugin-includepaths');

const componentPath = path.resolve('.', 'src/components' );
console.log(componentPath)

// Local Server Stuff
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Design Tokens
const theoG = require('gulp-theo')
const theo = require('theo')

// -----------------------------------------------------------------------------
// Sass and CSS Tasks
// -----------------------------------------------------------------------------

gulp.task('vf-css', function() {
  const sassOpts = {
    // Import sass files
    // We'll check to see if the file exists before passing
    // it to sass for compilation
    importer: [nodeModuleImport, function(url,prev,done) {
      var truncatedUrl = url.split(/[/]+/).pop();
      var parentFile = prev.split(/[/]+/).pop();

      // If you do not want to interveen in certain file names
      // if (parentFile == '_index.scss' || parentFile == '_vf-mixins.scss' || parentFile == 'vf-functions.scss') {
      //   return null;
      // }

      // only intervene in index.scss rollups
      if (parentFile == 'index.scss') {
        if (availableComponents[url]) {
          done(url);
        } else if (availableComponents['_'+truncatedUrl]) {
          // maybe it was an _filename.scss?
          done(url);
        } else if (availableComponents[truncatedUrl]) {
          done(url);
        } else {
          let importWarning = `Couldn\'t find ${url} referenced in ${prev}`;
          console.warn(importWarning);
          done({ contents: `/* ${importWarning} */` });
        }
      } else {
        return null;
      }

    }],
    includePaths: [
      path.resolve('.', 'src/components/vf-components/vf-sass-config/variables'),
      path.resolve('.', 'src/components/vf-components/vf-sass-config/functions'),
      path.resolve('.', 'src/components/vf-components/vf-sass-config/mixins'),
      path.resolve('.', 'src/components'),
      path.resolve('.', 'src/components/vf-form'),
      path.resolve('.', 'src/components/vf-components'),
      path.resolve('.', 'src/components/vf-core-components'),
      path.resolve('.', 'node_modules'),
    ]
  };

  // Find all the component sass files available.
  // We'll pass this as a variable to our sass build so we can
  // only include the file if it exists.
  var availableComponents = {}; // track the components avaialble
  return gulp
    .src(['./src/components/**/*.scss','./src/components/**/**/*.scss'], {
      allowEmpty: true,
      ignore: ['./src/components/**/index.scss']
    })
    .pipe(ListStream.obj(function (err, data) {
      if (err)
        throw err
      data.forEach(function (value, i) {
        // Keep only the file name
        var value = value.history[0].split(/[/]+/).pop();

        availableComponents[value] = true;
      });

      runSassBuild();
    }));

    function runSassBuild(){
      gulp
        .src(SassInput)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .on(
          'error',
          notify.onError(function(error) {
            process.emit('exit') // this fails precommit, but allows guld dev to work
            return 'Problem at file: ' + error.message;
          })
        )
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(browserSync.stream())
        .pipe(sourcemaps.write())
        .pipe(rename(
          {
            basename: "styles"
          }
        ))
        .pipe(gulp.dest(SassOutput))
        .pipe(cssnano())
        .pipe(rename(
          {
            suffix: ".min"
          }
        ))
        .pipe(gulp.dest(SassOutput));
    }

});

// Sass Lint
gulp.task("scss-lint", function lintCssTask() {

  // For stylelint config rules see .stylelinrc

  return gulp
    .src(
      ['components/**/embl-*.scss', 'components/**/vf-*.scss', '!components/**/index.scss', '!assets/**/*.scss']
    )
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: "string", console: true}
      ]
    }));
});


// -----------------------------------------------------------------------------
// Scripts Tasks
// -----------------------------------------------------------------------------

// Rollup all JS imports into CJS and babel them to ES5
gulp.task('scripts:es5', function() {
  let includePathOptions = {
      include: {},
      paths: [
        path.resolve('.', 'components'),
        path.resolve('.', 'components/vf-core-components'),
        path.resolve('.', 'components/vf-form'),
      ],
      external: ['vfTabs'],
      extensions: ['.js']
  };

  return gulp.src('./src/components/vf-componenet-rollup/scripts.js')
    // .pipe(sourcemaps.init())
    .pipe(rollup({
      // There is no `input` option as rollup integrates into the gulp pipeline
      treeshake: false,
      // external: ['vfTabs','vfBanner'],
      plugins: [
        babel({
          "presets": [
            [
              "@babel/preset-env",
              {
                "targets": "> 0.25%, not dead, last 2 versions"
              }
            ]
          ]
        }),
        includePaths(includePathOptions)
      ]
    }, {
      // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
      format: 'cjs',
    }))
    // inlining the sourcemap into the exported .js file
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/scripts'));
});


// Eventually we'll want to support ES6 natively with ES5 as fallback, `scripts.es5.js`
gulp.task('scripts:modern', function() {
  return gulp.src('./src/components/vf-componenet-rollup/scripts.js')
      .pipe(rename(function (path) {
        path.extname = ".modern.js";
      }))
    .pipe(gulp.dest('./public/scripts'));
});

// -----------------------------------------------------------------------------
// Component Assets
// -----------------------------------------------------------------------------
gulp.task('component-assets', function() {
  return gulp
    .src(['./src/components/**/**/assets/**/*'])
    .pipe(gulp.dest('./public/assets'));
});


// -----------------------------------------------------------------------------
// Component Assets
// -----------------------------------------------------------------------------
gulp.task('svg', () => {
  return gulp
    .src('./src/components/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./src/components'));
});

// -----------------------------------------------------------------------------
// Design Token Tasks
// -----------------------------------------------------------------------------

const theoGeneratedFileWarning = `// This file has been dynamically generated from design tokens
// Please do NOT edit directly.`;
const theoSourceTokenLocation = `// Source: {{relative "${ componentPath }" meta.file}}`;

const theoGeneratedPropertiesTemplate = `${theoGeneratedFileWarning}

${theoSourceTokenLocation}

:root {
  {{#each props as |prop|}}
  {{#if prop.comment}}
  {{{trimLeft (indent (comment (trim prop.comment)))}}}
  {{/if}}
  --{{kebabcase prop.name}}: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}};
{{/each}}
}
`;

const theoGeneratedMapTemplate = `${theoGeneratedFileWarning}

${theoSourceTokenLocation}

\${{stem meta.file}}-map: (
{{#each props as |prop|}}
  {{#if prop.comment}}
  {{{trimLeft (indent (comment (trim prop.comment)))}}}
  {{/if}}
  '{{kebabcase prop.name}}': ({{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}}),
{{/each}}
);
`;

const theoGeneratedSassTemplate = `${theoGeneratedFileWarning}

${theoSourceTokenLocation}

{{#each props as |prop|}}
{{#if prop.comment}}
{{{trimLeft (indent (comment (trim prop.comment)))}}}
{{/if}}
\${{kebabcase prop.name}}: {{#eq prop.type "string"}}"{{/eq}}{{{prop.value}}}{{#eq prop.type "string"}}"{{/eq}};
{{/each}}
`;

// Register design tokens to be processed by Theo

gulp.task('tokens:typographic-scale', () =>
  gulp.src('./src/components/vf-design-tokens/typographic-scales/*.yml')
    .pipe(theoG({
      transform: { type: 'web' },
      format: { type: 'typography-map' }
    }))
    .pipe(rename(function (path) {
      path.extname = ".scss";
    }))
    .pipe(gulp.dest('./src/components/vf-sass-config/variables'))
);

gulp.task('tokens:variables', () =>
  gulp.src('./src/components/vf-design-tokens/variables/*.yml')
    .pipe(theoG({
      transform: { type: 'web' },
      format: { type: 'variables.scss' }
    }))
    .pipe(gulp.dest('./src/components/vf-sass-config/variables'))
);

gulp.task('tokens:maps', () =>
  gulp.src(['./src/components/vf-design-tokens/maps/*.yml', '!./src/components/vf-design-tokens/typographic-scales/*.yml'])
    .pipe(theoG({
      transform: { type: 'web' },
      format: { type: 'map.scss' }
    }))
    .pipe(gulp.dest('./src/components/vf-sass-config/variables'))
);

gulp.task('tokens:props', () =>
  gulp.src(['./src/components/vf-design-tokens/maps/*.yml'])
    .pipe(theoG({
      transform: { type: 'web' },
      format: { type: 'custom-properties.scss' }
    }))
    .pipe(gulp.dest('./src/components/vf-sass-config/variables'))
);

// Register output format for token types
theo.registerFormat( "variables.scss",`${theoGeneratedSassTemplate}`);
theo.registerFormat( "map.scss",`${theoGeneratedMapTemplate}`);
theo.registerFormat( "custom-properties.scss",`${theoGeneratedPropertiesTemplate}`);

// The Theo typography token processor is a bit more complex
// and uses a custom format as a function
theo.registerFormat("typography-map", result => {
  let { category, type } = result
    .get("props")
    .first()
    .toJS();
  return `${theoGeneratedFileWarning}
// Source: ${path.basename(result.getIn(["meta", "file"]))}

$vf-${category}--${type}: (
${result
  .get("props")
  .map(
  prop => `
  '${prop.get("name")}': (
    'font-size': ${prop.getIn(["value", "font-size"])},
    'font-weight': ${prop.getIn(["value", "font-weight"])},
    'line-height': ${prop.getIn(["value", "line-height"])}
  ),`
  )
  .sort()
  .join("\n")}

);
  `;
});


// -----------------------------------------------------------------------------
// Fractal Tasks
// -----------------------------------------------------------------------------

gulp.task('frctlStart', function(done) {
  const fractal = require('./fractal.js').initialize('server',fractalReadyCallback);
  function fractalReadyCallback() {
    done();
  }
});

gulp.task('frctlBuild', function(done) {
  const fractal = require('./fractal.js').initialize('build',fractalReadyCallback);
  function fractalReadyCallback() {
    // Copy compiled css/js and other assets
    gulp.src('./public/**/*')
      .pipe(gulp.dest('./build'));
      console.info('Copied `/public` assets.');

    done();
  }
});

gulp.task('frctlVRT', function(done) {
  const fractal = require('./fractal.js').initialize('VRT',fractalReadyCallback);
  function fractalReadyCallback() {
    // Copy compiled css/js and other assets
    gulp.src('./public/**/*')
      .pipe(gulp.dest('./build'));
      console.info('Copied `/public` assets.');

    done();
  }
});

// -----------------------------------------------------------------------------
// CSS Generator Tasks
// -----------------------------------------------------------------------------

var genCss = function (option) {
  var file_name = path.basename(path.dirname(option.file_path)) + ".css";
  return gulp.src(option.file_path)
    .pipe(sass({
      includePaths: [
        path.resolve('.', 'components/vf-sass-config/variables'),
        path.resolve('.', 'components/vf-sass-config/functions'),
        path.resolve('.', 'components/vf-sass-config/mixins'),
        path.resolve('.', 'components'),
        path.resolve('.', 'components/vf-form'),
        path.resolve('.', 'components/vf-core-components'),
        path.resolve('.', 'node_modules')
      ],
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename(file_name))
    .pipe(gulp.dest(option.dir));
};

gulp.task('CSSGen', function(done) {
  recursive(componentPath, ['*.css'], function (err, files) {
    files.forEach(function(file) {
      if (file.file.indexOf('index.scss') > -1) {
        genCss(file);
      }
    });
  });
  done();
});

// -----------------------------------------------------------------------------
// Watch Tasks
// -----------------------------------------------------------------------------

gulp.task('watch', function(done) {
  gulp.watch('./src/components/**/*.scss', gulp.series(['vf-css', 'scss-lint'])).on('change', reload);
  gulp.watch('./src/components/**/*.js', gulp.series('scripts')).on('change', reload);
  gulp.watch('./src/components/**/**/assets/*.svg', gulp.series('svg','component-assets')).on('change', reload);
  gulp.watch(['./src/components/**/**/assets/*', '!./src/components/**/**/assets/*.svg'], gulp.series('component-assets')).on('change', reload);
});

// -----------------------------------------------------------------------------
// Backstop Tasks
// -----------------------------------------------------------------------------

var backstopConfig = {
  //Config file location
  config: './backstopConfig.js'
}

gulp.task('backstop_reference', () => backstopjs('reference', backstopConfig));
gulp.task('backstop_test', () => backstopjs('test', backstopConfig));

gulp.task('tests', function(done) {
  connect.server({
    port: 8888
  });
  done();
});
gulp.task('testdone', function(done) {
  connect.serverClose();
  done();
});

// -----------------------------------------------------------------------------
// Default Tasks
// -----------------------------------------------------------------------------


gulp.task('scripts', gulp.series(
  'scripts:es5', 'scripts:modern'
));

gulp.task('dev', gulp.series(
  'component-assets', ['vf-css', 'scripts'], 'frctlStart', 'watch'
));

gulp.task('tokens', gulp.parallel(
  'tokens:variables', 'tokens:typographic-scale', 'tokens:maps', 'tokens:props'
));

// Build as a static site for CI
gulp.task('build', gulp.series(
  'tokens', 'scss-lint', 'CSSGen', 'vf-css', 'component-assets', 'scripts', 'frctlBuild'
));

gulp.task('prepush-test', gulp.parallel(
  'scss-lint', 'vf-css'
));

gulp.task('component', shell.task(
  ['yo ./tools/component-generator']
));


gulp.task('vizres-setup', gulp.series('tests', 'vf-css', 'backstop_reference', 'testdone'));
gulp.task('vizres-test', gulp.series('tests', 'vf-css', 'backstop_test', 'testdone'));

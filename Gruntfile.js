const sass = require('node-sass');

module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        outputStyle: 'compressed',
      },
      dist: {
        files: {
          // 'destination': 'source'
          'css/redturtlegallery.css': 'sass/redturtlegallery.scss',
        },
      },
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie >= 11', 'iOS >= 6'],
          }),
        ],
      },
      dist: {
        src: 'css/*.css',
      },
    },
    requirejs: {
      'redturtle-gallery': {
        options: {
          baseUrl: './',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          paths: {
            jquery: 'empty:',
          },
          wrapShim: true,
          name: 'js/integration.js',
          exclude: ['jquery'],
          out: 'js/bundle-compiled.js',
          optimize: 'none',
        },
      },
    },
    uglify: {
      gallery: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: false,
        },
        files: {
          'js/redturtle-gallery-bundle-compiled.min.js': [
            'js/bundle-compiled.js',
          ],
        },
      },
    },
    watch: {
      styles: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
      },
      scripts: {
        files: ['./js/integration.js'],
        tasks: ['requirejs', 'uglify'],
      },
    },
  });

  // CWD to theme folder
  grunt.file.setBase('./src/redturtle/gallery/browser/static');

  grunt.registerTask('compile', ['sass', 'postcss', 'requirejs', 'uglify']);
  grunt.registerTask('default', ['watch']);
};

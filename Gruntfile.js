module.exports = function (grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
      },
      dist: {
        files: {
          // 'destination': 'source'
          'css/redturtlegallery.css': 'sass/redturtlegallery.scss',
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie >= 11', 'iOS >= 6']
          })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },
    watch: {
      scripts: {
        files: [
          'sass/**/*.scss',
        ],
        tasks: ['sass', 'postcss']
      }
    }
  });


  // CWD to theme folder
  grunt.file.setBase('./src/redturtle/gallery/browser/static');

  grunt.registerTask('compile', ['sass', 'postcss']);
  grunt.registerTask('default', ['watch']);
};

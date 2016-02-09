module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    ngconstant: {
      options: {
        name: 'config',
        dest: 'js/config.js',
        wrap: '"use strict";\n\n{%= __ngModule %}',
        space: '  ',
        constants: {
          config: {
            debug: false,
            LANGUAGE_KEYS: ['en', 'es']
          }
        }
      },
      development: {
        constants: {
          config: {
            ENV: 'development',
            API_ENDPOINT_URL: 'http://api.bemyguide-dev.com:3000'
          }
        }
      },
      production: {
        constants: {
          config: {
            ENV: 'production',
            API_ENDPOINT_URL: 'http://api.bemyguide.today:8082'
          }
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-constant');

  // Tasks
  grunt.registerTask('default', ['ngconstant:production']);
};

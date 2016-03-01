module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
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
            API_ENDPOINT_URL: 'http://api.bemyguide-dev.com:3000',
            debug: true
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-constant');

  // Tasks
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['ngconstant:production', 'build']);
};

/* global module, require, process */

(function() {
  'use strict';
  module.exports = function(grunt) {

    var localConfig;
    try {
      localConfig = require('./server/configuration/local_env.express');
    } catch (e) {
      localConfig = {};
    }

    require('jit-grunt')(grunt, {
      express: 'grunt-express-server',
      ngtemplates: 'grunt-angular-templates',
      buildcontrol: 'grunt-build-control'
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-ng-annotate');


    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),
      application: {
        name: 'Cirons',
        client: require('./bower.json').appPath || 'client',
        js: 'app/**/*.js',
        common: 'common',
        dist: 'dist'
      },


      uglify: {
        options: {

          banner: '/*! <%= application.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: false
        },
        dist: {
          files: {
            'dist/public/bundles/vendor.js': ['dist/public/bundles/vendor.js'],
            'dist/public/bundles/code.js': ['dist/public/bundles/code.js']
          }
        }
      },
      browserify: {
        dist: {
          files: {
            'dist/public/bundles/vendor.js': ['app/bundles/vendor.bundles.js'],
            'dist/public/bundles/code.js': ['app/bundles/code.bundles.js', '<%= ngtemplates.app.dest %>']
          },

        }
      },
      jshint: {
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          },
          jshintrc: '<%= application.client %>/.jshintrc',
          reporter: require('jshint-stylish')
        },
        server: {
          options: {
            jshintrc: 'server/.jshintrc'
          },
          src: [
            'server/**/*.js',
            '!server/**/*.spec.js'
          ]
        },
        serverTest: {
          options: {
            jshintrc: 'server/.jshintrc-spec'
          },
          src: ['server/**/*.spec.js']
        },
        all: [
          '<%= application.client %>/{app,components}/**/*.js',
          '!<%= application.client %>/{app,components}/**/*.spec.js',
          '!<%= application.client %>/{app,components}/**/*.mock.js'
        ],
        test: {
          src: [
            '<%= application.client %>/{app,components}/**/*.spec.js',
            '<%= application.client %>/{app,components}/**/*.mock.js'
          ]
        }
      },
      sass: { // Task
        dist: { // Target
          options: { // Target options
            style: 'compressed',
            compass: true
          },
          files: { // Dictionary of files
            'dist/public/style.min.css': '<%= application.client %>/app/style.scss' // 'destination': 'source'
          }
        }
      },
      watch: {
        jshint: {
          files: ['<%= application.js %>'],
          tasks: ['jshint']
        },
        browserify: {
          files: ['<%= application.js %>'],
          tasks: ['browserify']
        },

        inject_css: {
          files: ['dist/style.css'],
          tasks: ['injector:css']
        },
        inject_bundles: {
          files: ['dist/public/bundles/vendor.js', 'dist/public/bundles/code.js'],
          tasks: ['injector:scripts']
        },

      },
      ngtemplates: {
        options: {
          module: 'UPBIS_MAIN_APP',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
        },
        app: {
          cwd: '<%= application.client %>',
          src: ['app/**/*.html'],
          dest: '.tmp/templates.js'
        },
      },
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= application.client %>',
            dest: '<%= application.dist %>/public',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'assets/**/*',
              'nginx/**/*',
              'index.html'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= application.dist %>/public/assets/images',
            src: ['generated/*']
          }, {
            expand: true,
            cwd: '<%= application.common %>',
            dest: '<%= application.dist %>/common',
            src: ['*']
          }, {
            expand: true,
            dot: true,
            cwd: '<%= application.client %>/bower_components/material-design-iconic-font/dist',
            dest: '<%= application.dist %>/public',
            src: [
              'fonts/*'
            ]
          }, {
            expand: true,
            dest: '<%= application.dist %>',
            src: [
              'node_modules/ModuleLoader/**',
              'package.json',
              'server/**/*'
            ]
          }]
        }
      },
      env: {
        test: {
          NODE_ENV: 'test'
        },
        prod: {
          NODE_ENV: 'production'
        },
        all: localConfig
      },
      injector: {
        options: {
          template: '<%= application.dist %>/public/index.html'
        },
        scripts: {
          options: {
            transform: function(filePath) {
              filePath = filePath.replace('/dist/public/', '');
              return '<script src="' + filePath + '"></script>';
            },
            starttag: '<!-- injector:js -->',
            endtag: '<!-- endinjector -->'
          },
          files: {
            '<%= application.dist %>/public/index.html': ['<%= application.dist %>/public/bundles/vendor.js', '<%= application.dist %>/public/bundles/code.js', ]
          }
        },
        css: {
          options: {
            transform: function(filePath) {
              filePath = filePath.replace('/dist/public/', '');
              return '<link rel="stylesheet" href="' + filePath + '">';
            },
            starttag: '<!-- injector:css -->',
            endtag: '<!-- endinjector -->'
          },
          files: {
            '<%= application.dist %>/public/index.html': [
              '<%= application.dist %>/public/style.min.css'
            ]
          }
        }
      },
      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= application.dist %>/*',
              '!<%= application.dist %>/.git*',
              '!<%= application.dist %>/.openshift',
              '!<%= application.dist %>/Procfile'
            ]
          }]
        },
        server: '.tmp'
      },
      buildcontrol: {
        options: {
          dir: 'dist',
          commit: true,
          push: true,
          connectCommits: false,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        heroku: {
          options: {
            remote: 'git@heroku.com:aqueous-stream-9919.git',
            branch: 'dist',
            remoteBranch: 'master'
          }
        }

      }

    });


    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
      this.async();
    });

    grunt.registerTask('serve', function(target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'buildcontrol']);
      }

      if (target === 'debug') {
        return grunt.task.run([
          'clean:server',
          'env:all',
          'injector:sass',
          'concurrent:server',
          'injector',
          'wiredep',
          'autoprefixer',
          'concurrent:debug'
        ]);
      }

      grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass',
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'wait',
        'open',
        'watch'
      ]);
    });

    grunt.registerTask('build', [
      'clean:dist',
      'connect',
      'qunit',
      //'jshint',
      'ngtemplates',
      'browserify',
      'sass',
      'uglify',
      'copy:dist',
      'injector'
    ]);


  };

})();

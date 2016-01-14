module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks("grunt-remove-logging");
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    application: {
      name: 'Cirons',
      client: './app',
      js: ['app/components/**/*.js', 'app'],
      dist: 'dist'
    },

    watch: {
      jshint: {
        files: ['<%= application.js %>'],
        tasks: ['jshint']
      },

      inject_css: {
        files: ['dist/style.css'],
        tasks: ['injector:css']
      },
      inject_bundles: {
        files: ['dist/vendor.js', 'dist/code.js'],
        tasks: ['injector:scripts']
      },

    },
    ngtemplates: {
      options: {
        module: 'CIRONS-MAIN-APP',
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
        src: ['components/**/*.html', '!bundles', '!libs'],
        dest: 'dist/templates.js'
      },
    },
    browserify: {
      dist: {
        files: {
          'dist/code.js': ['<%= application.client %>/bundles/code.bundle.js'],
          'dist/vendor.js': ['<%= application.client %>/bundles/vendor.bundle.js']
        }
      }
    },
    sass: {
      options: {
        style: 'compressed',
        compass: true
      },
      dist: {
        files: {
          'dist/style.css': '<%= application.client %>/assets/css/sass/cirons.scss'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= application.client %>',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '!assets/css',
            'assets/images/*.png',
            'index.html'
          ]
        }]
      }
    },
    injector: {
      options: {
        template: 'dist/index.html'
      },
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/dist/', '');
            var ts = new Date().getTime();
            return '<script src="' + filePath + '?'+ts+'"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'dist/index.html': ['dist/vendor.js', 'dist/code.js', 'dist/templates.js']
        }
      },


      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/dist/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'dist/index.html': [
            'dist/style.css'
          ]
        }
      }
  },

    'string-replace': {
      dist: {
        files: {
          'dist/': 'dist/code.js'
        },
        options: {
          replacements: [{
            pattern: /http:\/\/janalex\.beta\.cirons\.com/g,
            replacement: ''
          }]
        }
      }
  },

  removelogging: {
    dist: {
      src: "dist/code.js",
      options: {
        // see below for options. this is optional.
      }
    }
},

  'ftp-deploy': {
      build: {
        auth: {
          host: 'cirons.com',
          port: 21,
          authKey: 'glesys'
        },
        src: 'dist',
        dest: '/private/var/cirons/frontend',
        exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp']
      }
    }

  });

  grunt.registerTask('default', ['browserify', 'sass', 'ngtemplates', 'copy', 'injector']);
  grunt.registerTask('production', ['browserify', 'sass', 'ngtemplates', 'copy', 'injector', 'string-replace', 'removelogging', 'ftp-deploy']);

};

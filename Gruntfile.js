module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-injector');

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
            return '<script src="' + filePath + '"></script>';
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


  });

  grunt.registerTask('default', ['browserify', 'sass', 'ngtemplates', 'copy', 'injector']);

};

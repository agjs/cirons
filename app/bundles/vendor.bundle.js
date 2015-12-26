(function() {
  'use strict';

  global.$ = global.jQuery = require('jquery');
  global.moment = require('moment');

  require('../libs/angular/angular.min.js');
  require('../libs/angular-ui-router/release/angular-ui-router.min.js');
  require('../libs/angular-animate/angular-animate.min.js');
  require('../libs/angular-route/angular-route.min.js');
  require('../libs/angular-cookies/angular-cookies.min.js');
  require('../libs/satellizer/satellizer.min.js');
  require('../libs/angular-breadcrumb/dist/angular-breadcrumb.js');
  require('../libs/angular-xeditable/dist/js/xeditable.min.js');
  require('../libs/angular-http-auth/src/http-auth-interceptor.js')
  require('../libs/ng-lodash/build/ng-lodash.min.js');
  require('../libs/angular-bootstrap/ui-bootstrap.min.js');
  require('../libs/angular-bootstrap/ui-bootstrap-tpls.min.js');
  require('../libs/angular-loading-bar/build/loading-bar.min.js');

  window.c3 = require('c3');
  require('../libs/c3-angular/c3-angular.min.js');
  require('../libs/angular-ui-calendar/src/calendar.js');
  require('../libs/fullcalendar/dist/fullcalendar.min.js');
  require('../libs/fullcalendar/dist/gcal.js');
  window.dropzone = require('../libs/dropzone/dropzone-amd-module.js');

})();

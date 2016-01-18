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
  require('../libs/semantic/dist/semantic.min.js');

  window.d3 = require('d3');
  window.c3 = require('c3');
  require('../libs/c3-angular/c3-angular.min.js');
  require('../libs/angular-ui-calendar/src/calendar.js');
  require('../libs/fullcalendar/dist/fullcalendar.min.js');
  require('../libs/fullcalendar/dist/gcal.js');
  window.dropzone = require('../libs/dropzone/dropzone-amd-module.js');

  require('../libs/pusher/dist/pusher.min.js');
  require('../libs/pusher-angular/lib/pusher-angular.min.js');

  require('../libs/angulartics/dist/angulartics.min.js');
  require('../libs/angulartics-google-analytics/dist/angulartics-google-analytics.min.js');

})();

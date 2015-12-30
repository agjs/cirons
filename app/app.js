(function() {
  "use strict";

  module.exports = angular.module('CIRONS-MAIN-APP', [
    'ui.router',
    'ngAnimate',
    'ngRoute',
    'angular-loading-bar',
    'http-auth-interceptor',
    'ngCookies',
    'satellizer',
    'ncy-angular-breadcrumb',
    'xeditable',
    'ngLodash',
    'ui.bootstrap',
    'gridshore.c3js.chart',
    'ui.calendar',
    'pusher-angular'

  ]);

  window.pusherClient = new Pusher('3400e69279ea78f5b712', {
    encrypted: true
  });



})();

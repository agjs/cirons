(function() {
  "use strict";


  angular.module('CIRONS-MAIN-APP').config(function($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider) {




    $httpProvider.interceptors.push('authenticationInterceptor');
    $locationProvider.html5Mode(false);

    $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';

    $breadcrumbProvider.setOptions({
      template: 'bootstrap3'
    });


  })


})();

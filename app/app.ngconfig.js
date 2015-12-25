(function() {
  "use strict";

  module.exports = ngConfig;

  function ngConfig($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider, cfpLoadingBarProvider) {



    $httpProvider.interceptors.push('authenticationInterceptor');
    $urlRouterProvider.otherwise('/dashboard/finance');
    $locationProvider.html5Mode(false);

    $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';
    $breadcrumbProvider.setOptions({
      template: 'bootstrap3'
    });


    // Custom template for angular loading bar
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';


  }

  ngConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$breadcrumbProvider', 'cfpLoadingBarProvider'];

})();

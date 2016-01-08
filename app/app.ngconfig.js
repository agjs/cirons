(function() {
  "use strict";

  module.exports = ngConfig;

  function ngConfig($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider, cfpLoadingBarProvider) {


    $httpProvider.interceptors.push('authenticationInterceptor');
    $httpProvider.interceptors.push(function($q) {
      return {
        'response': function(response) {

           if(response.data && response.data.validation_error){
               for(var key in response.data.validation_error){
                   var errors = response.data.validation_error[key];
                   for(var ii = 0; ii < errors.length; ii++){
                       var error = errors[ii];
                       alert(error);
                   }
               }
               return $q.reject(response);
           }

           return response;
        }
      };
    });

    $urlRouterProvider.otherwise('/dashboard/finance');
    $locationProvider.html5Mode(false);

    $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';
    $breadcrumbProvider.setOptions({
      template: 'bootstrap3'
    });


    // Custom template for angular loading bar
    cfpLoadingBarProvider.spinnerTemplate = '';


  }

  ngConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$breadcrumbProvider', 'cfpLoadingBarProvider'];

})();

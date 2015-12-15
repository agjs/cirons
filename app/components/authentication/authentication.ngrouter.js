/* global module  */
(function() {
  'use strict';
  module.exports = authenticationRoutes;

  /*@ngInject*/
  function authenticationRoutes($stateProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        controller: 'loginController',
        templateUrl: "components/authentication/login/login.view.html"
    })

  }

  authenticationRoutes.$inject = ['$stateProvider'];

})();

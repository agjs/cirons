/* global module  */
(function() {
  'use strict';
  module.exports = accountingRoutes;

  /*@ngInject*/
  function accountingRoutes($stateProvider) {
    $stateProvider
      .state('accounting', {
        url: "/accounting",
        controller: 'hrController',
        templateUrl: "components/accounting/accounting.view.html",
      })

  }

  accountingRoutes.$inject = ['$stateProvider'];

})();

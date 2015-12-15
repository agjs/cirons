(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('accounting', {
        url: "/accounting",
        controller: 'hrController',
        templateUrl: "components/accounting/accounting.view.html",
      })


  });
})();

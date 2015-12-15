(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider

      .state('dashboard', {
        url: "/dashboard",
        controller: '',
        controllerAs: '',
        templateUrl: "components/dashboard/dashboard.view.html",
        
      })
      .state('dashboard.finance', {
        url: "/finance",
        templateUrl: ""
      })
      .state('dashboard.sales', {
        url: "/sales",
        templateUrl: ""
      })
      .state('dashboard.taxes', {
        url: "/taxes",
        templateUrl: ""
      })
      .state('dashboard.expenses', {
        url: "/expenses",
        templateUrl: ""
      })

  });


})();

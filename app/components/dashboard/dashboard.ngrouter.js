(function() {
  'use strict';
  module.exports = dashboardRouter;

  function dashboardRouter($stateProvider) {
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

  }

  dashboardRouter.$inject = ['$stateProvider'];

})();

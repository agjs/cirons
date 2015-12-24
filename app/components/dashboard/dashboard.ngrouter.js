(function() {
  'use strict';
  module.exports = dashboardRouter;

  function dashboardRouter($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/dashboard",
        abstract: true,
        views: {
          '': {
            templateUrl: "components/dashboard/dashboard.view.html",
            controller: 'dashboardController'
          }
        }

      })

    .state('dashboard.finance', {
        parent: 'dashboard',
        url: "/finance",
        controller: 'dashboardFinanceController',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/finance/dashboard_finance.view.html",
          }
        }
      })
      .state('dashboard.sales', {
        url: "/sales",
        parent: 'dashboard',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/sales/dashboard_sales.view.html",
          }
        }
      })
      .state('dashboard.taxes', {
        url: "/taxes",
        parent: 'dashboard',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/taxes/dashboard_taxes.view.html",
          }
        }
      })
      .state('dashboard.expenses', {
        url: "/expenses",
        parent: 'dashboard',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/expenses/dashboard_expenses.view.html",
          }
        }
      })

  }

  dashboardRouter.$inject = ['$stateProvider'];

})();

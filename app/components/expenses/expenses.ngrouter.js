(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('expenses', {
                url: "/expenses",
                controller: 'expensesController',
                templateUrl: "components/expenses/expenses.view.html"
            })

            .state('expenses.suppliers', {
                url: "/suppliers",
                controller: 'suppliersController',
                templateUrl: "components/suppliers/suppliers.view.html"
            })


    });
})();



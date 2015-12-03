(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('expenses', {
                url: "/expenses",
                controller: 'expensesController',
                templateUrl: "components/expenses/expenses.view.html",
                ncyBreadcrumb: {
                    label: 'Expenses'
                }
            })

            .state('suppliers', {

                url: "/expenses/suppliers",
                ncyBreadcrumb: {
                    parent: 'expenses',
                    label: 'Suppliers'
                },
                views: {
                    'suppliersList@': {
                        controller: 'suppliersController',
                        templateUrl: 'components/expenses/suppliers/suppliers_list.view.html'
                    },
                    'suppliersContent@': {
                        templateUrl: 'components/expenses/suppliers/suppliers_content.view.html'
                    }


                }
            })


    });
})();



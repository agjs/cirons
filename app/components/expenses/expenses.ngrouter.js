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
                    '': {
                        templateUrl: 'components/expenses/suppliers/suppliers.view.html',
                        controller: 'suppliersController'

                    },
                    'suppliersList@suppliers': {
                        templateUrl: 'components/expenses/suppliers/suppliers_list.view.html'
                    }


                }
            })

            .state('suppliers.create', {
                url: "/create",
                ncyBreadcrumb: {
                    parent: 'suppliers',
                    label: 'Create new'
                },
                views: {
                    '': {
                        templateUrl: 'components/expenses/suppliers/suppliers.view.html'
                    },
                    'suppliersList@suppliers': {
                        templateUrl: 'components/expenses/suppliers/suppliers_list.view.html'
                    },
                    'suppliersContent@suppliers': {
                        templateUrl: 'components/expenses/suppliers/suppliers_create.view.html',
                        controller: 'suppliersCreateController'
                    }
                }
            })

            .state('suppliers.item', {
                url: "/:id",
                params: {
                    supplier: undefined
                },
                ncyBreadcrumb: {
                    parent: 'suppliers',
                    label: '{{id}}'
                },
                views: {
                    '': {
                        templateUrl: 'components/expenses/suppliers/suppliers.view.html'
                    },
                    'suppliersList@suppliers': {
                        templateUrl: 'components/expenses/suppliers/suppliers_list.view.html'
                    },
                    'suppliersContent@suppliers': {
                        templateUrl: 'components/expenses/suppliers/suppliers_content.view.html',
                        controller: 'suppliersSingleItemController'
                    }
                }
            })


    });
})();



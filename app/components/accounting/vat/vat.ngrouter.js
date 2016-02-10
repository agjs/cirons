/* global module  */
(function() {
    'use strict';
    module.exports = VATRoutes;

    /*@ngInject*/
    function VATRoutes($stateProvider) {
        $stateProvider
            .state('vat', {
                url: "/accounting/vat",
                ncyBreadcrumb: {
                    parent: 'accounting',
                    label: 'VAT'
                },
                views: {
                    '@': {
                        controller: 'VATController',
                        templateUrl: "components/accounting/vat/vat.view.html"
                    }
                }
            })

        .state('vat.items', {
            url: "/items",
            ncyBreadcrumb: {
                parent: 'vat',
                label: 'Items'
            },
            views: {
                '@': {
                    controller: 'VATItemsController',
                    templateUrl: "components/accounting/vat/vat_items.view.html"
                }
            }
        })

        .state('vat.declarations', {
            url: "/declarations",
            ncyBreadcrumb: {
                parent: 'vat',
                label: 'Declarations'
            },
            views: {
                '@': {
                    controller: 'VATDeclarationsController',
                    templateUrl: "components/accounting/vat/declaration/list.view.html"
                }
            }
        })

        .state('vat.declarations.create', {
            url: "/create",
            ncyBreadcrumb: {
                parent: 'vat.declarations',
                label: 'Create'
            },
            views: {
                '@': {
                    controller: 'VATDeclarationsCreateController',
                    templateUrl: "components/accounting/vat/declaration/create.view.html"
                }
            }
        })

    }

    VATRoutes.$inject = ['$stateProvider'];

})();

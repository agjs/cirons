(function() {
  'use strict';
  module.exports = invoicesRouter;

  function invoicesRouter($stateProvider) {
    $stateProvider
      .state('invoices', {
        url: "/sales/invoices",

        ncyBreadcrumb: {
          label: 'Invoices',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/invoices/invoices.view.html',
            controller: 'invoicesController'

          },
          'invoicesList@invoices': {
            templateUrl: 'components/sales/invoices/invoices_list.view.html',
          }
        }
      })

    .state('invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'invoices',
        label: 'Write a Invoice'
      },
      views: {
        '': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',

        },
        'invoicesContent@invoices': {
          templateUrl: 'components/sales/invoices/invoices_create.view.html',
          controller: 'invoicesCRUDController'
        }
      }
    })

    .state('invoices.item', {
      url: "/:id",
      params: {
        invoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'invoices',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',

        },
        'invoicesContent@invoices': {
          templateUrl: 'components/sales/invoices/invoices_content.view.html',
          controller: 'invoicesSingleItemController'
        }
      }
    });

  }

  invoicesRouter.$inject = ['$stateProvider'];

})();

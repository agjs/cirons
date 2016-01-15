(function() {
  'use strict';
  module.exports = supplierInvoicesRouter;

  function supplierInvoicesRouter($stateProvider) {
    $stateProvider
      .state('supplier_invoices', {
        url: "/expenses/supplier_invoices",

        ncyBreadcrumb: {
          label: 'SupplierInvoices',
          parent: 'expenses',
        },
        views: {
          '': {
            templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_table.view.html',
            controller: 'supplierInvoicesController'
          },
          'supplierInvoicesList@supplier_invoices': {
            templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          }
        }
      })

    .state('supplier_invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'supplier_invoices',
        label: 'Write a Supplier Invoice'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices.view.html'
        },
        'supplierInvoicesList@supplier_invoices.create': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          controller: 'supplierInvoicesController'
        },
        'supplierInvoicesContent@supplier_invoices.create': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_create.view.html',
          controller: 'supplierInvoicesCRUDController'
        }
      }
    })

    .state('supplier_invoices.item', {
      url: "/:id",
      params: {
        supplierInvoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'supplier_invoices',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices.view.html'
        },
        'supplierInvoicesList@supplier_invoices.item': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          controller: 'supplierInvoicesController'
        },
        'supplierInvoicesContent@supplier_invoices.item': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_content.view.html',
          controller: 'supplierInvoicesSingleItemController'
        }
      }
    });

  }

  supplierInvoicesRouter.$inject = ['$stateProvider'];

})();

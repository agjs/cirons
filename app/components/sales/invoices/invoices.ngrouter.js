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
            templateUrl: 'components/sales/invoices/invoices_table.view.html',
            controller: 'invoicesController'
          }
        //   ,
        //   'invoicesList@invoices': {
        //     templateUrl: 'components/sales/invoices/invoices_list.view.html',
        //   }
        }
      })

    .state('invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'invoices',
        label: 'Create an Invoice'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices.create': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',
          controller: 'invoicesController'
        },
        'invoicesContent@invoices.create': {
          templateUrl: 'components/sales/invoices/invoices_create.view.html',
          controller: 'invoicesCreateController'
        }
      }
    })

    .state('invoices.item', {
      url: "/:id",
      abstract: true,
      params: {
        invoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'invoices',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices.item': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',
          controller: 'invoicesController'
        },
        'invoicesContent@invoices.item': {
          templateUrl: 'components/sales/invoices/invoices_content.view.html',
          controller: 'invoicesSingleItemController'
        }
      }
    })

    .state("invoices.item.general", {
        url: "/general",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'General'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/general.view.html'
            }
        }
    })

    .state("invoices.item.addresses", {
        url: "/addresses",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Addresses'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/addresses.view.html'
            }
        }
    })

    .state("invoices.item.profit", {
        url: "/profit",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Profit'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/profit.view.html'
            }
        }
    })

    .state("invoices.item.payments", {
        url: "/payments",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Payments'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/payments.view.html'
            }
        }
    })

    .state("invoices.item.accounting", {
        url: "/accounting",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Accounting'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/accounting.view.html'
            }
        }
    });

  }

  invoicesRouter.$inject = ['$stateProvider'];

})();

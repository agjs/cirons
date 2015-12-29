(function() {
  'use strict';
  module.exports = ordersRouter;

  function ordersRouter($stateProvider) {
    $stateProvider
      .state('orders', {
        url: "/sales/orders",

        ncyBreadcrumb: {
          label: 'Orders',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/orders/orders.view.html',
            controller: 'ordersController'

          },
          'ordersList@orders': {
            templateUrl: 'components/sales/orders/orders_list.view.html',
          }
        }
      })

    .state('orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'orders',
        label: 'Create an Order'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'ordersContent@orders': {
          templateUrl: 'components/sales/orders/orders_create.view.html',
          controller: 'ordersCreateController'
        }
      }
    })

    .state('orders.item', {
      url: "/:id",
      abstract: true,
      params: {
        order: undefined
      },
      ncyBreadcrumb: {
        parent: 'orders',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'ordersContent@orders': {
          templateUrl: 'components/sales/orders/orders_content.view.html',
          controller: 'ordersSingleItemController'
        }
      }
    })

    .state("orders.item.general", {
        url: "/general",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'General'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/general.view.html'
            }
        }
    })

    .state("orders.item.addresses", {
        url: "/addresses",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'Addresses'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/addresses.view.html'
            }
        }
    })

    .state("orders.item.profit", {
        url: "/profit",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'Profit'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/profit.view.html'
            }
        }
    });

  }

  ordersRouter.$inject = ['$stateProvider'];

})();

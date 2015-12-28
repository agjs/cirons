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
          'orderList@orders': {
            templateUrl: 'components/sales/orders/orders_list.view.html',
          }
        }
      })

    .state('orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'orders',
        label: 'Write a Order'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'orderList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'orderContent@orders': {
          templateUrl: 'components/sales/orders/orders_create.view.html',
          controller: 'ordersCRUDController'
        }
      }
    })

    .state('orders.item', {
      url: "/:id",
      params: {
        supplier: undefined
      },
      ncyBreadcrumb: {
        parent: 'orders',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'orderList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'orderContent@orders': {
          templateUrl: 'components/sales/orders/orders_content.view.html',
          controller: 'ordersSingleItemController'
        }
      }
    });

  }

  ordersRouter.$inject = ['$stateProvider'];

})();

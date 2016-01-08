(function() {
  'use strict';
  module.exports = purchaseOrdersRouter;

  function purchaseOrdersRouter($stateProvider) {
    $stateProvider
      .state('purchase_orders', {
        url: "/purchasing/purchase_orders",

        ncyBreadcrumb: {
          label: 'Purchase Orders',
          parent: 'purchasing',
        },
        views: {
          '': {
            templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html',
            controller: 'purchaseOrdersController'

          },
          'purchaseOrdersList@purchase_orders': {
            templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',
          }
        }
      })

    .state('purchase_orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'purchase_orders',
        label: 'Write a PO'
      },
      views: {
        '': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html'
        },
        'purchaseOrdersList@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',

        },
        'purchaseOrdersContent@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_create.view.html',
          controller: 'purchaseOrdersCRUDController'
        }
      }
    })

    .state('purchase_orders.item', {
      url: "/:id",
      params: {
        purchaseOrder: undefined
      },
      ncyBreadcrumb: {
        parent: 'purchase_orders',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html'
        },
        'purchaseOrdersList@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',

        },
        'purchaseOrdersContent@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_content.view.html',
          controller: 'purchaseOrdersSingleItemController'
        }
      }
    });

  }

  purchaseOrdersRouter.$inject = ['$stateProvider'];

})();

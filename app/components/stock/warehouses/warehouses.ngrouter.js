(function() {
  'use strict';
  module.exports = warehousesRouter;

  function warehousesRouter($stateProvider) {
    $stateProvider
      .state('warehouses', {
        url: "/stock/warehouses",

        ncyBreadcrumb: {
          label: 'Warehouses',
          parent: 'stock',
        },
        views: {
          '': {
            templateUrl: 'components/stock/warehouses/warehouses.view.html',
            controller: 'warehousesController'

          },
          'warehousesList@warehouses': {
            templateUrl: 'components/stock/warehouses/warehouses_list.view.html',
          }
        }
      })

    .state('warehouses.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'warehouses',
        label: 'Add a Warehouse'
      },
      views: {
        '': {
          templateUrl: 'components/stock/warehouses/warehouses.view.html'
        },
        'warehousesList@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_list.view.html',

        },
        'warehousesContent@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_create.view.html',
          controller: 'warehousesCRUDController'
        }
      }
    })

    .state('warehouses.item', {
      url: "/:id",
      params: {
        warehouse: undefined
      },
      ncyBreadcrumb: {
        parent: 'warehouses',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/stock/warehouses/warehouses.view.html'
        },
        'warehousesList@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_list.view.html',

        },
        'warehousesContent@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_content.view.html',
          controller: 'warehousesSingleItemController'
        }
      }
    });

  }

  warehousesRouter.$inject = ['$stateProvider'];

})();

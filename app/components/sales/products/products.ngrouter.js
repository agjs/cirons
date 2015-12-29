(function() {
  'use strict';
  module.exports = productsRouter;

  function productsRouter($stateProvider) {
    $stateProvider
      .state('products', {
        url: "/sales/products",

        ncyBreadcrumb: {
          label: 'Products',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/products/products.view.html',
            controller: 'productsController'

          },
          'productsList@products': {
            templateUrl: 'components/sales/products/products_list.view.html',
          }
        }
      })

    .state('products.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'products',
        label: 'Write a Product'
      },
      views: {
        '': {
          templateUrl: 'components/sales/products/products.view.html'
        },
        'productsList@products': {
          templateUrl: 'components/sales/products/products_list.view.html',

        },
        'productsContent@products': {
          templateUrl: 'components/sales/products/products_create.view.html',
          controller: 'productsCRUDController'
        }
      }
    })

    .state('products.item', {
      url: "/:id",
      params: {
        product: undefined
      },
      ncyBreadcrumb: {
        parent: 'products',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/products/products.view.html'
        },
        'productsList@products': {
          templateUrl: 'components/sales/products/products_list.view.html',

        },
        'productsContent@products': {
          templateUrl: 'components/sales/products/products_content.view.html',
          controller: 'productsSingleItemController'
        }
      }
    });

  }

  productsRouter.$inject = ['$stateProvider'];

})();

(function() {
  'use strict';
  module.exports = receiptsRouter;

  function receiptsRouter($stateProvider) {
    $stateProvider
      .state('receipts', {
        url: "/expenses/receipts",

        ncyBreadcrumb: {
          label: 'Receipts',
          parent: 'expenses',
        },
        views: {
          '': {
            templateUrl: 'components/expenses/receipts/receipts.view.html',
            controller: 'receiptsController'

          },
          'receiptsList@receipts': {
            templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          }
        }
      })

    .state('receipts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'receipts',
        label: 'Write a Receipt'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsController'
        },
        'receiptsContent@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_create.view.html',
          controller: 'receiptsCRUDController'
        }
      }
    })

    .state('receipts.item', {
      url: "/:id",
      params: {
        supplier: undefined
      },
      ncyBreadcrumb: {
        parent: 'receipts',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsController'
        },
        'receiptsContent@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_content.view.html',
          controller: 'receiptsSingleItemController'
        }
      }
    });

  }

  receiptsRouter.$inject = ['$stateProvider'];

})();

(function() {
  'use strict';
  module.exports = receiptsRouter;

  function receiptsRouter($stateProvider) {
    $stateProvider
    $stateProvider

      .state('receipts', {
      url: "/receipts/receipts",
      ncyBreadcrumb: {
        parent: 'receipts',
        label: 'Suppliers'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html',
          controller: 'receiptsController'

        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsListController'
        }


      }
    })

    .state('receipts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'receipts',
        label: 'Create new'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsListController'
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
          controller: 'receiptsListController'
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

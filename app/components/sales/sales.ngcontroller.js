(function() {
  'use strict';
  module.exports = salesController;

  function salesController($scope, $filter, contactsFactory, invoicesFactory, ordersFactory, productsFactory) {

    contactsFactory.countContacts().then(function(contacts) {
      $scope.contactsCount = contacts;
    });

    invoicesFactory.getUnpaidInvoicesCount().then(function(invoices) {
      $scope.invoicesCount = invoices;
    });

    // invoicesFactory.getUnpaidInvoices().then(function(invoices) {
    //   $scope.unpaid = invoices;
    // });

    invoicesFactory.getUnpaidInvoicesSum().then(function(data) {
      $scope.unpaid_sum = data;
      $scope.invoicesCardSecondary = $filter('currency')(data, "SEK ", 2);
    });


    ordersFactory.getPendingOrdersCount().then(function(orders) {
      $scope.ordersCount = orders;
    });

    ordersFactory.getPendingOrders().then(function(orders) {
      $scope.pending = orders;
      $scope.cardCounter = orders.length;
    });

    ordersFactory.getPendingOrdersSum().then(function(data) {
      $scope.pending_sum = data;
      $scope.ordersCardSecondary = $filter('currency')(data, "SEK ", 2);
    });

    productsFactory.countProducts().then(function(products) {
      $scope.productsCount = products;



    });

  }

  salesController.$inject = ['$scope', '$filter', 'contactsFactory', 'invoicesFactory', 'ordersFactory', 'productsFactory'];

})();

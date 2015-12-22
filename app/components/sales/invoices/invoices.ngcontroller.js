(function() {
  'use strict';
  module.exports = invoicesController;

  function invoicesController($scope, $rootScope, $auth, invoicesFactory, $state, $filter) {

    invoicesFactory.getInvoices().then(function(invoices) {
      $scope.invoices = invoices;
    });

    invoicesFactory.getUnpaidInvoices().then(function(invoices) {
      $scope.unpaid = invoices;
      $scope.cardCounter = invoices.length;
    });

    invoicesFactory.getUnpaidInvoicesSum().then(function(data) {
      $scope.unpaid_sum = data;
      $scope.cardSecondary = $filter('currency')(data, "SEK ", 2);
    });

  }

  invoicesController.$inject = ['$scope', '$rootScope', '$auth', 'invoicesFactory', '$state', '$filter'];

})();

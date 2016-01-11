(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, suppliersFactory, receiptsFactory, $state, supplierInvoicesFactory) {

    suppliersFactory.countSuppliers().then(function(suppliers) {
      $scope.suppliersCount = suppliers;
    });

    receiptsFactory.countReceipts().then(function(receipts) {
      $scope.receiptsCount = receipts;
    });

    supplierInvoicesFactory.getSupplierInvoices().then(function(si){
        $scope.supplierInvoicesCount = si.length;
    });

  }

  expensesController.$inject = ['$scope', 'suppliersFactory', 'receiptsFactory', '$state', 'supplierInvoicesFactory'];

})();

(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, suppliersFactory, receiptsFactory, $state) {

    suppliersFactory.countSuppliers().then(function(suppliers) {
      $scope.suppliersCount = suppliers;
    });

    receiptsFactory.countReceipts().then(function(receipts) {
      $scope.receiptsCount = receipts;
    });



  }

  expensesController.$inject = ['$scope', 'suppliersFactory', 'receiptsFactory', '$state'];

})();

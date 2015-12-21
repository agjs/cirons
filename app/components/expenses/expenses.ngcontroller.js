(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, suppliersFactory, receiptsFactory, $state) {

    // suppliersFactory.getSuppliers().then(function(expenses) {
    //
    //   $scope.cardType = 'Suppliers';
    //   $scope.cardDescription = 'Manage your invoices';
    //   $scope.cardColor = 'red';
    //   $scope.cardIcon = 'building';
    //   $scope.cardCounter = expenses.length;
    //   $scope.cardState = 'suppliers';
    //
    // });



  }

  expensesController.$inject = ['$scope', 'suppliersFactory', 'receiptsFactory', '$state'];

})();

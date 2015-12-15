(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, expensesFactory, $state) {

    expensesFactory.getSuppliers().then(function(expenses) {

      $scope.cardType = 'Suppliers';
      $scope.cardDescription = 'Manage your invoices';
      $scope.cardColor = 'red';
      $scope.cardIcon = 'building';
      $scope.cardCounter = expenses.length;
      $scope.cardState = 'suppliers';

    });

  }

  expensesController.$inject = ['$scope', 'expensesFactory', '$state'];

})();

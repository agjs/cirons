(function() {
  'use strict';
  module.exports = suppliersController;

  function suppliersController($scope, $rootScope, $auth, suppliersFactory, $state) {

    suppliersFactory.getSuppliers().then(function(expenses) {
      $scope.expenses = expenses;
      $scope.cardCounter = expenses.length;
    });

  }

  suppliersController.$inject = ['$scope', '$rootScope', '$auth', 'suppliersFactory', '$state'];

})();

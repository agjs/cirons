(function() {
  'use strict';
  module.exports = suppliersController;

  function suppliersController($scope, $rootScope, $auth, expensesFactory, $state) {

    expensesFactory.getSuppliers().then(function(expenses) {
      $scope.expenses = expenses;
    });

  }

  suppliersController.$inject = ['$scope', '$rootScope', '$auth', 'expensesFactory', '$state'];

})();

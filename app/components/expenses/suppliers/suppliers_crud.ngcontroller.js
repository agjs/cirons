(function() {
  'use strict';
  module.exports = suppliersCRUDController;

  function suppliersCRUDController($scope, $stateParams, expensesFactory, lodash) {

    $scope.addSupplier = function() {
      expensesFactory.addSupplier($scope.company_name).then(function(added) {
        $scope.expenses.push(added);
      });
    };

    $scope.removeSupplier = function() {
      expensesFactory.removeSupplier($stateParams.id);
    };

    $scope.editSupplier = function(companyName) {
      expensesFactory.editSupplier($stateParams.id, companyName).then(function(edited) {

        var findItem = lodash.find($scope.expenses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem.company_name = edited.company_name;
        }

      });
    };

  }

  suppliersCRUDController.$inject = ['$scope', '$stateParams', 'expensesFactory', 'lodash'];

})();

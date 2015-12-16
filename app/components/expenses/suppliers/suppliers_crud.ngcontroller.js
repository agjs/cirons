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

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  }

  suppliersCRUDController.$inject = ['$scope', '$stateParams', 'expensesFactory', 'lodash'];

})();

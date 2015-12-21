(function() {
  'use strict';
  module.exports = suppliersCRUDController;

  function suppliersCRUDController($scope, $stateParams, suppliersFactory, lodash) {

    $scope.addSupplier = function() {
      suppliersFactory.addSupplier($scope.company_name).then(function(added) {
        $scope.expenses.push(added);
      });
    };

    $scope.removeSupplier = function() {
      suppliersFactory.removeSupplier($stateParams.id);
    };

    $scope.editSupplier = function(companyName) {
      suppliersFactory.editSupplier($stateParams.id, companyName).then(function(edited) {

        var findItem = lodash.find($scope.expenses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem.company_name = edited.company_name;
        }

      });
    };

  }

  suppliersCRUDController.$inject = ['$scope', '$stateParams', 'suppliersFactory', 'lodash'];

})();

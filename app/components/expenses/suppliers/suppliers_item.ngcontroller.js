(function() {
  'use strict';
  module.exports = suppliersSingleItemController;

  function suppliersSingleItemController($scope, $stateParams, suppliersFactory, lodash) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.supplier) {
      suppliersFactory.getSupplier($scope.id).then(function(item) {
        $scope.supplier = item;
      });
    }

    $scope.editName = function(name){
        suppliersFactory.editSupplier($scope.id, {
            company_name: name
        }).then(function(edited){
            var findItem = lodash.find($scope.expenses, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.company_name = edited.company_name;
            }
        });
    };

    $scope.save = function(){
        suppliersFactory.editSupplier($scope.id, $scope.supplier).then(function(edited){
            var findItem = lodash.find($scope.expenses, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.company_name = edited.company_name;
            }
        });
    };

  }

  suppliersSingleItemController.$inject = ['$scope', '$stateParams', 'suppliersFactory', 'lodash'];

})();

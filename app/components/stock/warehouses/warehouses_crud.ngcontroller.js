(function() {
  'use strict';
  module.exports = warehousesCRUDController;

  function warehousesCRUDController($scope, $stateParams, warehousesFactory, lodash, $state) {

    $scope.warehouse = {
        name: '',
        address: {}
    };

    $scope.addWarehouse = function() {
      warehousesFactory.addWarehouse($scope.warehouse).then(function(added) {
        $scope.warehouses.push(added);
        $state.go('warehouses.item', {id: added.id, warehouse: added});
      });
    };

    $scope.removeWarehouse = function() {
      warehousesFactory.removeWarehouse($stateParams.id);
    };

    $scope.editWarehouse = function(data) {
      warehousesFactory.editWarehouse($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.warehouses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  warehousesCRUDController.$inject = ['$scope', '$stateParams', 'warehousesFactory', 'lodash', '$state'];

})();

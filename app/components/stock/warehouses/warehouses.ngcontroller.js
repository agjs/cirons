(function() {
  'use strict';
  module.exports = warehousesController;

  function warehousesController($scope, $rootScope, $auth, warehousesFactory, $state) {

    warehousesFactory.getWarehouses().then(function(warehouses) {
      $scope.warehouses = warehouses;
    });



  }

  warehousesController.$inject = ['$scope', '$rootScope', '$auth', 'warehousesFactory', '$state'];

})();

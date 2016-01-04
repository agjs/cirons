(function() {
  'use strict';
  module.exports = stockController;

  function stockController($scope, productsFactory, warehousesFactory) {

      productsFactory.countProducts().then(function(products) {
        $scope.productsCount = products;
      });

      warehousesFactory.countWarehouses().then(function(count) {
        $scope.warehousesCount = count;
      });

  }

  stockController.$inject = ['$scope', 'productsFactory', 'warehousesFactory'];

})();

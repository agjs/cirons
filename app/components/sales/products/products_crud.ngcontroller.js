(function() {
  'use strict';
  module.exports = productsCRUDController;

  function productsCRUDController($scope, $stateParams, productsFactory, lodash) {

    $scope.addProduct = function() {
      productsFactory.addProduct($scope.product).then(function(added) {
        $scope.products.push(added);
      });
    };

    $scope.removeProduct = function() {
      productsFactory.removeProduct($stateParams.id);
    };

    $scope.editProduct = function(data) {
      productsFactory.editProduct($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.products, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  productsCRUDController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash'];

})();

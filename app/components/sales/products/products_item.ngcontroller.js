(function() {
  'use strict';
  module.exports = productsSingleItemController;

  function productsSingleItemController($scope, $stateParams, productsFactory) {
    $scope.product = $stateParams.product;
    $scope.id = $stateParams.id;


    if (!$scope.product) {
      productsFactory.getProduct($scope.id).then(function(item) {
        $scope.product = item;
      });
    }

  }

  productsSingleItemController.$inject = ['$scope', '$stateParams', 'productsFactory'];

})();

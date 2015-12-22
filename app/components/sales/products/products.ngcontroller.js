(function() {
  'use strict';
  module.exports = productsController;

  function productsController($scope, $rootScope, $auth, productsFactory, $state) {

    productsFactory.getProducts().then(function(products) {
      $scope.products = products;
      $scope.cardCounter = products.length;
    });

  }

  productsController.$inject = ['$scope', '$rootScope', '$auth', 'productsFactory', '$state'];

})();
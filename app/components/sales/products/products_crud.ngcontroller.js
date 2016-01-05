(function() {
  'use strict';
  module.exports = productsCRUDController;

  function productsCRUDController($scope, $stateParams, productsFactory, lodash, $state, settingsFactory, suppliersFactory) {

    $scope.addProduct = function() {
      $scope.product.supplier_id = $scope.product.supplier.id;
      productsFactory.addProduct($scope.product).then(function(added) {
        $scope.products.unshift(added);
        $state.go('products.item', {id: added.id, product: added});
      });
    };

    $scope.product = {
        name: "",
        supplier: null
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

  }

  productsCRUDController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash', '$state', 'settingsFactory', 'suppliersFactory'];

})();

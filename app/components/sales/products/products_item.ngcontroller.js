(function() {
  'use strict';
  module.exports = productsSingleItemController;

  function productsSingleItemController($scope, $stateParams, productsFactory, lodash, suppliersFactory, settingsFactory) {
    $scope.product = $stateParams.product;
    $scope.id = $stateParams.id;


    if (!$scope.product) {
      productsFactory.getProduct($scope.id).then(function(item) {
        $scope.product = item;
        $scope.checkSupplier();
        $scope.getSuppliers();
      });
    }

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.saveProduct = function(){
        console.log("saving...");

        productsFactory.editProduct($scope.id, $scope.product).then(function(edited){
            console.log("saved");
        });
    };

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            productsFactory.editProduct($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.product.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;
            });
        }
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.newSupplier = null;

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.product){
            return;
        }
        if($scope.product.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();

    $scope.editName = function(name){
        productsFactory.editProduct($scope.id, {
            name: name
        }).then(function(product){
            var findItem = lodash.find($scope.products, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.name = product.name;
            }
        });
    };

  }

  productsSingleItemController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash', 'suppliersFactory', 'settingsFactory'];

})();

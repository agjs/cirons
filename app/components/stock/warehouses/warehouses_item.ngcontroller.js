(function() {
  'use strict';
  module.exports = warehousesSingleItemController;

  function warehousesSingleItemController($scope, $stateParams, warehousesFactory, lodash, stocksFactory, productsFactory) {
    $scope.warehouse = $stateParams.warehouse;
    $scope.id = $stateParams.id;


    if (!$scope.warehouse) {
      warehousesFactory.getWarehouse($scope.id).then(function(item) {
        $scope.warehouse = item;
        $scope.getStock();
        $scope.getProducts();
      });
    }

    $scope.products = [];
    $scope.getProducts = function(){
        productsFactory.getProducts().then(function(products){
            $scope.products = products;
        });
    };
    $scope.getProducts();

    $scope.addStock = false;
    $scope.newStockData = {
        product: null,
        quantity: 0,
        exp_date: new Date()
    };
    $scope.newStock = $scope.newStockData;

    $scope.stocks = [];

    $scope.addNewStock = function(){
        var data = $scope.newStock;
        if(data.product && data.product.id){
            data.product_id = data.product.id;
            stocksFactory.addToWarehouse($scope.id, data).then(function(stock){
                $scope.stocks.push(stock);
                $scope.newStock = $scope.newStockData;
            });
        } else {
            alert('You need to select a product');
        }
    };

    $scope.getStock = function(){
        stocksFactory.getStockFromWarehouse($scope.id).then(function(stock){
            $scope.stocks = stock;
        });
    };
    $scope.getStock();

    $scope.editStock = function(stock){
        stocksFactory.updateStock(stock.id, stock).then(function(stock){
            console.log("updated stock");
        });
    };

    $scope.editName = function(name){
        console.log("new name: " , name);
        warehousesFactory.editWarehouse($stateParams.id, {
            name: name
        }).then(function(edited) {

          var findItem = lodash.find($scope.warehouses, function(arg) {
            return arg.id === $stateParams.id;
          });

          if (findItem) {
            findItem.name = edited.name;
          }

        });
    };

  }

  warehousesSingleItemController.$inject = ['$scope', '$stateParams', 'warehousesFactory', 'lodash', 'stocksFactory', 'productsFactory'];

})();

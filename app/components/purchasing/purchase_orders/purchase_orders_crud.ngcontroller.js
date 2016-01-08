(function() {
  'use strict';
  module.exports = purchaseOrdersCRUDController;

  function purchaseOrdersCRUDController($scope, $stateParams, purchaseOrdersFactory, lodash, suppliersFactory, settingsFactory, orderRowsFactory, productsFactory, $state) {

    $scope.addPurchaseOrder = function() {
        if(!$scope.purchaseOrder.supplier){
            alert("You need to select a supplier!");
            return;
        }
      $scope.purchaseOrder.supplier_id = $scope.purchaseOrder.supplier.id;
      purchaseOrdersFactory.addPurchaseOrder($scope.purchaseOrder).then(function(added) {
        $scope.purchaseOrders.unshift(added);
        $state.go('purchase_orders.item', {id: added.id, purchaseOrder: added});
      });
    };
    $scope.purchaseOrder = {
        date: new Date(),
        supplier: null,
        delivery_address: {}
    };
    $scope.purchaseOrder.order_rows = [];

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        price: 0,
        product: null,
        object_type: "PurchaseOrder"
    };

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.purchaseOrder.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.settings.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "PurchaseOrder"
            };
        })
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.getTotals = function(){
        if(!$scope.purchaseOrder){
            return;
        }
        console.log("calc totals");
        $scope.subTotal = 0;
        $scope.grandTotal = 0;
        $scope.totalVAT = 0;

        for(var i = 0; i < $scope.purchaseOrder.order_rows.length; i++){
            var row = $scope.purchaseOrder.order_rows[i];
            console.log(row);
            $scope.subTotal += row.q * row.price;
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.getTotals();

    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

  }

  purchaseOrdersCRUDController.$inject = ['$scope', '$stateParams', 'purchaseOrdersFactory', 'lodash', 'suppliersFactory', 'settingsFactory', 'orderRowsFactory', 'productsFactory', '$state'];

})();

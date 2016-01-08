(function() {
  'use strict';
  module.exports = purchaseOrdersSingleItemController;

  function purchaseOrdersSingleItemController($scope, $stateParams, purchaseOrdersFactory, suppliersFactory, settingsFactory, lodash, orderRowsFactory, productsFactory) {
    $scope.purchaseOrder = $stateParams.purchaseOrder;
    $scope.id = $stateParams.id;


    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.purchaseOrder){
            return;
        }
        if($scope.purchaseOrder.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();

    if (!$scope.purchaseOrder) {
      purchaseOrdersFactory.getPurchaseOrder($scope.id).then(function(item) {
        $scope.purchaseOrder = item;
        $scope.checkSupplier();
        $scope.getSuppliers();
        $scope.getTotals();
      });
    }

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

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            purchaseOrdersFactory.editPurchaseOrder($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.purchaseOrder.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;

                var findItem = lodash.find($scope.contacts, function(arg) {
                  return arg.id === $stateParams.id;
                });
                if (findItem) {
                  findItem = edited;
                }
            });
        }
    };

    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

    $scope.changeStep = function(step){
        purchaseOrdersFactory.editPurchaseOrder($scope.id, {
            step: step
        }).then(function(data){
            $scope.purchaseOrder.step = data.step;
            $scope.purchaseOrder.steps = data.steps;
        });
    };

    $scope.changeAddress = function(){
        purchaseOrdersFactory.editPurchaseOrder($scope.id, {
            delivery_address: $scope.purchaseOrder.address
        }).then(function(data){

        });
    };

    $scope.downloadRFQ = function(){
        console.log("download as pdf");
        $scope.changeStep('rfq');
        window.open('/purchase_orders/2/pdf/rfq', 'rfqpdf');
    };
    $scope.downloadPO = function(){
        console.log("download as pdf");
        window.open('/purchase_orders/2/pdf/po', 'popdf');
    };

    $scope.newSupplier = null;



  }

  purchaseOrdersSingleItemController.$inject = ['$scope', '$stateParams', 'purchaseOrdersFactory', 'suppliersFactory', 'settingsFactory', 'lodash', 'orderRowsFactory', 'productsFactory'];

})();

(function() {
  'use strict';
  module.exports = receiptsSingleItemController;

  function receiptsSingleItemController($scope, $stateParams, receiptsFactory, suppliersFactory, lodash, settingsFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;

    var payment = ["Cash", "CC Company", "CC Private"];
    $scope.paymentMethods = payment;

    if (!$scope.receipt) {
      receiptsFactory.getReceipt($scope.id).then(function(item) {
        $scope.receipt = item;
        $scope.formatDates();
        $scope.checkSupplier();
      });
    }

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.save = function(){
        if($scope.receipt && $scope.receipt.supplier){
            $scope.saving = $scope.receipt;
            $scope.saving.supplier_id = $scope.saving.supplier.id;
            delete $scope.saving.supplier;

            receiptsFactory.editReceipt($scope.id, $scope.saving).then(function(edited){
                $scope.receipt = edited;
            });
        }
    };

    $scope.paid_date = null;

    $scope.formatDates = function(){
        $scope.paid_date = new Date();
        if($scope.receipt){
            console.log("format dates");
            $scope.receipt.date = new Date($scope.receipt.date);
        }
    };
    $scope.formatDates();

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            receiptsFactory.editReceipt($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.receipt.supplier = $scope.newSupplier;
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

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.receipt){
            $scope.changeSupplier = true;
            return;
        }
        if($scope.receipt.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

  }

  receiptsSingleItemController.$inject = ['$scope', '$stateParams', 'receiptsFactory', 'suppliersFactory', 'lodash', 'settingsFactory'];

})();

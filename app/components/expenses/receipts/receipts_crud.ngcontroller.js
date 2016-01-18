(function() {
  'use strict';
  module.exports = receiptsCRUDController;

  function receiptsCRUDController($scope, $stateParams, receiptsFactory, lodash, suppliersFactory, $state, settingsFactory) {

    $scope.receipt = {
        supplier: null,
        date: new Date(),
        attachments: []
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.receipt){
            return;
        }
        if($scope.receipt.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.addReceipt = function() {
      var newReceipt = $scope.receipt;
      newReceipt.supplier_id = newReceipt.supplier.id;
      delete newReceipt.supplier;

      receiptsFactory.addReceipt(newReceipt).then(function(added) {
        //$scope.receipts.unshift(added);
        $state.go('receipts.item', {id: added.id, receipt: added});
      });
    };



  }

  receiptsCRUDController.$inject = ['$scope', '$stateParams', 'receiptsFactory', 'lodash', 'suppliersFactory', '$state', 'settingsFactory'];

})();

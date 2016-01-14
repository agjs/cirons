(function() {
  'use strict';
  module.exports = supplierInvoicesCRUDController;

  function supplierInvoicesCRUDController($scope, $stateParams, supplierInvoicesFactory, lodash, suppliersFactory, $state, settingsFactory) {

    $scope.supplierInvoice = {
        supplier: null,
        date: new Date(),
        duedate: new Date(),
        paid: "0000-00-00",
        attachments: []
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.supplierInvoice){
            return;
        }
        if($scope.supplierInvoice.supplier){
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

    $scope.addSupplierInvoice = function() {
      var newInvoice = $scope.supplierInvoice;
      newInvoice.supplier_id = newInvoice.supplier.id;
      delete newInvoice.supplier;

      supplierInvoicesFactory.addSupplierInvoice(newInvoice).then(function(added) {
        $scope.supplierInvoices.unshift(added);
        $state.go('supplier_invoices.item', {id: added.id, supplierInvoice: added});
      });
    };

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.supplierInvoice.supplier.id){
            supplierInvoicesFactory.editSupplierInvoice($scope.id, {
                supplier_id: $scope.supplierInvoice.supplier.id
            }).then(function(edited){
                $scope.changeSupplier = false;
            });
        }
    };



  }

  supplierInvoicesCRUDController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory', 'lodash', 'suppliersFactory', '$state', 'settingsFactory'];

})();

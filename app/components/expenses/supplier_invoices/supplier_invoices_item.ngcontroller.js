(function() {
  'use strict';
  module.exports = supplierInvoicesSingleItemController;

  function supplierInvoicesSingleItemController($scope, $stateParams, supplierInvoicesFactory, suppliersFactory, lodash, settingsFactory) {
    $scope.supplierInvoice = $stateParams.supplierInvoice;
    $scope.id = $stateParams.id;


    if (!$scope.supplierInvoice) {
      supplierInvoicesFactory.getSupplierInvoice($scope.id).then(function(item) {
        $scope.supplierInvoice = item;
        $scope.checkSupplier();
        $scope.formatDates();
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
        if($scope.supplierInvoice && $scope.supplierInvoice.supplier){
            $scope.saving = $scope.supplierInvoice;
            $scope.saving.supplier_id = $scope.saving.supplier.id;
            delete $scope.saving.supplier;

            supplierInvoicesFactory.editSupplierInvoice($scope.id, $scope.saving).then(function(edited){
                $scope.supplierInvoice = edited;
            });
        }
    };

    $scope.paid_date = null;

    $scope.formatDates = function(){
        $scope.paid_date = new Date();
        if($scope.supplierInvoice){
            console.log("format dates");
            $scope.supplierInvoice.date = new Date($scope.supplierInvoice.date);
            $scope.supplierInvoice.duedate = new Date($scope.supplierInvoice.duedate);

            if($scope.supplierInvoice.paid != "0000-00-00"){
                $scope.paid_date = new Date($scope.supplierInvoice.paid);
            }
            console.log($scope.supplierInvoice.paid);
        }
        $scope.paid_date = ($scope.paid_date.getFullYear() + '-' + ('0' + ($scope.paid_date.getMonth() + 1)).slice(-2) + '-' + ('0' + ($scope.paid_date.getDate())).slice(-2));
    };
    $scope.formatDates();

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            supplierInvoicesFactory.editSupplierInvoice($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.supplierInvoice.supplier = $scope.newSupplier;
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
        if(!$scope.supplierInvoice){
            return;
        }
        if($scope.supplierInvoice.supplier){
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

  supplierInvoicesSingleItemController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory', 'suppliersFactory', 'lodash', 'settingsFactory'];

})();

(function() {
    'use strict';

    module.exports = uploadController;

    function uploadController($scope, $rootScope, receiptsFactory, supplierInvoicesFactory, $state, suppliersFactory, $timeout, $http){

        $scope.uploadType = "";
        $scope.selectedFile = "";
        $scope.saved = false;

        var payment = ["Cash", "CC Company", "CC Private"];
        $scope.paymentMethods = payment;

        $scope.suppliers = [];
        $scope.supplier = null;
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });

        $scope.item = {
            sum: 0,
            attachments: [],
            vat_amount: 0,
            date: new Date(),
            duedate: new Date(),
            currency: $rootScope.currency,
            paid: "0000-00-00"
        };

        $scope.isSI = function(){
            return $scope.uploadType == "si";
        };

        $scope.selected = function(type){
            if(type == "receipt" || type == "si"){

            } else {
                return;
            }

            $scope.uploadType = type;
            $("#touch-upload-input").click();
            // $scope.selectedFile = true;

        };

        $scope.fileSelected = function(){
            $timeout(function(){
                $scope.selectedFile = true;

                var object_type = "Receipt";
                if($scope.isSI()){
                    object_type = "SupplierInvoice";
                }

                var formData = new FormData();
                formData.append("file", document.getElementById("touch-upload-input").files[0]);
                formData.append("object_type", object_type);
                formData.append("object_id", 0);

                $http({
                    url: "http://janalex.beta.cirons.com/api/v1/attachments",
                    data: formData,
                    headers: {'Content-Type': undefined},
                    method: "POST"
                }).then(function(attachment){
                    console.log(attachment);
                    $scope.item.attachments.push(attachment.data);
                });

            },0);
            console.log("selected file");
        };

        $scope.save = function(){

            if(!$scope.supplier){
                alert("You need to select a supplier");
                return;
            }

            $scope.item.supplier_id = $scope.supplier.id;

            if(!$scope.isSI()){
                delete $scope.item.duedate;
                delete $scope.item.paid;
                $scope.item.amount = $scope.item.sum;
                delete $scope.item.sum;

                receiptsFactory.addReceipt($scope.item).then(function(item){
                    $scope.saved = true;
                    $timeout(function(){
                        $state.go("touch");
                    }, 2000);
                });

            } else {

                supplierInvoicesFactory.addSupplierInvoice($scope.item).then(function(item){
                    $scope.saved = true;
                    $timeout(function(){
                        $state.go("touch");
                    }, 2000);
                });

            }



        };

    }

    uploadController.$inject = ["$scope", "$rootScope", "receiptsFactory", "supplierInvoicesFactory", "$state", "suppliersFactory", "$timeout", "$http"];

}());

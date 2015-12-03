(function(){
"use strict";

angular.module('CIRONS-MAIN-APP').controller('suppliersSingleItemController', function($scope,$stateParams, expensesFactory){

    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if(!$scope.supplier) {
        expensesFactory.getSupplier($scope.id).then(function(item){
            $scope.supplier = item.data;
        });
    }


});

})();


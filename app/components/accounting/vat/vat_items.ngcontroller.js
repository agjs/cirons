(function() {
  'use strict';
  module.exports = VATItemsController;

  function VATItemsController($scope, $stateParams, VATFactory, $filter) {

      $scope.items = [];
      VATFactory.getItems().then(function(items){
          for(var i = 0; i < items.length; i++){
              items[i].date = new Date(items[i].date);
              if(i == (items.length - 1)){
                  $scope.dateStart = items[i].date;
              }
          }
          $scope.items = items;
          $scope.countSums();
      });

      $scope.dateStart = null;
      $scope.dateEnd = new Date();

      $scope.sums = {
          payable: 0,
          payable_ids: {},
          receivable: 0
      };
      $scope.countSums = function(){
          console.log("Count sums");
          $scope.sums = {
              payable: 0,
              payable_ids: {},
              receivable: 0
          };
          for(var i = 0; i < $scope.filtered().length; i++){
              var item = $scope.filtered()[i];
              if(item.object_type == "Invoice"){
                  if(!$scope.sums.payable_ids[item.vat_id]){
                      $scope.sums.payable_ids[item.vat_id] = {};
                      $scope.sums.payable_ids[item.vat_id].sum = 0;
                      $scope.sums.payable_ids[item.vat_id].percent = item.vat_rule.percent;
                  }
                  $scope.sums.payable_ids[item.vat_id].sum += parseFloat(item.payable);
                  $scope.sums.payable += parseFloat(item.payable);
              }
              if(item.object_type == "SupplierInvoice"){
                  $scope.sums.receivable += parseFloat(item.receivable);
              }
              if(item.object_type == "Receipt"){
                  $scope.sums.receivable += parseFloat(item.receivable);
              }
          }
          console.log($scope.sums);
      };

      $scope.filtered = function(){
          var items = $scope.items;

          items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);

          return items;
      };

  }

  VATItemsController.$inject = ['$scope', '$stateParams', 'VATFactory', '$filter'];

})();

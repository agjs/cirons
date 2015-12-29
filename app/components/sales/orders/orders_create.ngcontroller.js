(function() {
  'use strict';
  module.exports = ordersCreateController;

  function ordersCreateController($scope, $stateParams, ordersFactory, contactsFactory, orderRowsFactory, productsFactory, settingsFactory, lodash, $state) {

      $scope.contacts = [];
      $scope.products = [];
      productsFactory.getProducts().then(function(products){
          $scope.products = products;
      });

      $scope.settings = settingsFactory.getSettings();
      if(!$scope.settings.length){
          settingsFactory.initSettings().then(function(data){
              $scope.settings = data;
              $scope.order.currency = $scope.settings.options.default_currency;
              console.log("default_currency: ", $scope.settings.options.default_currency);
              $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
          });
      } else {
          $scope.order.currency = $scope.settings.options.default_currency;
      }

      $scope.contact = null;
      $scope.shipping_address = {};
      $scope.contactSelected = false;
      $scope.addressEdit = false;
      $scope.order = {
          order_rows: [],
          currency: null,
          price_list_id: 0,
          contact_id: 0,
          shipping_address: {}
      };

      $scope.newrow = {
          ordered: 0,
          q: 0,
          q_type: "0",
          vat_id: ($scope.settings.length ? $scope.settings.vat_rules[0].id : 0),
          price: 0,
          product: null,
          object_type: "Order"
      };

      $scope.saveOrder = function(){

          if($scope.contact){
              $scope.order.contact_id = $scope.contact.id;
          }

          if($scope.shipping_address){
              $scope.order.shipping_address = $scope.shipping_address;
              delete $scope.order.shipping_address.id;
          }

          ordersFactory.addOrder($scope.order).then(function(data){
              console.log("order saved");
              console.log(data);
              $scope.orders.unshift(data);
              $state.go("orders.item.general", {id: data.id, order: data});
          });

      };

      $scope.addOrderRow = function(){
          var row = $scope.newrow;

          row.product_id = row.product.id;

          $scope.order.order_rows.push(row);
          $scope.getTotals();

          $scope.newrow = {
              ordered: 0,
              q: 0,
              q_type: "0",
              vat_id: $scope.settings.vat_rules[0].id,
              price: 0,
              product: null,
              object_type: "Order"
          };
          return true;

          orderRowsFactory.addOrderRow(row).then(function(orderrow){
              console.log(orderrow);
              $scope.order.order_rows.push(orderrow);
              $scope.getTotals();

              $scope.newrow = {
                  ordered: 0,
                  q: 0,
                  q_type: "0",
                  vat_id: $scope.vat_rules[0].id.toString(),
                  price: 0,
                  product: null,
                  object_type: "Order"
              };
          })
      };

      $scope.subTotal = 0;
      $scope.grandTotal = 0;
      $scope.totalVAT = 0;
      $scope.getTotals = function(){
          if(!$scope.order){
              return;
          }
          console.log("calc totals");
          $scope.subTotal = 0;
          $scope.grandTotal = 0;
          $scope.totalVAT = 0;

          for(var i = 0; i < $scope.order.order_rows.length; i++){
              var row = $scope.order.order_rows[i];
              console.log(row);
              $scope.subTotal += row.q * row.price;
              $scope.totalVAT += row.q * ( (row.vat / 100) + 1 );
          }
          $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
          console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
      };
      $scope.getTotals();

      $scope.updateRow = function(row){
          orderRowsFactory.editOrderRow(row.id, row).then(function(row){
              console.log("row updated");
          });
          $scope.getTotals();
      };

      contactsFactory.getContacts().then(function(contacts){
          $scope.contacts = contacts;
      });

      $scope.contactOnSelect = function($item, $model, $label){
          console.log($item, $model, $label);
          $scope.contactSelected = true;
          $scope.shipping_address = $item.address;
      };

  }

  ordersCreateController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', 'settingsFactory', 'lodash', '$state'];

})();

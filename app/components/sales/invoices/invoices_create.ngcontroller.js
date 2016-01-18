(function() {
  'use strict';
  module.exports = invoicesCreateController;

  function invoicesCreateController($scope, $stateParams, invoicesFactory, contactsFactory, orderRowsFactory, productsFactory, settingsFactory, lodash, $state) {

      $scope.contacts = [];
      $scope.products = [];
      productsFactory.getProducts().then(function(products){
          $scope.products = products;
      });

      contactsFactory.getContacts().then(function(contacts){
          $scope.contacts = contacts;
      });

      $scope.invoice = {
          order_rows: [],
          currency: null,
          price_list_id: 0,
          contact_id: 0,
          shipping_address: {},
          billing_address: {},
          vat_no: "",
          date: new Date(),
          shipping_cost: 0,
          invoice_fee: 0,
          due_date: new Date(),
          duedays: 14
      };

      $scope.settings = settingsFactory.getSettings();
      if(!$scope.settings.length){
          settingsFactory.initSettings().then(function(data){
              $scope.settings = data;
              $scope.invoice.currency = $scope.settings.options.default_currency;
              console.log("default_currency: ", $scope.settings.options.default_currency);
              $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
          });
      } else {
          $scope.invoice.currency = $scope.settings.options.default_currency;
      }

      $scope.contact = null;
      $scope.shipping_address = {};
      $scope.contactSelected = false;
      $scope.shippingAddressEdit = false;
      $scope.billingAddressEdit = false;

      $scope.newrow = {
          ordered: 0,
          q: 0,
          q_type: "0",
          vat_id: ($scope.settings.length ? $scope.settings.vat_rules[0].id : 0),
          price: 0,
          product: null,
          object_type: "Invoice"
      };

      $scope.addOrderRow = function(){
          var row = $scope.newrow;

          row.product_id = row.product.id;

          $scope.invoice.order_rows.push(row);
          $scope.getTotals();

          $scope.newrow = {
              ordered: 0,
              q: 0,
              q_type: "0",
              vat_id: $scope.settings.vat_rules[0].id,
              price: 0,
              product: null,
              object_type: "Invoice"
          };
          return true;

          orderRowsFactory.addOrderRow(row).then(function(orderrow){
              console.log(orderrow);
              $scope.invoice.order_rows.push(orderrow);
              $scope.getTotals();

              $scope.newrow = {
                  ordered: 0,
                  q: 0,
                  q_type: "0",
                  vat_id: $scope.vat_rules[0].id.toString(),
                  price: 0,
                  product: null,
                  object_type: "Invoice"
              };
          })
      };

      $scope.saveInvoice = function(){

          if($scope.contact){
              $scope.invoice.contact_id = $scope.contact.id;
          }

          if($scope.shipping_address){
              $scope.invoice.shipping_address = $scope.shipping_address;
              $scope.invoice.billing_address = $scope.shipping_address;
              delete $scope.invoice.shipping_address.id;
              delete $scope.invoice.billing_address.id;
          }

          invoicesFactory.addInvoice($scope.invoice).then(function(data){
              console.log("invoice saved");
              console.log(data);
              //$scope.invoices.unshift(data);
              $state.go("invoices.item.general", {id: data.id, invoice: data});
          });

      };

      $scope.subTotal = 0;
      $scope.grandTotal = 0;
      $scope.totalVAT = 0;
      $scope.getTotals = function(){
          if(!$scope.invoice){
              return;
          }
          console.log("calc totals");
          $scope.subTotal = 0;
          $scope.grandTotal = 0;
          $scope.totalVAT = 0;

          for(var i = 0; i < $scope.invoice.order_rows.length; i++){
              var row = $scope.invoice.order_rows[i];
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

      $scope.contactOnSelect = function($item, $model, $label){
          console.log($item, $model, $label);
          var billing = $item.address;
          $scope.contactSelected = true;
          $scope.shipping_address = billing;
          $scope.billing_address = $item.address;
          $scope.invoice.vat_no = $item.vat_no;
      };

  }

  invoicesCreateController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', 'settingsFactory', 'lodash', '$state'];

})();

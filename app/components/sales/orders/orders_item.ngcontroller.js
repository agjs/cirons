(function() {
  'use strict';
  module.exports = ordersSingleItemController;

  function ordersSingleItemController($scope, $stateParams, ordersFactory, contactsFactory, orderRowsFactory, productsFactory, $state, lodash, $watch) {
    $scope.order = $stateParams.order;
    $scope.id = $stateParams.id;

    $scope.editContact = false;
    $scope.newContact = null;

    if (!$scope.order) {
      ordersFactory.getOrder($scope.id).then(function(item) {
        $scope.order = item;
        $scope.getTotals();
        $scope.vat_rules = $scope.order.vat_rules;
        $scope.newrow.vat_id = $scope.vat_rules[0].id.toString();
      });
    }

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        price: 0,
        product: null,
        object_type: "Order"
    };

    if($scope.order){
        $scope.vat_rules = $scope.order.vat_rules;
        $scope.newrow.vat_id = $scope.vat_rules[0].id.toString();
    }

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

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

    $scope.contacts = [];
    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.totalVAT = 0;

    $scope.changeShippingAddress = function(){
        console.log("change address");

        ordersFactory.editOrder($scope.id, {
            shipping_address: $scope.order.shipping_address
        }).then(function(order){
            console.log(order);
            $scope.order.shipping_address = order.shipping_address;
        });
    };

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
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.getTotals();

    $scope.getContacts = function(){
        if($scope.contacts.length){
            return;
        }
        contactsFactory.getContacts().then(function(contacts){
            $scope.contacts = contacts;
        });
    }

    $scope.updateList = function(edited){
        var findItem = lodash.find($scope.orders, function(order) {
          return order.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.saveContact = function(contact){
        console.log(contact);
        if(!contact.id){
            console.log("no new contact");
            return;
        }
        ordersFactory.editOrder($scope.id, {
            contact_id: contact.id
        }).then(function(order){
            $scope.order.contact = order.contact;
            console.log("contact saved");
            $scope.editContact = false;
            $scope.updateList(order);
        });
    },

    $scope.changeCurrency = function(){
        ordersFactory.editOrder($scope.id, {
            currency: $scope.order.currency
        }).then(function(data){
            console.log("currency changed");
        });
    };

    $scope.changeNotes = function(){
        ordersFactory.editOrder($scope.id, {
            notes: $scope.order.notes
        }).then(function(data){
            console.log("notes changed");
        });
    };

    $scope.changePriceList = function(){
        ordersFactory.editOrder($scope.id, {
            price_list_id: $scope.order.price_list_id
        }).then(function(data){
            console.log("price list changed");
        });
    };

    $scope.changeStep = function(step){
        ordersFactory.editOrder($scope.id, {
            step: step
        }).then(function(data){
            $scope.order.step = data.step;
            $scope.order.steps = data.steps;
        });
    };

    $scope.isGeneratingInvoice = false;
    $scope.generateInvoice = function(){
        $scope.isGeneratingInvoice = true;
        ordersFactory.generateInvoice($scope.id).then(function(invoice){
            $scope.isGeneratingInvoice = false;
            $state.go('invoices.item.general', {id: invoice.id, invoice: invoice});
        });
    };

  }

  ordersSingleItemController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', '$state', 'lodash'];

})();

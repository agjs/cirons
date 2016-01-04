(function() {
  'use strict';
  module.exports = invoicesSingleItemController;

  function invoicesSingleItemController($scope, $stateParams, invoicesFactory, contactsFactory, orderRowsFactory, productsFactory, $state, lodash, settingsFactory, paymentsFactory) {
    $scope.invoice = $stateParams.invoice;
    $scope.id = $stateParams.id;

    $scope.editContact = false;
    $scope.newContact = null;

    $scope.contacts = [];
    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });



    if (!$scope.invoice) {
      invoicesFactory.getInvoice($scope.id).then(function(item) {
        $scope.invoice = item;
        $scope.getTotals();
      });
    } 

    $scope.getContacts = function(){
        if($scope.contacts.length){
            return;
        }
        contactsFactory.getContacts().then(function(contacts){
            $scope.contacts = contacts;
        });
    }

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        vat: 0,
        price: 0,
        product: null,
        object_type: "Invoice"
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

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
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        $scope.getDebt();
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.savePayment = function(){
        var payment = $scope.newPayment;
        payment.object_type = "Invoice";
        payment.object_id = $scope.id;
        paymentsFactory.addPayment(payment).then(function(data){
            console.log("payment added");
            $scope.invoice.payments.push(data);
            $scope.cleanNewPayment();
            $scope.getDebt();
            $scope.addPayment = false;

            if($scope.totalDebt <= 10 && $scope.invoice != "paid"){
                $scope.changeStep("paid");
            }
        });
    };

    $scope.totalDebt = 0;
    $scope.getDebt = function(){
        console.log("getDebt");
        console.log($scope.invoice.payments);
        $scope.totalDebt = $scope.grandTotal;

        for(var i = 0; i < $scope.invoice.payments.length; i++){
            var payment = $scope.invoice.payments[i];
            $scope.totalDebt -= payment.amount;
        }
    };

    $scope.addPayment = false;
    $scope.newPayment = {};
    $scope.cleanNewPayment = function(){
        $scope.newPayment = {
            income_account_no: 0,
            date: new Date(),
            amount: 0
        };
    }
    $scope.cleanNewPayment();

    $scope.getTotals();

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.invoice.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.settings.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "Invoice"
            };
        })
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.changeShippingAddress = function(){
        console.log("change address");

        invoicesFactory.editInvoice($scope.id, {
            shipping_address: $scope.invoice.shipping_address
        }).then(function(invoice){
            $scope.invoice.shipping_address = invoice.shipping_address;
        });
    };

    $scope.changeBillingAddress = function(){
        console.log("change address");

        invoicesFactory.editInvoice($scope.id, {
            billing_address: $scope.invoice.billing_address
        }).then(function(invoice){
            $scope.invoice.billing_address = invoice.billing_address;
        });
    };

    $scope.saveContact = function(contact){
        console.log(contact);
        if(!contact.id){
            console.log("no new contact");
            return;
        }
        invoicesFactory.editInvoice($scope.id, {
            contact_id: contact.id
        }).then(function(order){
            $scope.invoice.contact = order.contact;
            console.log("contact saved");
            $scope.editContact = false;
            $scope.updateList(order);
        });
    },

    $scope.changeCurrency = function(){
        invoicesFactory.editInvoice($scope.id, {
            currency: $scope.invoice.currency
        }).then(function(data){
            console.log("currency changed");
        });
    };

    $scope.changeNotes = function(){
        invoicesFactory.editInvoice($scope.id, {
            notes: $scope.invoice.notes
        }).then(function(data){
            console.log("notes changed");
        });
    };

    $scope.changePriceList = function(){
        invoicesFactory.editInvoice($scope.id, {
            price_list_id: $scope.invoice.price_list_id
        }).then(function(data){
            console.log("price list changed");
        });
    };

    $scope.changeStep = function(step){
        invoicesFactory.editInvoice($scope.id, {
            step: step
        }).then(function(data){
            $scope.invoice.step = data.step;
            $scope.invoice.steps = data.steps;
        });
    };

    $scope.bookInvoice = function(){
        invoicesFactory.bookInvoice($scope.id).then(function(invoice){
            $scope.invoice = invoice;
        });
    };

    $scope.createCreditNote = function(){
        //do something with state
    };

  }

  invoicesSingleItemController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', '$state', 'lodash', 'settingsFactory', 'paymentsFactory'];

})();

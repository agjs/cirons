(function() {
    "use strict";
    module.exports = supplier_invoice_card;

    function supplier_invoice_card() {

        return {
            restrict: 'EA',
            scope: {
                supplierInvoice: '=',
                onOpen: '&'
            },
            templateUrl: 'components/directives/supplier-invoice-card/template.html',
            replace: true,
            link: function(scope, element, attrs) {

            },
            controller: function($scope, $state) {
                console.log("si: ", $scope.supplierInvoice);
                $scope.open = function() {
                    $scope.onOpen();
                    $state.go("supplier_invoices.item", {id: $scope.supplierInvoice.id});
                };
            }
        }

    }

    supplier_invoice_card.$inject = [];

})();

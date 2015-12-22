(function() {
  "use strict";
  module.exports = cironsCard;

  function cironsCard(suppliersFactory, receiptsFactory) {
    return {

      restrict: 'EA',
      scope: {
        cardType: '@ctype',
        cardDescription: '@cdesc',
        cardColor: '@ccolor',
        cardIcon: '@cicon',
        cardCounterDesc: '@ccounterdesc',
        cardCounter: '=ccounter',
        cardCounterSecondary: '=csecondary',
        cstate: '@'
      },

      templateUrl: 'components/directives/cirons-card/template.html',
      replace: true,

      link: function(scope, element, attrs, controller) {
        //
        // if (scope.cardType == 'Suppliers') {
        //   suppliersFactory.getSuppliers().then(function(suppliers) {
        //     scope.cardCounter = suppliers.length;
        //   })
        //
        //
        // } else if (scope.cardType == 'Receipts') {
        //   receiptsFactory.getReceipts().then(function(receipts) {
        //     scope.cardCounter = receipts.length;
        //   })
        // }
      }
    }

  }

  cironsCard.$inject = ['suppliersFactory', 'receiptsFactory'];

})();

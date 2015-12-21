(function() {
  'use strict';
  module.exports = receiptsController;

  function receiptsController($scope, $rootScope, $auth, receiptsFactory, $state) {

    receiptsFactory.getReceipts().then(function(receipts) {
      $scope.receipts = receipts;
      $scope.cardCounter = receipts.length;
    });



  }

  receiptsController.$inject = ['$scope', '$rootScope', '$auth', 'receiptsFactory', '$state'];

})();

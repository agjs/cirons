(function() {
  'use strict';
  module.exports = receiptsCountController;

  function receiptsCountController($scope, $rootScope, $auth, receiptsFactory, $state) {

    receiptsFactory.countReceipts().then(function(receipts) {
    $scope.cardCounter = receipts;
    });

  }

  receiptsCountController.$inject = ['$scope', '$rootScope', '$auth', 'receiptsFactory', '$state'];

})();

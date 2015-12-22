(function() {
  'use strict';
  module.exports = suppliersCountController;

  function suppliersCountController($scope, $rootScope, $auth, suppliersFactory, $state) {

    suppliersFactory.countSuppliers().then(function(expenses) {
    $scope.cardCounter = expenses;
    });

  }

  suppliersCountController.$inject = ['$scope', '$rootScope', '$auth', 'suppliersFactory', '$state'];

})();

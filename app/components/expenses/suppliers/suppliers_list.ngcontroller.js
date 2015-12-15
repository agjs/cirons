(function() {
  'use strict';
  module.exports = suppliersListController;

  function suppliersListController($scope, $state) {

    $scope.currentState = function() {
      console.log($state.current);
      return $state.current.name;
    };

  }

  suppliersListController.$inject = ['$scope', '$state'];

})();

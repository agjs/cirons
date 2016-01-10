(function() {
  'use strict';
  module.exports = verificationsController;

  function verificationsController($scope, $rootScope, $auth, verificationsFactory, $state) {

    verificationsFactory.getVerifications().then(function(verifications) {
      $scope.verifications = verifications;
    });

    

  }

  verificationsController.$inject = ['$scope', '$rootScope', '$auth', 'verificationsFactory', '$state'];

})();

(function() {
  'use strict';
  module.exports = verificationsCRUDController;

  function verificationsCRUDController($scope, $stateParams, verificationsFactory, lodash) {

    $scope.addVerification = function() {
      verificationsFactory.addVerification($scope.verification).then(function(added) {
        $scope.verifications.push(added);
      });
    };

    $scope.removeVerification = function() {
      verificationsFactory.removeVerification($stateParams.id);
    };

    $scope.editVerification = function(data) {
      verificationsFactory.editVerification($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.verifications, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  verificationsCRUDController.$inject = ['$scope', '$stateParams', 'verificationsFactory', 'lodash'];

})();

(function() {
  'use strict';
  module.exports = verificationsSingleItemController;

  function verificationsSingleItemController($scope, $stateParams, verificationsFactory) {
    $scope.verification = $stateParams.verification;
    $scope.id = $stateParams.id;


    if (!$scope.verification) {
      verificationsFactory.getVerification($scope.id).then(function(item) {
        $scope.verification = item;
      });
    }

  }

  verificationsSingleItemController.$inject = ['$scope', '$stateParams', 'verificationsFactory'];

})();

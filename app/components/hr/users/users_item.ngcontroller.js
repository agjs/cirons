(function() {
  'use strict';
  module.exports = usersSingleItemController;

  function usersSingleItemController($scope, $stateParams, usersFactory, lodash) {
    $scope.user = $stateParams.user;
    $scope.id = $stateParams.id;

    $scope.alerts = [];

    if (!$scope.user) {
      usersFactory.getUser($scope.id).then(function(item) {
        $scope.user = item;
      });
    }

    $scope.saveUser = function(){
        var saveuser = $scope.user;
        delete saveuser.username;
        usersFactory.editUser($scope.user.id, $scope.user).then(function(user){
            $scope.user = user;
            var findItem = lodash.find($scope.users, function(arg) {
              return arg.id === $stateParams.id;
            });
            if (findItem) {
              findItem = user;
            }
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.savePassword = function(){
        if($scope.password && $scope.password != ""){

            if($scope.password.length < 8){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'Password must be at least 8 characters!'
                });
                return;
            }

            if($scope.password_confirmation && $scope.password_confirmation == ""){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'You need to confirm the password!'
                });
                return;
            }
            if($scope.password != $scope.password_confirmation){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'The password must match the confirmation!'
                });
                return;
            }

            usersFactory.changePassword($scope.id, {
                password: $scope.password,
                password_confirmation: $scope.password_confirmation
            }).then(function(user){
                $scope.alerts.push({
                    type: 'success',
                    msg: 'Password is now changed'
                });
            });
            return;
        }
        $scope.alerts.push({
            type: 'danger',
            msg: 'You need to first type in a new password and confirmation!'
        });
        return;
    };

  }

  usersSingleItemController.$inject = ['$scope', '$stateParams', 'usersFactory', 'lodash'];

})();

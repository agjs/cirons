(function() {
    'use strict';
    module.exports = mainMenuController;

    function mainMenuController($scope, $rootScope) {

        $scope.touchMenuOpen = false;
        $scope.toggleTouchMenu = function() {
            $scope.touchMenuOpen = !$scope.touchMenuOpen;
        };

        $scope.logoUrl = 'assets/images/logo.png';
        $scope.menu = $rootScope.menu;

    }

    mainMenuController.$inject = ['$scope', '$rootScope'];

})();

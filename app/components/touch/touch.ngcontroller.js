(function() {
    'use strict';

    module.exports = touchController;

    function touchController($scope, $rootScope){
        $scope.menu = $rootScope.menu;

        $scope.menu.splice(1,0, {
            title: 'Upload',
            state: 'touch.upload',
            separateAfter: true,
            icon: 'fa fa-cloud-upload'
        });

    }

    touchController.$inject = ["$scope", "$rootScope"];

}());

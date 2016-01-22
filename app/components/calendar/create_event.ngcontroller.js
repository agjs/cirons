(function() {
    'use strict';
    module.exports = createEventController;

    function createEventController($scope, calendarFactory, $uibModalInstance, start, end) {

        $scope.loading = false;

        $scope.start_date = start.toDate();
        $scope.start_time = start.toDate();

        $scope.end_date = end.toDate();
        $scope.end_time = end.toDate();

        $scope.hstep = 1;
        $scope.mstep = 15;


        $scope.selectEmployee = false;
        $scope.selectEmployeeTypes = [
            "working_hours"
        ];
        $scope.changeType = function(){
            if( $scope.selectEmployeeTypes.indexOf($scope.event.type) < 0 ){
                return;
            }

            $scope.selectEmployee = true;
        };

        $scope.event = {
            title: '',
            type: '0'
        };

        $scope.noTitleTypes = [
            "duedate",
            "working_hours"
        ];
        $scope.showTitle = function(){
            return ( $scope.noTitleTypes.indexOf($scope.event.type) < 0 );
        };

        $scope.save = function(){

            $scope.loading = true;

            $scope.event.start = new Date(
                $scope.start_date.getFullYear(),
                $scope.start_date.getMonth(),
                $scope.start_date.getDate(),
                $scope.start_time.getHours(),
                $scope.start_time.getMinutes()
            );

            $scope.event.end = new Date(
                $scope.end_date.getFullYear(),
                $scope.end_date.getMonth(),
                $scope.end_date.getDate(),
                $scope.end_time.getHours(),
                $scope.end_time.getMinutes()
            );

            console.log("saving event");
            calendarFactory.addEvent($scope.event).then(function(event){
                $scope.loading = false;
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }

    createEventController.$inject = ['$scope', 'calendarFactory', '$uibModalInstance', 'start', 'end'];

})();

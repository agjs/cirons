(function() {
    'use strict';
    module.exports = eventController;

    function eventController($scope, calendarFactory, $uibModalInstance, calEvent) {

        $scope.event = calEvent;

        $scope.start_date = $scope.event.start.toDate();
        $scope.start_time = $scope.event.start.toDate();

        $scope.end_date = $scope.event.end.toDate();
        $scope.end_time = $scope.event.end.toDate();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.loading = false;

        $scope.noTitleTypes = [
            "duedate",
            "working_hours"
        ];
        $scope.showTitle = function(){
            return ( $scope.noTitleTypes.indexOf($scope.event.type) < 0 );
        };

        $scope.noSaveTypes = [
            "duedate"
        ];
        $scope.showSave = function(){
            return ( $scope.noSaveTypes.indexOf($scope.event.type) < 0 );
        };

        $scope.supplierInvoiceOnOpen = function(){
            $uibModalInstance.dismiss('cancel');
        };

        $scope.delete = function(){
            $scope.loading = true;
            calendarFactory.deleteEvent($scope.event.id).then(function(status){
                if(status.success){
                    $scope.loading = false;
                    $uibModalInstance.close();
                }
            });
        };

        $scope.save = function(){
            console.log("saving event");
            if(!$scope.showSave()){
                return;
            }
            if(!$scope.event){
                return;
            }

            $scope.loading = true;

            calendarFactory.editEvent($scope.event.id, $scope.event).then(function(event){
                $scope.loading = false;
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }

    eventController.$inject = ['$scope', 'calendarFactory', '$uibModalInstance', 'calEvent'];

})();

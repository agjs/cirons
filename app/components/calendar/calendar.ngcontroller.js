(function() {
    'use strict';
    module.exports = calendarController;

    // https://github.com/angular-ui/ui-calendar
    // http://fullcalendar.io/docs/

    function calendarController($scope, calendarFactory, $uibModal) {

        $scope.uiConfig = {
            calendar: {
                height: $("section.content > .inner").height() - 80,
                editable: true,
                header: {
                    right: 'month agendaWeek agendaDay',
                    center: 'title',
                    left: 'today prev,next'
                },
                events: function(start, end, timezone, callback) {
                    start = start.format('YYYY-MM-DD H:mm:ss');
                    end = end.format('YYYY-MM-DD H:mm:ss');
                    calendarFactory.getEvents(start, end).then(function(data) {
                        console.log(data);
                        callback(data);
                    });
                },
                eventClick: function(calEvent, jsEvent, view) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        controller: 'eventController',
                        templateUrl: 'components/calendar/modals/event.view.html',
                        resolve: {
                            calEvent: calEvent
                        }
                    });

                    modalInstance.result.then(function(selectedItem) {
                        //when saved
                        console.log("Event saved");
                        $("#calendar").fullCalendar("refetchEvents");
                    }, function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });

                },
                select: function(start, end, jsEvent, view) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        controller: 'createEventController',
                        templateUrl: 'components/calendar/modals/create.view.html',
                        resolve: {
                            start: start,
                            end: end
                        }
                    });

                    modalInstance.result.then(function(selectedItem) {
                        //when saved
                        console.log("Event saved");
                        $("#calendar").fullCalendar("refetchEvents");
                    }, function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                },
                defaultView: 'agendaWeek',
                selectable: true,
                weekNumbers: true,
                selectHelper: true,
                businessHours: true,
                editable: true,
                eventLimit: true,
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $(window).resize(function(){
            var nh = $("section.content > .inner").height() - 80;
            $('#calendar').fullCalendar('option', 'height', nh);
        });

        $scope.eventSources = [];

        $scope.getEvents = function(start, end, timezone, callback) {
            console.log("get events to calendar");
            calendarFactory.getEvents().then(function(data) {
                $scope.parseEvents(data);
            });
        };
        //$scope.getEvents();

        $scope.parseEvents = function(events) {
            $scope.eventSources = events;
            console.log(events);

            $("#calendar").fullCalendar("refetchEvents");
        };

    }

    calendarController.$inject = ['$scope', 'calendarFactory', '$uibModal'];

})();

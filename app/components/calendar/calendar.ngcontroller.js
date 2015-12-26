(function() {
  'use strict';
  module.exports = calendarController;

  // https://github.com/angular-ui/ui-calendar
  // http://fullcalendar.io/docs/

  function calendarController($scope, calendarFactory) {

    $scope.uiConfig = {
      calendar: {
        height: 550,
        editable: true,
        header: {
          right: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          left: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };


    calendarFactory.getCalendarData().then(function(data) {
      $scope.eventSources = data;
    })

  }

  calendarController.$inject = ['$scope', 'calendarFactory'];

})();

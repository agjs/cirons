(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('calendarController', require('./calendar.ngcontroller'))
    .controller('eventController', require('./event.ngcontroller'))
    .controller('createEventController', require('./create_event.ngcontroller'))
    .factory('calendarFactory', require('./calendar.ngfactory'))
    .config(require('./calendar.ngrouter'));

})();

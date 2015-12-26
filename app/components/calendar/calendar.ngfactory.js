(function() {
  'use strict';
  module.exports = calendarFactory;

  function calendarFactory($http, $q) {

    return {

      getCalendarData: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/calendar').then(function(calendar) {
          if (calendar) {
            return calendar.data;
          } else {
            throw new Error('Calendar data could not be retrieved!');
          }

        });
      }

    };

  }

  calendarFactory.$inject = ['$http', '$q'];

})();

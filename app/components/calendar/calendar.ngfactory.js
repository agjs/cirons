(function() {
    'use strict';
    module.exports = calendarFactory;

    function calendarFactory($http, $q) {

        return {

            getEvents: function(start, end) {
                return $http.get('http://janalex.beta.cirons.com/api/v1/calendar/' + start + '/' + end).then(function(events) {
                    if (events) {
                        return events.data;
                    } else {
                        throw new Error('Calendar data could not be retrieved!');
                    }
                });
            },

            editEvent: function(id, data){
                return $http.put('http://janalex.beta.cirons.com/api/v1/calendar/' + id, data).then(function(event){
                    if(event){
                        return event.data;
                    } else {
                        throw new Error("Cant save event");
                    }
                });
            },

            deleteEvent: function(id){
                return $http.delete('http://janalex.beta.cirons.com/api/v1/calendar/' + id).then(function(status){
                    if(status){
                        return status.data;
                    } else {
                        throw new Error("cant delete event");
                    }
                })
            },

            addEvent: function(data) {
                return $http.post('http://janalex.beta.cirons.com/api/v1/calendar', data).then(function(event) {
                    if (event) {
                        return event.data;
                    } else {
                        throw new Error("Cant add event");
                    }
                })
            }

        };

    }

    calendarFactory.$inject = ['$http', '$q'];

})();

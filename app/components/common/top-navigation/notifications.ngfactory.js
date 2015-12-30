(function() {
  'use strict';
  module.exports = notificationsFactory;

  function notificationsFactory($http, $q) {

    return function(token, type) {
      return $http({
        url: 'http://janalex.beta.cirons.com/api/v1/notifications/read/',
        method: 'POST',
        data: {
          _token: token,
          type: type
        }
      }).then(function(notifications) {
        if (notifications) {
          console.log(notifications);
          // return notifications.data;
        } else {
          throw new Error('Notifications cannot be retrieved');
        }

      });
    }


  }

  notificationsFactory.$inject = ['$http', '$q'];

})();

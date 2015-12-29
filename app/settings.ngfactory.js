(function() {
  'use strict';
  module.exports = settingsFactory;

  function settingsFactory($http, $q) {
    var settings = [];
    return {
        initSettings: function(){
            return $http.get("http://janalex.beta.cirons.com/api/v1/settings").then(function(data){
                settings = data.data;
                console.log(settings);
                return data.data;
            });
        },
        getSettings: function(){
            return settings;
        }
    };

  }

  settingsFactory.$inject = ['$http', '$q'];

})();

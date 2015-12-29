(function() {
  'use strict';
  module.exports = settingsFactory;

  function settingsFactory($http, $q) {
    var factory = this;
    var settings = [];
    return {
        getSettings: function(){
            if(factory.settings.length){
                return factory.settings;
            }

            $http.get("http://janalex.beta.cirons.com/api/v1/settings").then(function(settings){

            });
        }
    };

  }

  settingsFactory.$inject = ['$http', '$q'];

})();

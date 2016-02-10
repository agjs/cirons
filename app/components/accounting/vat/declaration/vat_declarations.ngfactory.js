(function() {
  'use strict';
  module.exports = VATDeclarationsFactory;

  function VATDeclarationsFactory($http) {
      return {
          getAmounts: function(start, end){
              return $http.get('http://janalex.beta.cirons.com/api/v1/accounting/vat/declaration/amounts/' + start + "/" + end).then(function(amounts) {
                  if(amounts){
                      return amounts.data;
                  } else {
                      throw new Error("No amounts found");
                  }
              });
          }
      };
  }

  VATDeclarationsFactory.$inject = ['$http'];

})();

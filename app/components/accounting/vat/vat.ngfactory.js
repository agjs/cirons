(function() {
  'use strict';
  module.exports = VATFactory;

  function VATFactory($http) {
      return {
          getItems: function(){
              return $http.get('http://janalex.beta.cirons.com/api/v1/accounting/vat/items').then(function(items) {
                  if(items){
                      return items.data;
                  } else {
                      throw new Error("No items found");
                  }
              });
          }
      };
  }

  VATFactory.$inject = ['$http'];

})();

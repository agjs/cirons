(function() {
  "use strict";
  module.exports = cirons_address_selector;

  function cirons_address_selector() {

    return {
      restrict: 'EA',
      scope: {
          address: '=',
          onchange: '&'
      },
      templateUrl: 'components/directives/cirons-address-selector/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          
      }
    }

  }

  cirons_address_selector.$inject = [];

})();

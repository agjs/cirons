(function() {
  "use strict";
  module.exports = cirons_order_rows;

  function cirons_order_rows() {

    return {
      restrict: 'EA',
      scope: {
          rows: '=',
          updateRow: '&',
          addOrderRow: '&'
      },
      templateUrl: 'components/directives/cirons-order-rows/template.html',
      replace: true,
      link: function(scope, element, attrs) {

      },
      controller: function($scope, $auth){
          
      }
    }

  }

  cirons_order_rows.$inject = [];

})();

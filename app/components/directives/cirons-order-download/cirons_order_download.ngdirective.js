(function() {
  "use strict";
  module.exports = cirons_order_download;

  function cirons_order_download() {

    return {
      restrict: 'EA',
      scope: {
          order: '='
      },
      templateUrl: 'components/directives/cirons-order-download/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          element.dropdown();
      }
    }

  }

  cirons_order_download.$inject = [];

})();

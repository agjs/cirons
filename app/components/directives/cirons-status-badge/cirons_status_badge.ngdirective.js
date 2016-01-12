(function() {
  "use strict";
  module.exports = cirons_status_badge;

  function cirons_status_badge() {
    return {
      restrict: 'EA',
      scope: {
          modelType: '@',
          step: '@'
      },
      templateUrl: 'components/directives/cirons-status-badge/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          console.log(attrs.type, attrs.step);
      }
    }

  }

  cirons_status_badge.$inject = [];

})();

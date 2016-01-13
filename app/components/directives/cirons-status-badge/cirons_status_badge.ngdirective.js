(function() {
  "use strict";
  module.exports = cirons_status_badge;

  function cirons_status_badge(infoFactory) {
    return {
      restrict: 'EA',
      scope: {
          model: '@',
          step: '@'
      },
      templateUrl: 'components/directives/cirons-status-badge/template.html',
      replace: true,
      link: function(scope, element, attrs) {

          var info = infoFactory.statuses;

          var status = info[attrs.model][attrs.step];

          scope.color = status.color;
          scope.label = status.label;

          if(status.icon){
              scope.icon = status.icon;
          } else {
              scope.icon = null;
          }

      }
    }

  }

  cirons_status_badge.$inject = ['infoFactory'];

})();

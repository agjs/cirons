(function() {
  "use strict";
  module.exports = cirons_list_card;

  function cirons_list_card($complie) {

    return {
      restrict: 'EA',
      scope: {
        newitemstate: '@',
        singleitemstate: '@',
        data: '=',
        p1: '@',
        p2: '@',
        p3: '@',
        p4: '@',
        step: '@',
        secRightType: '@'
      },
      templateUrl: 'components/directives/cirons-list-view/template.html',
      replace: false,
      link: function(scope, element, attrs) {

      }
    }

  }

  cirons_list_card.$inject = ['$compile'];

})();

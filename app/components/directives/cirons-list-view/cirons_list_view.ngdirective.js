(function() {
    "use strict";
    module.exports = cironsCard;

    function cironsCard() {

      return {
        restrict: 'EA',
        scope: {
            // TODO
        },
        templateUrl: 'components/directives/cirons-list-view/template.html',
        replace: true,
        link: function(scope) {}
      }

    }

    cironsCard.$inject = [];

})();

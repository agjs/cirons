(function() {
    "use strict";
    module.exports = cirons_list_card;

    function cirons_list_card() {

      return {
        restrict: 'EA',
        scope: {
            newitemstate: '@',
            singleitemstate: '@',
            data: '='

        },
        templateUrl: 'components/directives/cirons-list-view/template.html',
        replace: true,
        link: function(scope) {

        }
      }

    }

    cirons_list_card.$inject = [];

})();

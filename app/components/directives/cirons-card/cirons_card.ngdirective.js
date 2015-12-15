(function() {
    "use strict";
    module.exports = cironsCard;

    function cironsCard() {

      return {
        restrict: 'EA',
        scope: {
          cardType: '=ctype',
          cardDescription: '=cdesc',
          cardColor: '=ccolor',
          cardIcon: '=cicon',
          cardCounter: '=ccounter',
          cstate: '@'
        },
        templateUrl: 'components/directives/cirons-card/template.html',
        replace: true,
        link: function(scope) {}
      }

    }

    cironsCard.$inject = [];

})();

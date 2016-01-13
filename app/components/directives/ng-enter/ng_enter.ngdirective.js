(function() {
  "use strict";
  module.exports = ng_enter;

  function ng_enter() {
    return {
      restrict: 'A',
      link: function (scope, elements, attrs) {
              elements.bind('keydown keypress', function (event) {
                  if (event.which === 13) {
                      scope.$apply(function () {
                          scope.$eval(attrs.ngEnter);
                      });
                      console.log("ENTER!!!");
                      event.preventDefault();
                  }
              });
           }
    }

  }

  ng_enter.$inject = [];

})();

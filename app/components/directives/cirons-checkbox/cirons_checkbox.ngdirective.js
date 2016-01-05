(function() {
  "use strict";
  module.exports = cirons_checkbox;

  function cirons_checkbox() {

    return {
      restrict: 'EA',
      scope: {
          model: '=',
          label: '@',
          change: '&'
      },
      templateUrl: 'components/directives/cirons-checkbox/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          element.checkbox({
              onChange: function(){
                  scope.change();
                  if(element.checkbox('is checked')){
                      scope.model = 1;
                  } else {
                      scope.model = 0;
                  }
              }
          });
      }
    }

  }

  cirons_checkbox.$inject = [];

})();

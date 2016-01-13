(function() {
  "use strict";
  module.exports = sui_dropdown;

  function sui_dropdown() {
    return {
      restrict: 'A',
      link: function (scope, elements, attrs) {

          var options = {

          };

          if(attrs.suiAction){
              options.action = attrs.suiAction;
          }

          elements.dropdown(options);

      }
    }
  }

  sui_dropdown.$inject = [];

})();

(function() {
  "use strict";
  module.exports = cironsModelSelector;

  function cironsModelSelector() {

    return {
      restrict: 'EA',
      scope: {
        name: '=name',
        model: '@model',
        modelTitle: '@modelTitle',
        modelReturn: '@modelReturn',
        selected: '=selected'
      },
      templateUrl: 'components/directives/cirons-model-selector/template.html',
      replace: true,
      controller: function($scope, $http, $element, $attrs) {
          console.log($attrs.selected);
        $scope.model = $attrs.model;
        $http.get('http://janalex.beta.cirons.com/api/v1/' + $scope.model).then(function(items) {
            if (items.data) {
                var array = [];
                for(var i = 0; i < items.data.length; i++){
                    var item = items.data[i];
                    item.typeaheadTitle = item[$attrs.modelTitle];
                    array.push(item);
                }
                $scope.items = array;
                console.log($scope.items);
            }
        });
        $scope.selectItem = function($item, $model, $label){
            console.log("item selected");

        };
      }
    }

  }

  cironsModelSelector.$inject = [];

})();

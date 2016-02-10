(function() {
    "use strict";
    module.exports = number_input;

    function number_input($filter, $browser) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl) {

                if(!ngModelCtrl){
                    return;
                }

                var listener = function() {
                    var value = $element.val().replace(/,/g, '');
                    value = value.replace(/\s/g, '');
                    $element.val($filter('number')(value, 2));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return viewValue.replace(/,/g, '');
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function() {
                    $element.val($filter('number')(ngModelCtrl.$viewValue, 2))
                };

                $element.bind('change', listener);
                $element.bind('keydown', function(event) {
                    var key = event.keyCode
                        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                        // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
                        return
                    $browser.defer(listener) // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function() {
                    $browser.defer(listener)
                });
            }
        }

    }

    number_input.$inject = ['$filter', '$browser'];

})();

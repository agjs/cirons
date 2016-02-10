(function() {
    'use strict';

    module.exports = numberDash;

    function numberDash($filter){

        return function(number) {
            if(parseInt(number) == 0){
                return "–";
            }

            return $filter('number')(number, 2)
        };
    }

    numberDash.$inject = ['$filter'];

}());

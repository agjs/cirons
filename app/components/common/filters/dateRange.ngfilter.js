(function() {
    'use strict';

    module.exports = dateRange;

    function dateRange(){

        return function(items, key, from, to) {
            if(!from){
                return items;
            }
            var df = new Date(from);
            if(to){
                var dt = new Date(to);
            } else {
                var dt = new Date();
            }
            var result = [];
            for (var i=0; i<items.length; i++){
                var tf = new Date(items[i][key]),
                    tt = new Date(items[i][key]);
                if (tf > df && tt < dt)  {
                    result.push(items[i]);
                }
            }
            return result;
        };
    }

    dateRange.$inject = [];

}());

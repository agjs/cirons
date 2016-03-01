(function() {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('touchController', require('./touch.ngcontroller'))
        .controller('uploadController', require('./upload.ngcontroller'))
        .config(require('./touch.ngrouter'));

})();

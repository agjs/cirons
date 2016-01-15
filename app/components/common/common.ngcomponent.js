(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('mainController', require('./main.ngcontroller'))
    .controller('mainMenuController', require('./main-menu/main_menu.ngcontroller'))
    .controller('rightSidebarController', require('./right-sidebar/right_sidebar.ngcontroller'))
    .controller('navigationController', require('./top-navigation/navigation.ngcontroller'))
    .factory("settingsFactory", require("../../settings.ngfactory.js"))
    .factory("infoFactory", require("./info.ngfactory.js"))
    .factory("commentsFactory", require("./comments.ngfactory.js"))
    .factory("notificationsFactory", require("./top-navigation/notifications.ngfactory.js"))
    .filter("dateRange", require("./filters/dateRange.ngfilter"))
})();

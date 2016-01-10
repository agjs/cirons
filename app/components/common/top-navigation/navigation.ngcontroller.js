(function() {
  'use strict';
  module.exports = navigationController;

  function navigationController($scope, $pusher, $auth, $state, meFactory, notificationsFactory) {
    $scope.iconMenu = [

      {
        icon: 'fa fa-bullhorn',
        state: '',
        div_id: 'notifications_normal',
        button_id: 'normal'
      }, {
        icon: 'fa fa-bell',
        state: '',
        div_id: 'notifications_reminder',
        button_id: 'reminder'

      }, {
        icon: 'fa fa-exclamation-triangle',
        state: '',
        div_id: 'notifications_urgent',
        button_id: 'urgent'
      }

    ];

    $scope.isVisible = false;
    $scope.visible = function(arg) {
      if (arg === 'normal') {
        $scope.inlineStyle = 'top: 50px; right: 105px; left: auto; bottom: auto; display: block !important;';
        // notificationsFactory(csrf_token, 'normal');

      } else if (arg === 'reminder') {
        $scope.inlineStyle = 'top: 50px; right: 52.3125px; left: auto; bottom: auto; display: block !important;';
        // notificationsFactory(csrf_token, 'reminder');

      } else if (arg === 'urgent') {
        $scope.inlineStyle = 'top: 50px; right: -0.375px; left: auto; bottom: auto; display: block !important;';
        // notificationsFactory(csrf_token, 'urgent');
      }

      $scope.isVisible = !$scope.isVisible;

    }

    meFactory.promise().then(function(user) {
      $scope.user = user;


      var pusher = $pusher(pusherClient);

      pusher.subscribe('maacann');
      pusher.bind('user_' + user.id, function(data) {
        // var title;
        // switch (data.notification.type) {
        //   case "normal":
        //     title = "Notification";
        //     break;
        //   case "reminder":
        //     title = "Reminder";
        //   case "urgent":
        //     title = "Warning";
        // }

        getNotificationButton(data.notification.type); // Where does this method comes from ?????
        spawnNotification(title, data.notification.text, data.notification.link); // Where does this method comes from ?????


      });



    });


  }

  navigationController.$inject = ['$scope', '$pusher', '$auth', '$state', 'meFactory', 'notificationsFactory'];

})();

#TODO

###Install libraries?
* Moment.js
* time-counter
* countUp.js

###Parts
* Gauges



###Old Codes

####Pusher
```javascript
(function(){
                if (!("Notification" in window)) {
                    console.log("This browser does not support desktop notification");
                } else if (Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    
                  }

                  // Otherwise, we need to ask the user for permission
                  else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
                      // If the user accepts, let's create a notification
                      if (permission === "granted") {
                        
                      }
                    });
                  }
            }());

            Pusher.log = function(message) {
                if (window.console && window.console.log) {
                    window.console.log(message);
                }
            };

            var pusher = new Pusher('3400e69279ea78f5b712', {
                encrypted: true
            });
            var channel = pusher.subscribe('{{CLIENT}}');
            channel.bind('user_{{Auth::user()->id}}', function(data) {
                var title;
                switch(data.notification.type){
                    case "normal":
                        title = "Notification";
                        break;
                    case "reminder":
                        title = "Reminder";
                    case "urgent":
                        title = "Warning";
                }

                getNotificationButton(data.notification.type);

                spawnNotification(title, data.notification.text, data.notification.link);
            });
```
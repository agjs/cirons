(function() {
    'use strict';
    module.exports = infoFactory;

    function infoFactory(){
        return {
            statuses: {
                "Invoice": {
                    draft: {
                        color: "yellow",
                        label: "Draft"
                    },
                    booked: {
                        color: "orange",
                        label: "Booked"
                    },
                    sent: {
                        color: "blue",
                        label: "Sent"
                    },
                    paid: {
                        color: "teal",
                        label: "Paid",
                        icon: "icon check"
                    }
                },
                "Order": {
                    pending: {
                        color: "yellow",
                        label: "Pending"
                    },
                    shipped: {
                        color: "violet",
                        label: "Shipped"
                    },
                    delivered: {
                        color: "teal",
                        label: "Delivered",
                        icon: "icon check"
                    },
                    cancelled: {
                        color: "black",
                        label: "Cancelled",
                        icon: "icon remove"
                    }
                }
            }
        };
    }

    infoFactory.$inject = [];
}());

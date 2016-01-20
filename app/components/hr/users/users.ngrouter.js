(function() {
    'use strict';
    module.exports = usersRouter;

    function usersRouter($stateProvider) {
        $stateProvider
            .state('users', {
                url: "/hr/users",

                ncyBreadcrumb: {
                    label: 'Users',
                    parent: 'hr',
                },
                views: {
                    '': {
                        templateUrl: 'components/hr/users/users.view.html',
                        controller: 'usersController'

                    },
                    'usersList@users': {
                        templateUrl: 'components/hr/users/users_list.view.html',
                    }
                }
            })

        .state('users.create', {
            url: "/create",
            ncyBreadcrumb: {
                parent: 'users',
                label: 'Write a User'
            },
            views: {
                '': {
                    templateUrl: 'components/hr/users/users.view.html'
                },
                'usersList@users': {
                    templateUrl: 'components/hr/users/users_list.view.html',

                },
                'usersContent@users': {
                    templateUrl: 'components/hr/users/users_create.view.html',
                    controller: 'usersCRUDController'
                }
            }
        })

        .state('users.item', {
            url: "/:id",
            params: {
                user: undefined
            },
            ncyBreadcrumb: {
                parent: 'users',
                label: '{{id}}'
            },
            views: {
                '': {
                    templateUrl: 'components/hr/users/users.view.html'
                },
                'usersList@users': {
                    templateUrl: 'components/hr/users/users_list.view.html',

                },
                'usersContent@users': {
                    templateUrl: 'components/hr/users/users_content.view.html',
                    controller: 'usersSingleItemController'
                }
            }
        });

    }

    usersRouter.$inject = ['$stateProvider'];

})();

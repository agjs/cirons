(function() {
  'use strict';
  module.exports = contactsRouter;

  function contactsRouter($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: "/sales/contacts",

        ncyBreadcrumb: {
          label: 'Contacts',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/contacts/contacts.view.html',
            controller: 'contactsController'

          },
          'contactsList@contacts': {
            templateUrl: 'components/sales/contacts/contacts_list.view.html',
          }
        }
      })

    .state('contacts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'contacts',
        label: 'Write a Contact'
      },
      views: {
        '': {
          templateUrl: 'components/sales/contacts/contacts.view.html'
        },
        'contactsList@contacts': {
          templateUrl: 'components/sales/contacts/contacts_list.view.html',

        },
        'contactsContent@contacts': {
          templateUrl: 'components/sales/contacts/contacts_create.view.html',
          controller: 'contactsCRUDController'
        }
      }
    })

    .state('contacts.item', {
      url: "/:id",
      params: {
        contact: undefined
      },
      ncyBreadcrumb: {
        parent: 'contacts',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/contacts/contacts.view.html'
        },
        'contactsList@contacts': {
          templateUrl: 'components/sales/contacts/contacts_list.view.html',

        },
        'contactsContent@contacts': {
          templateUrl: 'components/sales/contacts/contacts_content.view.html',
          controller: 'contactsSingleItemController'
        }
      }
    });

  }

  contactsRouter.$inject = ['$stateProvider'];

})();

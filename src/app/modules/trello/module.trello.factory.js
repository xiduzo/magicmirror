(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('TrelloModuleFactory', TrelloModuleFactory);

  /** @ngInject */
  function TrelloModuleFactory(
    $rootScope,
    $timeout,
    $log,
    TrelloApi,
    TRELLO_BOARD
  ) {

    var vm = this;

    vm.init = init;

    function init() {
      // Just wait a bit for the application to be loaded
      // If not the TrelloApi will give a shitload of errors
      // Should be angular 1.3 for it to work properly .__.
      // $timeout(getLists, 1000 * 5);
      getLists();
    }

    function getLists() {
      TrelloApi.Authenticate()
      .then(function() {
        TrelloApi.Rest('GET', 'boards/' + TRELLO_BOARD + '/lists')
          .then(function(lists) {
            _.each(lists, function(list) {
              TrelloApi.Rest('GET', 'lists/' + list.id + '/cards')
              .then(function(cards) {
                list.cards = cards;
              });
            });
            $rootScope.$broadcast('lists', {lists: lists});
          });
      });

      // Update this once every 10 minutes
      $timeout(getLists, 1000 * 60 * 10);
    }

    return vm;

  }
}());

(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('TrelloFactory', TrelloFactory);

  /** @ngInject */
  function TrelloFactory(
    $rootScope,
    $timeout,
    $log,
    TrelloApi,
    TRELLO_BOARD
  ) {

    var vm = this;

    vm.init = init;

    function init() {
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

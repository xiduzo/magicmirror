(function() {
  'use strict';

  angular
    .module('mirror')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(
    $timeout,
    DateTime,
    Weather,
    Quotes,
    Github,
    Trello,
    Agenda
  ) {

    // Let's load some shit shall we?
    $timeout(DateTime.init, 1000 * 1);
    $timeout(Weather.init, 1000 * 1);
    $timeout(Agenda.init, 1000 * 1);
    $timeout(Quotes.init, 1000 * 5);
    $timeout(Github.init, 1000 * 5);
    $timeout(Trello.init, 1000 * 5);

  }
})();

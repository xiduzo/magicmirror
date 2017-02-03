(function () {
  'use strict';

  angular
    .module('mirror')
    .directive('trelloModule', trelloModule);

  /** @ngInject */
  function trelloModule() {

    return {
      restrict: 'E',
      templateUrl: 'app/modules/trello/module.trello.html',
      controller: 'TrelloModuleController',
      controllerAs: 'trello',
      replace: true,
      bindToController: true,
      scope: {
        // type: '@type',
        // amount: '@amount',
      }
    };

  }

}());

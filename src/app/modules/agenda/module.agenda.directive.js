(function () {
  'use strict';

  angular
    .module('mirror')
    .directive('agendaModule', agendaModule);

  /** @ngInject */
  function agendaModule() {

    return {
      restrict: 'E',
      templateUrl: 'app/modules/agenda/module.agenda.html',
      controller: 'AgendaModuleController',
      controllerAs: 'agenda',
      replace: true,
      bindToController: true,
      scope: {
        // type: '@type',
        // amount: '@amount',
      }
    };

  }

}());

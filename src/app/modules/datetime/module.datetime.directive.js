(function () {
  'use strict';

  angular
    .module('mirror')
    .directive('dateTimeModule', dateTimeModule);

  /** @ngInject */
  function dateTimeModule() {

    return {
      restrict: 'E',
      templateUrl: 'app/modules/datetime/module.datetime.html',
      controller: 'DateTimeModuleController',
      controllerAs: 'dateTime',
      replace: true,
      bindToController: true,
      scope: {
        // type: '@type',
        // amount: '@amount',
      }
    };

  }

}());

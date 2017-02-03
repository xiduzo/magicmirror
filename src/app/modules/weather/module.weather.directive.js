(function () {
  'use strict';

  angular
    .module('mirror')
    .directive('weatherModule', weatherModule);

  /** @ngInject */
  function weatherModule() {

    return {
      restrict: 'E',
      templateUrl: 'app/modules/weather/module.weather.html',
      controller: 'WeatherModuleController',
      controllerAs: 'weather',
      replace: true,
      bindToController: true,
      scope: {
        // type: '@type',
        // amount: '@amount',
      }
    };

  }

}());

(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('WeatherModuleController', WeatherModuleController);

  /** @ngInject */
  function WeatherModuleController(
    $scope
  ) {

    var vm = this;

    $scope.$on('current-weather', function(event, response) {
      vm.current_weather = response.weather;
    });

    $scope.$on('weather-forecast', function(event, response) {
      vm.weather_forecast = response.weather;
    });

  }
}());

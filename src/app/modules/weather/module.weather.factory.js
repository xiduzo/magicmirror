(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('WeatherFactory', WeatherFactory);

  /** @ngInject */
  function WeatherFactory(
    $http,
    $rootScope,
    $timeout
  ) {

    var vm = this;

    vm.init = init;
    vm.getWeatherIcon = getWeatherIcon;

    return vm;

    function init() {
      getCurrentWeather();
      getWeatherForecast();
    }

    function getCurrentWeather() {
      $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather',
        params: {
          id: '2753355',
          APPID: 'ea16300b41c6ef08e94267b0c6806f15',
          units: 'metric'
        }
      })
      .then(function successCallback(response) {
        // Adding some additional data
        response.data.icon = getWeatherIcon(response.data.weather[0].main);
        response.data.sunset = true;
        response.data.sunrise = true;

        // Check if the sunset has allready happened
        if(moment.unix(response.data.sys.sunset).isBefore(moment())) {
          response.data.sunrise = false;
          response.data.sunset = moment.unix(response.data.sys.sunset).format('HH:mm');
        } else {
          response.data.sunset = false;
          response.data.sunrise = moment.unix(response.data.sys.sunrise).format('HH:mm');
        }

        $rootScope.$broadcast('current-weather', {weather: response.data});
      }, function errorCallback(response) {
      });

      // Update the current weather once every 30 minutes
      $timeout(getCurrentWeather, 1000 * 60 * 30);
    }

    function getWeatherForecast() {
      $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
        params: {
          id: '2753355',
          APPID: 'ea16300b41c6ef08e94267b0c6806f15',
          units: 'metric',
          cnt: '5'
        }
      })
      .then(function successCallback(response) {
        // Adding some additional data
        _.each(response.data.list, function(forecast) {
          forecast.icon = getWeatherIcon(forecast.weather[0].main);
          forecast.day = moment.unix(forecast.dt).format('dd');
        });

        $rootScope.$broadcast('weather-forecast', {weather: response.data});
      }, function errorCallback(response) {
      });

      // Get the forecast once every 4 hours
      $timeout(getWeatherForecast, 1000 * 60 * 60 * 4);
    }

    function getWeatherIcon(description) {
      var icon = '';
      switch (description) {
        case "Drizzle":
          icon = 'drizzle';
          break;
        case "Rain":
          icon = 'rain';
          break;
        case "Clouds":
          icon = 'clouded';
          break;
        case "Clear":
          icon = 'sunny';
          break;
        default:
          icon = 'sunny';
      }

      return icon;
    }

  }
}());

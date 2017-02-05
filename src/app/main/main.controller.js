(function() {
  'use strict';

  angular
    .module('mirror')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(
    $http,
    $timeout,
    $scope,
    DateTimeFactory,
    AnnyangFactory,
    WeatherFactory,
    QuotesFactory,
    GithubFactory,
    TrelloFactory,
    MAX_INACTIVE_TIME
  ) {

    var vm = this;

    vm.screen_brightness = 0;

    var inactive_timer = MAX_INACTIVE_TIME;

    function checkForInactivity() {
      if(inactive_timer === MAX_INACTIVE_TIME * 0.30) {
        updateScreenBrightness(2);
        inactive_timer -= 1000;
        $timeout(checkForInactivity, 1000);
      } else if (inactive_timer === 0) {
        updateScreenBrightness(0);
      } else {
        inactive_timer -= 1000;
        $timeout(checkForInactivity, 1000);
      }
    }

    checkForInactivity();

    // Let's load some shit shall we?
    $timeout(GithubFactory.init, 1000 * 1);
    $timeout(DateTimeFactory.init, 1000 * 2);
    $timeout(QuotesFactory.init, 1009 * 3);
    $timeout(WeatherFactory.init, 1000 * 5);
    $timeout(TrelloFactory.init, 1000 * 10);

    $scope.$on('user-said', function(event, response) {
      vm.userSaid = response.phrase;
    });

    AnnyangFactory.init();

    $scope.$on('brightness', function(event , data) {
      if(data.brightness >= 3) {
        inactive_timer = MAX_INACTIVE_TIME;
      } else if (data.brightness === 0) {
        inactive_timer = 0;
      }
      updateScreenBrightness(data.brightness);
    });

    function updateScreenBrightness(brightness) {
      vm.screen_brightness = brightness;
    }



  }
})();

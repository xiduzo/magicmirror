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

    vm.screen_brightness = 10;
    vm.userSaid = null;

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
    $timeout(DateTimeFactory.init, 1000 * 1);
    $timeout(WeatherFactory.init, 1000 * 5);
    $timeout(GithubFactory.init, 1000 * 5);
    $timeout(QuotesFactory.init, 1009 * 10);
    $timeout(TrelloFactory.init, 1000 * 15);

    $scope.$on('brightness', function(event , data) {
      if(data.brightness >= 3) {
        inactive_timer = MAX_INACTIVE_TIME;
        checkForInactivity();
      } else if (data.brightness === 0) {
        inactive_timer = 0;
      }
      updateScreenBrightness(data.brightness);
    });

    $scope.$on('speach', function(event, data) {
      vm.userSaid = data.speach[0];
    });

    function updateScreenBrightness(brightness) {
      vm.screen_brightness = brightness;
    }



  }
})();

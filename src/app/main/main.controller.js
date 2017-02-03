(function() {
  'use strict';

  angular
    .module('mirror')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(
    $timeout,
    $scope,
    DateTimeFactory,
    Annyang,
    WeatherFactory,
    QuotesFactory,
    TrelloModuleFactory,
    MAX_INACTIVE_TIME
  ) {

    var vm = this;

    vm.screen_brightness = 10;

    // If inactive for 5 minutes, shutdown the screen
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
    $timeout(QuotesFactory.init, 100);
    $timeout(WeatherFactory.init, 1000);
    $timeout(DateTimeFactory.init, 1000);
    $timeout(TrelloModuleFactory.init, 2000);

    $scope.$on('user-said', function(event, response) {
      vm.userSaid = response.phrase;
    });

    // Annyang.init();
    //
    function updateScreenBrightness(brightness) {
      vm.screen_brightness = brightness;
    }



  }
})();

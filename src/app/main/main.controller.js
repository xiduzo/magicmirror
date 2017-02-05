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
    Annyang,
    WeatherFactory,
    QuotesFactory,
    TrelloModuleFactory,
    MAX_INACTIVE_TIME
  ) {

    var vm = this;

    vm.screen_brightness = 10;

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

    $http({
      method: 'GET',
      url: 'https://api.github.com/repos/xiduzo/magicmirror/git/refs/heads/master'
    })
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      // $log.error(response);
    });

    // Let's load some shit shall we?
    $timeout(WeatherFactory.init, 1000 * 3);
    $timeout(DateTimeFactory.init, 1000 * 3);
    $timeout(QuotesFactory.init, 1009 * 3);
    $timeout(TrelloModuleFactory.init, 1000 * 3);

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

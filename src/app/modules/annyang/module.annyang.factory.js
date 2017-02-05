(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('AnnyangFactory', AnnyangFactory);

  /** @ngInject */
  function AnnyangFactory(
    $rootScope,
    $timeout,
    $log,
    SPEECH_VOICE
  ) {

    var vm = this;

    vm.reminder = null;

    vm.basic_commands = {
      'hallo': wakeUp,
      'slaap': sleep,
    };

    vm.init = init;

    function init() {
      if (annyang) {
        annyang.setLanguage('nl-NL');
        annyang.addCommands(vm.basic_commands);
        annyang.start();

        annyang.addCallback('result', function(userSaid, commandText, phrases) {
          $log.log(userSaid);
          $log.log(commandText);
          $log.log(phrases);
        });
      } else {
        $log.error('Annyang not found');
      }
    }

    function wakeUp() {
      $rootScope.$broadcast('brightness', {brightness: 10});
      // annyang.abort();
      // responsiveVoice.speak('hallo sander', SPEECH_VOICE);
      // $timeout(function() {
      //   annyang.start();
      // }, 1000);
    }

    function sleep() {
      $rootScope.$broadcast('brightness', {brightness: 0});
    }

    return vm;

  }
}());

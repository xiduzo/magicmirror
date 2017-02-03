(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('Annyang', Annyang);

  /** @ngInject */
  function Annyang(
    $rootScope,
    $timeout,
    $log,
    SPEECH_VOICE
  ) {

    var vm = this;

    vm.reminder = null;

    vm.basic_commands = {
      'hallo': sayHello
    };

    vm.init = init;

    function init() {
      if (annyang) {
        annyang.setLanguage('nl-NL');

        setCommands();

        annyang.addCallback('result', function(userSaid, commandText, phrases) {
          $log.log(userSaid);
          $log.log(phrases);
          $rootScope.$broadcast('user-said', {phrase: userSaid[0]});
        });

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
      }
    }

    function setCommands() {
      // Add our commands to annyang
      annyang.addCommands(vm.basic_commands);
    }

    function sayHello() {
      annyang.abort();
      responsiveVoice.speak('hallo sander', SPEECH_VOICE);
      $timeout(function() {
        annyang.start();
      }, 1000);
    }

    return vm;

  }
}());

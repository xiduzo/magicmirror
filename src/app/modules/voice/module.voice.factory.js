(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('VoiceFactory', VoiceFactory);

  /** @ngInject */
  function VoiceFactory(
    $rootScope,
    $timeout,
    $log
  ) {

    var vm = this;

    vm.init = init;

    var artyomCommands = [
        //Simple Command Example
        {
            indexes: ['wake up'],
            action : function(){
              $rootScope.$broadcast('brightness', {brightness: 10});
              artyom.obey();
              // artyom.say("How are you? My name is Artyom.",{
              //   onStart: function(){
              //     artyom.dontObey();
              //   },
              //   onEnd: function(){
              //     $timeout(artyom.obey, 1000);
              //   }
              // });
            }
        },
        {
            indexes: ['sleep'],
            action: function() {
              $rootScope.$broadcast('brightness', {brightness: 0});
              artyom.dontObey();
            }
        },
        //Smart Command Example
        {
            indexes: ['pronounce * please'],
            smart:true,
            action : function(i,wildcard,recognized_text){
                $log.log("Recognized : " + recognized_text,"Wildcard : "+wildcard);
                artyom.say(wildcard);
            }
        }
    ];

    function init() {
      artyom.fatality();
      artyom.addCommands(artyomCommands);
      artyom.initialize({
        lang:"en-GB",
        continuous: true,
        listen: true,
        debug: true,
        speed: 1,
        obeyKeyword: "wake up"
      });
      artyom.dontObey();
      $timeout(garbageCollection, 1000 * 60 * 5);
    }

    function garbageCollection() {
      var totalObjectsInCollection = artyom.getGarbageCollection().length;
      // Clear now that there are no more text to say.
      artyom.clearGarbageCollection();
      $log.log("The garbage collection has been cleaned. "+totalObjectsInCollection+" Items found. Now there are " + artyom.getGarbageCollection().length);
      $timeout(garbageCollection, 1000 * 60 * 5);
    }

    return vm;

  }
}());

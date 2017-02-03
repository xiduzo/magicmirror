(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('DateTimeFactory', DateTimeFactory);

  /** @ngInject */
  function DateTimeFactory(
    $rootScope,
    $timeout
  ) {

    var vm = this;

    vm.init = init;

    function init() {
      getCurrentTime();
      getCurrentDate();
    }

    function getCurrentTime() {
      var time = moment().format('HH:mm');
      $rootScope.$broadcast('time', {time: time});

      if(moment().hour() === 0 && moment().minute() === 0 && moment().second() <= 0) {
        getCurrentDate();
      }

      $timeout(getCurrentTime, 1000);
    }

    function getCurrentDate() {
      var date = moment().format('dddd, d MMMM YYYY');
      $rootScope.$broadcast('date', {date: date});
    }

    return vm;

  }
}());

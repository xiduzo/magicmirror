(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('DateTime', DateTime);

  /** @ngInject */
  function DateTime(
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
      var date = moment().format('dddd, DD MMMM YYYY');
      $rootScope.$broadcast('date', {date: date});
    }

    return vm;

  }
}());

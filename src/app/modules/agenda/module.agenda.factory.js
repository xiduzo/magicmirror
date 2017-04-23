(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('Agenda', Agenda);

  /** @ngInject */
  function Agenda(
    $log,
    $http,
    $rootScope,
    $timeout,
    HOST
  ) {

    var vm = this;

    vm.init = init;

    var CALENDARS = [
      'https://calendar.google.com/calendar/ical/gameshit37%40gmail.com/private-59691a9841dba6a0c7c3d2605b2b7a46/basic.ics',
      'https://calendar.google.com/calendar/ical/nl.dutch%23holiday%40group.v.calendar.google.com/public/basic.ics',
      'https://calendar.google.com/calendar/ical/mka7ogaifjrbdudfoov6bvq4isu8jcms%40import.calendar.google.com/public/basic.ics'
    ];

    return vm;


    function init() {
      getGoogleCalendarData(CALENDARS);
    }

    function getGoogleCalendarData(calendars) {
      $http({
        method: 'GET',
        url: HOST + 'assets/agenda/getCalendarData.php',
        params: {
          calendars: angular.toJson(calendars)
        }
      })
      .then(function(response) {
        $rootScope.$broadcast('agenda', {agendas: response.data});
      })
      .catch(function(response) {
        $log.error(response);
      });

      // Update this once every 10 minutes
      $timeout(function() {
        getGoogleCalendarData(CALENDARS);
      }, 1000 * 60 * 10);
    }

  }
}());

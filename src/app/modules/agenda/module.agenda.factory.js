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
    vm.getGoogleCalendarData = getGoogleCalendarData;

    return vm;

    function init() {
      getGoogleCalendarData();
    }

    function getGoogleCalendarData() {
      $http({
        method: 'GET',
        url: HOST + 'assets/agenda/getCalendarData.php',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(function(response) {
        $rootScope.$broadcast('agenda', {agenda: response.data});
      })
      .catch(function(response) {
        $log.error(response);
      });

      // Update this once every 10 minutes
      $timeout(getGoogleCalendarData, 1000 * 60 * 10);
    }

  }
}());

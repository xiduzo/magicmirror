(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('AgendaModuleController', AgendaModuleController);

  /** @ngInject */
  function AgendaModuleController(
    $log,
    $scope,
    ical
  ) {

    var vm = this;

    vm.agendaItems = [];

    $scope.$on('agenda', function(event, response) {
      createAgendaItemsFromIcalData(response.agenda);
    });

    function fullNumber(number) {
      if(number < 10) {
        number = '0'+number;
      }

      return number;
    }

    function createAgendaItemsFromIcalData(data) {
      // First clear the old agenda items
      vm.agendaItems = [];
      var parsedData = ICAL.parse(data);
      var component = new ICAL.Component(parsedData);
      var events = component.getAllSubcomponents("vevent");

      // Filter all the events that are in the past
      events = _.filter(events, function(event) {
        var timezone = event.getFirstPropertyValue('dtstart').timezone;
        var start = event.getFirstPropertyValue('dtstart')._time;

        start = ''+fullNumber(start.year)+fullNumber(start.month)+fullNumber(start.day)+'T'+fullNumber(start.hour)+fullNumber(start.minute)+fullNumber(start.second)+timezone;
        event.start = start;

        return moment().isSameOrBefore(moment(start), 'hour');
      });

      _.each(events, function(event) {
        var stringCutter = ',';
        vm.agendaItems.push({
          title: event.getFirstPropertyValue('summary'),
          description: event.getFirstPropertyValue('description'),
          location: /(.*?)\,/.exec(event.getFirstPropertyValue('location')),
          start: event.start,
        });
      });

    }


  }
}());

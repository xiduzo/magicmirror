(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('AgendaModuleController', AgendaModuleController);

  /** @ngInject */
  function AgendaModuleController(
    $log,
    $scope
  ) {

    var vm = this;

    vm.agendaItems = [];

    $scope.$on('agenda', function(event, response) {
      // First clear the old agenda items
      vm.agendaItems = [];

      // Now fix all the calendar data
      _.each(response.agendas, function(agendaData) {
        createAgendaItemsFromIcalData(agendaData);
      });
    });

    function fullNumber(number) {
      if(number < 10) {
        number = '0'+number;
      }

      return number;
    }

    function getEventIcon(event) {
      var icon;

      switch (event) {
        case 'test':
          icon = 'icon2';
          break;
        default:
          icon = 'icon';
      }

      return icon;
    }

    function createAgendaItemsFromIcalData(data) {
      var parsedData = ICAL.parse(data);
      var component = new ICAL.Component(parsedData);
      $log.log(component);
      var events = component.getAllSubcomponents("vevent");

      // Filter all the events that are in the past
      events = _.filter(events, function(event) {
        var timezone = event.getFirstPropertyValue('dtstart').timezone;
        var start = event.getFirstPropertyValue('dtstart')._time;
        var dateTime = '';

        dateTime += fullNumber(start.year);
        dateTime += fullNumber(start.month);
        dateTime += fullNumber(start.day);
        dateTime += 'T';
        dateTime += fullNumber(start.hour);
        dateTime += fullNumber(start.minute);
        dateTime += fullNumber(start.second);
        dateTime += angular.isDefined(timezone) ? timezone : '';

        event.start = dateTime;

        // Only return events that are in the future
        return (moment().isSameOrBefore(moment(event.start), 'hour') && moment(event.start).isSameOrBefore(moment().add(6, 'weeks'), 'day'));
      });

      _.each(events, function(event) {

        // Do not add duplicated events crossed over multiple agenda's
        if(_.findWhere(vm.agendaItems, { title: event.getFirstPropertyValue('summary')})) {
          return false;
        }

        vm.agendaItems.push({
          icon: getEventIcon(),
          title: event.getFirstPropertyValue('summary'),
          description: event.getFirstPropertyValue('description'),
          location: /(.*?)\,/.exec(event.getFirstPropertyValue('location')),
          start: event.start
        });
      });

    }


  }
}());

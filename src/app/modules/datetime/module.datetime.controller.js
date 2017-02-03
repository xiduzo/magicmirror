(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('DateTimeModuleController', DateTimeModuleController);

  /** @ngInject */
  function DateTimeModuleController(
    $scope
  ) {

    var vm = this;

    $scope.$on('time', function(event, response) {
      vm.time = response.time;
    });

    $scope.$on('date', function(event, response) {
      vm.date = response.date;
    });

  }
}());

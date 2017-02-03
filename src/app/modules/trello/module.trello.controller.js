(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('TrelloModuleController', TrelloModuleController);

  /** @ngInject */
  function TrelloModuleController(
    $scope
  ) {

    var vm = this;

    $scope.$on('lists', function(event, response) {
      vm.lists = response.lists;
    });

  }
}());

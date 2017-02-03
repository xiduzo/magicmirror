(function () {
  'use strict';

  angular
    .module('mirror')
    .controller('QuotesModuleController', QuotesModuleController);

  /** @ngInject */
  function QuotesModuleController(
    $scope
  ) {

    var vm = this;

    $scope.$on('quote', function(event, response) {
      vm.quote = response.quote;
    });

  }
}());

(function () {
  'use strict';

  angular
    .module('mirror')
    .directive('quotesModule', quotesModule);

  /** @ngInject */
  function quotesModule() {

    return {
      restrict: 'E',
      templateUrl: 'app/modules/quotes/module.quotes.html',
      controller: 'QuotesModuleController',
      controllerAs: 'quotes',
      replace: true,
      bindToController: true,
      scope: {
        // type: '@type',
        // amount: '@amount',
      }
    };

  }

}());

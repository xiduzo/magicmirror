(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('Quotes', Quotes);

  /** @ngInject */
  function Quotes(
    $log,
    $http,
    $rootScope,
    $timeout
  ) {

    var vm = this;

    vm.init = init;

    return vm;

    function init() {
      getRandomQuote();
    }

    function getRandomQuote() {
      $http({
        method: 'GET',
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
      .then(function successCallback(response) {
        $rootScope.$broadcast('quote', {quote: response.data[0].content});
      }, function errorCallback(response) {
        $log.error(response);
      });

      // Get a random quote every hour
      $timeout(getRandomQuote, 1000 * 60 * 60);
    }

  }
}());

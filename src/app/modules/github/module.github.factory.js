(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('Github', Github);

  /** @ngInject */
  function Github(
    $http,
    $timeout
  ) {

    var vm = this;

    vm.init = init;

    var latestGitHash = null;

    function init() {
      getLatestGitHash();
    }

    function getLatestGitHash() {
      $http({
        method: 'GET',
        url: 'https://api.github.com/repos/xiduzo/magicmirror/git/refs/heads/master'
      })
      .then(function successCallback(response) {
        compareHash(response.data.object.sha);
      }, function errorCallback(response) {
        // $log.error(response);
      });
    }

    function compareHash(hash) {
      if(latestGitHash === null) {
        latestGitHash = hash;
      } else if (hash != latestGitHash) {
        location.reload();
      }
      console.log(latestGitHash);
      // Check for a update every 10 minutes
      $timeout(getLatestGitHash, 1000 * 5);
    }

    return vm;

  }
}());

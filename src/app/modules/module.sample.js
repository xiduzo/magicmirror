(function () {
  'use strict';

  angular
    .module('mirror')
    .factory('Sample', Sample);

  /** @ngInject */
  function Sample(
  ) {

    var vm = this;

    vm.init = init;

    function init() {

    }

    return vm;

  }
}());

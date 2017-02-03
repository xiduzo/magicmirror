/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('mirror')

    .filter('temperature', function() {
      return function(number) {
        return (Math.round( number * 10 ) / 10).toFixed(1);
      };
    })

    .filter('fromNow', function() {
      return function(dateTime) {
        return moment(dateTime).fromNow();
      };
    })

    ;

})();

/* global moment:false */
(function() {
  'use strict';

  angular
    .module('mirror')
    .constant('SPEECH_VOICE', 'Dutch Female')
    .constant('MAX_INACTIVE_TIME', 1000 * 60 * 15)
    .constant('TRELLO_KEY', '85ea9af753540fb15c161d5eedd67a49')
    .constant('TRELLO_SECRET', '92b46d2d43997521d21894e6f88b843ddae5d903163d813356cfa7b376a85e2b')
    .constant('TRELLO_BOARD', '5893b800a7157f308b549681')
    ;

})();

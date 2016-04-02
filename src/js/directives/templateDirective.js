(function() {
  'use strict';

  angular
    .module(_MODULE)
    .directive('templateDirective', templateDirective);

  templateDirective.$inject = [
    '$log'
  ];

  function templateDirective($log) {
    function link(scope, element, attrs) {
      // code here
    }

    var directive = {
      restrict : 'E',
      link     : link
    };

    return directive;
  }
  
})();
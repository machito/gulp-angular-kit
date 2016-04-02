const _MODULE = 'wmi';

(function() {
  'use strict';

  // app initialize
  angular
    .module(_MODULE, [
      'ngRoute',      // lets us have inner views
      'ngAnimate',    // lets us use built-in animations
      'ngSanitize',   // lets us use ng-bind-html in templates to render HTML
      'ui.bootstrap'  // lets us have access to angular ui bootstrap directives
  ]);

  // app constants
  angular
    .module(_MODULE)
    .constant('CONFIG', {
      apiBaseUrl : 'json/test.json'
  });

  // app routing
  angular
    .module(_MODULE)
    .config(routerConfig);

  routerConfig.$inject = [
    '$routeProvider',
    '$locationProvider'
  ];

  function routerConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl  : 'views/main.html',
        controller   : 'MainCtrl',
        controllerAs : 'vm'
      })
      .otherwise({
        redirectTo  : '/'
    });
  }

})();
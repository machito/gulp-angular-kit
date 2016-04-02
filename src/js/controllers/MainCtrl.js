(function() {
  'use strict';

  angular
    .module(_MODULE)
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [
    '$log',
    'CONFIG',
    'DataFactory',
    'DataService'
  ];

  function MainCtrl($log, CONFIG, DataFactory, DataService) {
    var vm = this;
    var ng = angular;

    /**
     * @public
     * @desc used for public functions inside view
     */
    vm.fn = {
      alertMe: alertMe
    };

    /**
     * @public
     * @desc used for public properties inside view
     */
    vm.prop = {
      loading: false
    };

    /**
     * @public
     * @desc used for json retrieved data for view
     */
    vm.data = {};

    /**
     * @public
     */
    function alertMe(name) {
      alert(`Hello ${name}`);
    }

    /**
     * @private
     */
    function getData() {
      var url = CONFIG.apiBaseUrl;

      DataService.getData(url, function(success, data) {
        if (success) {
          vm.data = data;
        } else {
          $log.warn(`DataService Error: ${data}`);
        }
      });
    }

    /**
     * @private
     * @desc initializes the app
     */
    function init() {
      $log.debug('MainCtrl initialized');
      getData();
    }

    // initialize
    init();
  }

})();
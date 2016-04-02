(function() {
  'use strict';

  angular
    .module(_MODULE)
    .factory('DataFactory', DataFactory);

  DataFactory.$inject = [
    '$log'
  ];

  function DataFactory($log) {
    var dataTable = {};

    /**
     * @public  getData
     */
    function getData(key) {
      return dataTable[key];
    }

    /**
     * @public  setData
     */
    function setData(key, val) {
      dataTable[key] = val;
    }

    /**
     * @public
     * @desc public methods
     */
    var factory = {
      getData : getData,
      setData : setData
    };

    return factory;
  }
  
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    //appController.$inject = ['$state', 'routerHelper'];

    /* @ngInject */
    function AppController() { //$state, routerHelper
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'appController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
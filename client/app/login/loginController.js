(function () {
    'use strict';
     angular
        .module('login')
        .controller('loginController', loginController);

    loginController.$inject = ['$location','loginservice'];

    /* @ngInject */
    function loginController($location,loginservice) {
        /* jshint validthis: true */
        var vm = this;
        vm.users = [];
        vm.currentUser = '';
        vm.title = 'Trader Desktop App - User login';
            vm.submitted =  false;
        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            return getUsers().then(function () {
                console.log("successfully done !!")
            });
        }

        function getUsers() {
            return loginservice.getUsers().then(function(data) {
                vm.users = data;
                return vm.users;
            });
        }
        vm.authenticateUser = function(user,formValid){
            if(formValid.$valid){
                $location.url('/dashboard/'+user.id);
            }else{
                formValid.submitted = true;
            }

        };
    }
})();
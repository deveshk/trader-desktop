(function () {
    'use strict';
    console.log("i am in loginservice.module.js");
    angular
        .module('login')
        .factory('loginservice', loginservice);

    loginservice.$inject = ['$http'];

    /* @ngInject */
    function loginservice($http) {
        var service = {
            getUsers: getUsers
        };

        return service;

        ////////////////

        function getUsers() {

            return $http.get('/users')
                .then(getUsersComplete)
                .catch(function(message) {
                   // exception.catcher('XHR Failed for getUsers')(message);
                    $location.url('/');
                });

            function getUsersComplete(data, status, headers, config) {
                console.log(data);
                return data.data;
            }
        }
    }
})();
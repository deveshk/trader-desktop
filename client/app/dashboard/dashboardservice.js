(function () {
    'use strict';
    console.log("i am in dashboardservice.module.js");
    angular
        .module('dashboard')
        .factory('dashboardservice', dashboardservice);

    dashboardservice.$inject = ['$http','$localStorage', '$sessionStorage','$location','OrderEventService'];

    /* @ngInject */


    function dashboardservice($http,$localStorage,$sessionStorage,$location,OrderEventService) {

        var side = ["Buy", "Sell"],
           // symbol="",
            quantity = Math.floor((Math.random() * 100000) + 1),
            limitPrice = Math.floor((Math.random() * 100) + 1),
            userId = $localStorage.userId;

        var service = {
            postOrders: postOrders,
            getOrders: getOrders,
            getUsers: getUsers,
            deleteOrders:deleteAll
        };

        return service;

        ////////////////



        function deleteAll(){
            return $http.delete('/orders')
                .error(function(msg){
                    msg ="Not able to delete data";
                });

        }

        function postOrders($localStorage) {

            return $http.get('/instruments').then(function(ins){
                var data = {
                    "side": side[Math.floor(Math.random() * side.length)],
                    "symbol":ins.data[Math.floor(Math.random() * ins.data.length)].symbol,
                    "quantity": quantity,
                    "limitPrice": limitPrice,
                    "traderId": $localStorage.userId
                };
                return data;
            }).then(function(data){
                return $http.post('/orders',data)
                    .then(getOrders)
                    .catch(function(message) {
                    });
            });

            function postOrdersComplete(data, status, headers, config) {
                console.log(data);
                return data.data;
            }
        }

        function getOrders() {
            return $http.get('/orders')
                .then(getOrdersComplete)
                .catch(function(message) {
                });

            function getOrdersComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getUsers() {
            return $http.get('/users')
                .then(getUsersComplete)
                .catch(function(message) {
                });

            function getUsersComplete(data, status, headers, config) {
                return data.data;
            }
        }
    }
})();
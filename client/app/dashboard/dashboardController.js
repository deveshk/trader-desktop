(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$location','$localStorage', '$sessionStorage', '$fancyModal', 'userId', 'dashboardservice','OrderEventService'];

    /* @ngInject */
    function dashboardController($location,$localStorage, $sessionStorage, $fancyModal, userId, dashboardservice,OrderEventService) {
        /* jshint validthis: true */
        var vm = this;
        vm.users = [];
        vm.orders=[];
        vm.username = "";
        vm.finalOrders = dashboardservice.getOrders();
        vm.debug="";
        vm.title = 'Trader Desktop App - Dashboard';
        vm.activate = activate;

        activate($localStorage, $sessionStorage, dashboardservice, userId,OrderEventService);

        ////////////////

        function activate($localStorage, $sessionStorage, dashboardservice, userId,OrderEventService) {

                return getUsersName($localStorage, $sessionStorage, userId,OrderEventService).then(function () {

                    return dashboardservice.getOrders().then(function (data) {
                        vm.debug = "orderList from activate";
                         console.log(vm.debug);
                        vm.finalOrders = data;
                        return vm.finalOrders;
                    })
                });
        }

        function getUsersName($localStorage, $sessionStorage, userId) {
            return dashboardservice.getUsers().then(function (data) {
                vm.users = data;
                var query = userId;
                for (var key in data) {
                    if (data[key]['id'].indexOf(query) > -1) {
                        vm.username = data[key]['name'];
                    }
                }
                    vm.$storage = $localStorage.$default({
                        userId: userId
                    });
                return vm.username;
            });
        }

        vm.displayOrderForm = function () {
            $fancyModal.open({

                controller: ['$scope','$localStorage', '$sessionStorage', 'dashboardservice','OrderEventService'  ,function ($scope,$localStorage, $sessionStorage, dashboardservice,OrderEventService) {

                    var vmf = $scope;
                    vmf.postOrder = function (orderNum) {
                        for (var i = 0; i < orderNum; ++i) {
                            dashboardservice.postOrders($localStorage).then(function (data) {
                                vm.finalOrders  = data;
                                $fancyModal.close();
                            });
                        }
                    }
                }],
                themeClass: 'fancymodal-theme-classic',
                templateUrl: 'dashboard/createOrder.html'
            });
        };

        function socket(data) {
            vm.finalOrders = data;
            OrderEventService.listen('orderCreatedEvent', function(orders) {
                vm.finalOrders.push(orders);

            });
            OrderEventService.listen('placementCreatedEvent', function (placement) {
                var finalOrders = _.find(vm.finalOrders, {id: placement.orderId});
                if (finalOrders.id == placement.orderId) {
                    finalOrders.quantityPlaced +=  placement.quantityPlaced;
                    finalOrders.status = placement.status;
                }
            });


            OrderEventService.listen('executionCreatedEvent', function (execution) {
                var finalOrders = _.find(vm.finalOrders, {id: execution.orderId});
                if (finalOrders.id == execution.orderId) {
                    finalOrders.quantityExecuted += execution.quantityExecuted;
                    finalOrders.status = execution.status;
                }
            });

            OrderEventService.listen("allOrdersDeletedEvent", function () {
                vm.finalOrders = [];
            });

        };

        vm.deleteAllOrders = function () {
            return dashboardservice.deleteOrders().then(function (data) {
                vm.finalOrders = [];
                return vm.finalOrders;
            })
        };
        vm.refreshAllOrders = function () {
            return dashboardservice.getOrders().then(function (data) {
                vm.finalOrders = data;
                return vm.finalOrders;
            })
        };

        vm.signOut = function() {
            console.log("i m here");
            delete $localStorage.userId;
            delete $localStorage.username;
            $location.url('/');
        };


        socket(vm.finalOrders);

    }
})();
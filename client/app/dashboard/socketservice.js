(function () {
    'use strict';

    angular.module('dashboard')
        .factory('OrderEventService', OrderEventService);

    OrderEventService.$inject = ['socketFactory'];
    function OrderEventService(socketFactory) {

        var service = {
            listen: listen
        };
        return service;

        function listen(eventType, callback) {

            var socket = socketFactory({
                ioSocket: io.connect('http://localhost:8080')
            });

            return socket.on(eventType, callback);


        }
    }

})();
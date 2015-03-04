(function(){
    'use strict'
    var routerApp = angular.module('app');
    console.log("i am in router");

    routerApp.config(routerHelper);
    routerHelper.$inject =['$fancyModalProvider','$stateProvider', '$urlRouterProvider'];
    function routerHelper($fancyModalProvider,$stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('login', {
                url: '/',
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })

        /*      // nested list with custom controller
         .state('home.list', {
         url: '/list',
         templateUrl: 'partial-home-list.html',
         controller: function($scope) {
         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
         }
         })

         // nested list with just some random string data
         .state('home.paragraph', {
         url: '/paragraph',
         template: 'I could sure use a drink right now.'
         })

         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
         .state('about', {
         url: '/about',
         views: {
         '': { templateUrl: 'partial-about.html' },
         'columnOne@about': { template: 'Look I am a column!' },
         'columnTwo@about': {
         templateUrl: 'table-data.html',
         controller: 'scotchController'
         }
         }*/

        .state('dashboard', {
         url: '/dashboard/:userId',
         templateUrl: 'dashboard/dashboard.html',
         controller: 'dashboardController',
         controllerAs: 'vm',
                resolve:{
                    userId: ['$stateParams', function($stateParams){
                        console.log("i m in resolve>> " + $stateParams.userId );
                        return $stateParams.userId;
                    }]
                }
         })


        //  });

    }
})();




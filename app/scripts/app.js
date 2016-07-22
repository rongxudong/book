'use strict';
/**
 * @ngdoc overview
 * @name bookApp
 * @description
 * # bookApp
 *
 * Main module of the application.
 */
angular
    .module('bookApp', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'LocalStorageModule'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: './views/user/user.html',
                controller: 'UserCtrl'
            })
            .when('/main', {
                templateUrl: './views/main/main.html',
                controller: 'MainCtrl'
            })
            .when('/list', {
                templateUrl: './views/list/list.html',
                controller: 'ListCtrl'
            })
            .otherwise({
                redirectTo: '/main'
            });
     })
    .config(function($compileProvider){
        //链接白名单
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    })
    .run(function (sessionService, $rootScope) {
        sessionService.checkLogin();
        
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            //路由改变时的回调
        });
    })
;

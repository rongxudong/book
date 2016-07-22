'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the circleApp
 */
angular.module('bookApp')
    .controller('LoginCtrl', function ($scope, resourcePool, sessionService) {
        var SessionResource = resourcePool.session;
        $scope.submit = function () {
            SessionResource.new({
                username: $scope.user.username,
                password: $scope.user.password
            }, function (data) {
                sessionService.setLoginStatus(true, data.loginUser);
                $scope.loginError = '';
            }, function () {
                sessionService.setLoginStatus(false);
                $scope.loginError = '用户名/密码不正确'
            })
        }
    });

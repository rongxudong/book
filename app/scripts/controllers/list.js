'use strict';
/**
 * @ngdoc function
 * @name bookApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
    .controller('ListCtrl', function ($scope) {
        $scope.books = [
            {
                "id":"1",
                "name":"1",
                "author":"1",
                "price":"1"
            },
            {
                "id":"2",
                "name":"2",
                "author":"2",
                "price":"2"
            }
        ]
    });

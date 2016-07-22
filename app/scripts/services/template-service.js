'use strict';

/**
 * @ngdoc service
 * @name bookApp.templateService
 * @description
 * # templateService 提供一个获取模板的简便方式
 * Factory in the bookApp.
 */
angular.module('bookApp')
    .factory('templateService', function ($http, $templateCache) {
        return {
            get: function (templateUrl) {
                return $http.get(templateUrl, {cache: $templateCache});
            }
        };
    });

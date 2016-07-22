'use strict';

/**
 * @ngdoc service
 * @name bookApp.resources
 * @description
 * # resources 资源池
 * Factory in the bookApp.
 */
angular.module('bookApp')
    .factory('resourcePool', function (resourceService) {
        var create = resourceService.create;//do not modify this line.it is used for generator
        return {
            session: create('/session'),
            user: create('/user/{id}'),
            menu: create('/menus/{id}/{perm}')
            //do not delete this line.it is used for generator to find this line
        }
    });

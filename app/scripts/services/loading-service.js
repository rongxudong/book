'use strict';

/**
 * @ngdoc service
 * @name bookApp.loadingService
 * @description
 * # loadingService 通讯提示服务
 * Factory in the bookApp.
 */
angular.module('bookApp')
    .factory('loadingService', function (rootDataService) {
        var ROOT_loadingStatData = rootDataService.data('ROOT_loadingStatData')
        return {
            show: function (flag) {
                flag = angular.isUndefined(flag) ? true : flag;
                ROOT_loadingStatData.set('showLoading', flag);
            }
        }
    });

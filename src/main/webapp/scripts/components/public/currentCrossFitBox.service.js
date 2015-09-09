'use strict';

angular.module('crossfitApp')
    .factory('CurrentCrossFitBox', function ($resource, DateUtils) {
        return $resource('/public/currentCrossFitBox', {}, {
            'getCurrent': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    });

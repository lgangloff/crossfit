'use strict';

angular.module('crossfitApp')
    .factory('CrossFitBox', function ($resource, DateUtils) {
        return $resource('api/crossFitBoxs/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });

'use strict';

angular.module('crossfitApp')
    .factory('TimeZone', function ($resource, DateUtils) {
        return $resource('/public/timezone', {}, {
            'query': {
                method: 'GET',
                isArray: true
            }
        });
    });

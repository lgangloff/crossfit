'use strict';

angular.module('crossfitApp')
    .factory('TimeSlot', function ($resource, DateUtils) {
        return $resource('use/timeSlots/:id', {}, {
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

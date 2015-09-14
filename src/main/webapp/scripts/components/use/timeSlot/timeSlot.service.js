'use strict';

angular.module('crossfitApp')
    .factory('TimeSlot', function ($resource, DateUtils) {
        return $resource('use/timeSlots/:id', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
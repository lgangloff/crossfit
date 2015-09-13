'use strict';

angular.module('crossfitApp')
    .factory('TimeSlotEvent', function ($resource, DateUtils) {
        return $resource('use/timeSlotsAsEvent', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
'use strict';

angular.module('crossfitApp')
    .factory('TimeSlotEvent', function ($resource, DateUtils) {
        return $resource('manage/timeSlotsAsEvent', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });

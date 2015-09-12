'use strict';

angular.module('crossfitApp')
    .factory('TimeSlotEvent', function ($resource, DateUtils) {
        return $resource('manage/event', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });

'use strict';

angular.module('crossfitApp')
    .factory('TimeSlot', function ($resource, DateUtils) {
        return $resource('use/timeSlots/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'booking': {
                method: 'POST',
                url: 'use/timeSlots/:id/booking',
                isArray: false,
				params: {
	                'id': '@id'
	            },
	            transformRequest: function (data) {
                    return data.date;
                }
            }
        });
    });
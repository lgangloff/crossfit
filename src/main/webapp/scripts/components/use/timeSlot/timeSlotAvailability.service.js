'use strict';

angular.module('crossfitApp')
    .factory('Availability', function ($resource, DateUtils) {
        return $resource('use/timeSlots/:id/availability', {}, {
            'availability': { 	method: 'GET', 
	            				isArray: false}
        });
    });

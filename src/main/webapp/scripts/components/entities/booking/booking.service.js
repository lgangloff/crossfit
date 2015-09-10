'use strict';

angular.module('crossfitApp')
    .factory('Booking', function ($resource, DateUtils) {
        return $resource('api/bookings/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.startAt = DateUtils.convertDateTimeFromServer(data.startAt);
                    data.endAt = DateUtils.convertDateTimeFromServer(data.endAt);
                    data.createdDate = DateUtils.convertDateTimeFromServer(data.createdDate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });

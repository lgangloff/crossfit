'use strict';

angular.module('crossfitApp')
    .factory('Booking', function ($resource, DateUtils) {
        return $resource('use/bookings/:id', {}, {
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
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.startAt = DateUtils.convertLocaleDateTimeToServer(data.startAt);
                    data.endAt = DateUtils.convertLocaleDateTimeToServer(data.endAt);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                	data.startAt = DateUtils.convertDateTimeFromServer(data.startAt);
                    data.endAt = DateUtils.convertDateTimeFromServer(data.endAt);
                    return angular.toJson(data);
                }
            }
        });
    });

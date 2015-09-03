'use strict';

angular.module('crossfitApp')
    .factory('Subscription', function ($resource, DateUtils) {
        return $resource('manage/subscriptions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.sickNoteEndDate = DateUtils.convertLocaleDateFromServer(data.sickNoteEndDate);
                    data.subscriptionshipStartDate = DateUtils.convertLocaleDateFromServer(data.subscriptionshipStartDate);
                    data.subscriptionshipEndDate = DateUtils.convertLocaleDateFromServer(data.subscriptionshipEndDate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.sickNoteEndDate = DateUtils.convertLocaleDateToServer(data.sickNoteEndDate);
                    data.subscriptionshipStartDate = DateUtils.convertLocaleDateToServer(data.subscriptionshipStartDate);
                    data.subscriptionshipEndDate = DateUtils.convertLocaleDateToServer(data.subscriptionshipEndDate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.sickNoteEndDate = DateUtils.convertLocaleDateToServer(data.sickNoteEndDate);
                    data.subscriptionshipStartDate = DateUtils.convertLocaleDateToServer(data.subscriptionshipStartDate);
                    data.subscriptionshipEndDate = DateUtils.convertLocaleDateToServer(data.subscriptionshipEndDate);
                    return angular.toJson(data);
                }
            }
        });
    });

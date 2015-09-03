'use strict';

angular.module('crossfitApp')
    .factory('Subscription', function ($resource, DateUtils) {
        return $resource('manage/subscriptions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.subscriptionStartDate = DateUtils.convertLocaleDateFromServer(data.subscriptionStartDate);
                    data.subscriptionEndDate = DateUtils.convertLocaleDateFromServer(data.subscriptionEndDate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.subscriptionStartDate = DateUtils.convertLocaleDateToServer(data.subscriptionStartDate);
                    data.subscriptionEndDate = DateUtils.convertLocaleDateToServer(data.subscriptionEndDate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.subscriptionStartDate = DateUtils.convertLocaleDateToServer(data.subscriptionStartDate);
                    data.subscriptionEndDate = DateUtils.convertLocaleDateToServer(data.subscriptionEndDate);
                    return angular.toJson(data);
                }
            }
        });
    });

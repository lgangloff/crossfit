'use strict';

angular.module('crossfitApp')
    .factory('MembershipType', function ($resource, DateUtils) {
        return $resource('manage/membershipTypes/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });

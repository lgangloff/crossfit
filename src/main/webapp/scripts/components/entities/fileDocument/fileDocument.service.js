'use strict';

angular.module('crossfitApp')
    .factory('FileDocument', function ($resource, DateUtils) {
        return $resource('api/fileDocuments/:id', {}, {
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

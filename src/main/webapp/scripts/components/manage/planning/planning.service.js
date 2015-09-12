'use strict';

angular.module('crossfitApp')
    .factory('Planning', function ($resource, DateUtils) {
        return $resource('manage/planning', {}, {
            'query': { method: 'GET', isArray: false}
        });
    });

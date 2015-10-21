'use strict';

angular.module('crossfitApp')
    .factory('Planning', function ($resource, DateUtils) {
        return $resource('use/planning', {}, {
            'query': { method: 'GET', isArray: false}
        });
    });

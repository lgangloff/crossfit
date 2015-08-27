'use strict';

angular.module('crossfitApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });



'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('use', {
                abstract: true,
                parent: 'site'
            });
    });

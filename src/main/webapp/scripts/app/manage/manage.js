'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('manage', {
                abstract: true,
                parent: 'site'
            });
    });

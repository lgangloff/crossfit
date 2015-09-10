'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider.
            state('memberSettings', {
                parent: 'account',
                url: '/memberSettings',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.member.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/use/member/member-settings.html',
                        controller: 'MemberSettingsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('member');
                        $translatePartialLoader.addPart('level');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
    });

'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('member', {
                parent: 'manage',
                url: '/members',
                data: {
                    roles: ['ROLE_MANAGER'],
                    pageTitle: 'crossfitApp.member.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/manage/member/members.html',
                        controller: 'MemberController'
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
            })
            .state('member.new', {
                parent: 'member',
                url: '/new',
                data: {
                    roles: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/manage/member/member-dialog.html',
                        controller: 'MemberDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {telephonNumber: null, sickNoteEndDate: null, membershipStartDate: new Date(), membershipEndDate: null, level: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('member');
                    })
                }]
            })
    });

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
                                return {user : {langKey: 'fr'},telephonNumber: '+336 ', sickNoteEndDate: null, membershipStartDate: new Date(), membershipEndDate: null, level: 'FOUNDATION', id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('member');
                    })
                }]
            })
            .state('member.edit', {
                parent: 'member',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/manage/member/member-dialog.html',
                        controller: 'MemberDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Member', function(Member) {
                                return Member.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('member.editMembership', {
                parent: 'member',
                url: '/{id}/edit/membership',
                data: {
                    roles: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/manage/member/member-dialog.html',
                        controller: 'MemberDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Member', function(Member) {
                                return Member.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

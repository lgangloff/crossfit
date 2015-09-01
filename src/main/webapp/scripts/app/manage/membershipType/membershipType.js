'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('membershipType', {
                parent: 'manage',
                url: '/membershipTypes',
                data: {
                    roles: ['ROLE_MANAGER'],
                    pageTitle: 'crossfitApp.membershipType.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/manage/membershipType/membershipTypes.html',
                        controller: 'MembershipTypeController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('membershipType');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('membershipType.detail', {
                parent: 'membershipType',
                url: '/membershipType/{id}',
                data: {
                    roles: ['ROLE_MANAGER'],
                    pageTitle: 'crossfitApp.membershipType.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/manage/membershipType/membershipType-detail.html',
                        controller: 'MembershipTypeDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('membershipType');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'MembershipType', function($stateParams, MembershipType) {
                        return MembershipType.get({id : $stateParams.id});
                    }]
                }
            })
            .state('membershipType.new', {
                parent: 'membershipType',
                url: '/new',
                data: {
                    roles: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/manage/membershipType/membershipType-dialog.html',
                        controller: 'MembershipTypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, price: null, openAccess: null, numberOfSession: null, numberOfSessionPerWeek: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('membershipType', null, { reload: true });
                    }, function() {
                        $state.go('membershipType');
                    })
                }]
            })
            .state('membershipType.edit', {
                parent: 'membershipType',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/manage/membershipType/membershipType-dialog.html',
                        controller: 'MembershipTypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['MembershipType', function(MembershipType) {
                                return MembershipType.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('membershipType', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

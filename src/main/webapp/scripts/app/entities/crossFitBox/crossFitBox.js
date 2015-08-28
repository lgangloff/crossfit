'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('crossFitBox', {
                parent: 'entity',
                url: '/crossFitBoxs',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.crossFitBox.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/crossFitBox/crossFitBoxs.html',
                        controller: 'CrossFitBoxController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('crossFitBox');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('crossFitBox.detail', {
                parent: 'entity',
                url: '/crossFitBox/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.crossFitBox.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/crossFitBox/crossFitBox-detail.html',
                        controller: 'CrossFitBoxDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('crossFitBox');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'CrossFitBox', function($stateParams, CrossFitBox) {
                        return CrossFitBox.get({id : $stateParams.id});
                    }]
                }
            })
            .state('crossFitBox.new', {
                parent: 'crossFitBox',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/crossFitBox/crossFitBox-dialog.html',
                        controller: 'CrossFitBoxDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {name: null, website: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('crossFitBox', null, { reload: true });
                    }, function() {
                        $state.go('crossFitBox');
                    })
                }]
            })
            .state('crossFitBox.edit', {
                parent: 'crossFitBox',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/crossFitBox/crossFitBox-dialog.html',
                        controller: 'CrossFitBoxDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['CrossFitBox', function(CrossFitBox) {
                                return CrossFitBox.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('crossFitBox', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

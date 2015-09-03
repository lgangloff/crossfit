'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('subscription', {
                parent: 'entity',
                url: '/subscriptions',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.subscription.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subscription/subscriptions.html',
                        controller: 'SubscriptionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subscription');
                        $translatePartialLoader.addPart('level');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('subscription.detail', {
                parent: 'entity',
                url: '/subscription/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.subscription.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subscription/subscription-detail.html',
                        controller: 'SubscriptionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subscription');
                        $translatePartialLoader.addPart('level');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Subscription', function($stateParams, Subscription) {
                        return Subscription.get({id : $stateParams.id});
                    }]
                }
            })
            .state('subscription.new', {
                parent: 'subscription',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/subscription/subscription-dialog.html',
                        controller: 'SubscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {telephonNumber: null, sickNoteEndDate: null, subscriptionshipStartDate: null, subscriptionshipEndDate: null, level: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('subscription', null, { reload: true });
                    }, function() {
                        $state.go('subscription');
                    })
                }]
            })
            .state('subscription.edit', {
                parent: 'subscription',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/subscription/subscription-dialog.html',
                        controller: 'SubscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Subscription', function(Subscription) {
                                return Subscription.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('subscription', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

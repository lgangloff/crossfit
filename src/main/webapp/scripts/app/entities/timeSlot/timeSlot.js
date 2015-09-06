'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('timeSlot', {
                parent: 'entity',
                url: '/timeSlots',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.timeSlot.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/timeSlot/timeSlots.html',
                        controller: 'TimeSlotController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('timeSlot');
                        $translatePartialLoader.addPart('level');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('timeSlot.detail', {
                parent: 'entity',
                url: '/timeSlot/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.timeSlot.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/timeSlot/timeSlot-detail.html',
                        controller: 'TimeSlotDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('timeSlot');
                        $translatePartialLoader.addPart('level');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'TimeSlot', function($stateParams, TimeSlot) {
                        return TimeSlot.get({id : $stateParams.id});
                    }]
                }
            })
            .state('timeSlot.new', {
                parent: 'timeSlot',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/timeSlot/timeSlot-dialog.html',
                        controller: 'TimeSlotDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {dayOfWeek: null, startTime: null, endTime: null, maxAttendees: null, requiredLevel: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('timeSlot', null, { reload: true });
                    }, function() {
                        $state.go('timeSlot');
                    })
                }]
            })
            .state('timeSlot.edit', {
                parent: 'timeSlot',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/timeSlot/timeSlot-dialog.html',
                        controller: 'TimeSlotDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['TimeSlot', function(TimeSlot) {
                                return TimeSlot.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('timeSlot', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

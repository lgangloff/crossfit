'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('timeSlot', {
                parent: 'use',
                url: '/timeSlots/:startDate/:endDate',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.timeSlot.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/use/timeSlot/timeSlots.html',
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
            .state('timeSlot.subscribe', {
                parent: 'timeSlot',
                url: '/{id}/subscribe/:date',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/use/timeSlot/timeSlot-dialog.html',
                        controller: 'TimeSlotDialogController',
                        size: 'sm',
                        resolve: {
                        	entity: function () {
                                return {id: null, startAt: $stateParams.start, endAt: $stateParams.end, status: null, createdDate: null, createdBy: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('timeSlot', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

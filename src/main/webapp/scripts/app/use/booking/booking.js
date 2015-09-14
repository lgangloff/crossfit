'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('booking', {
                parent: 'use',
                url: '/bookings',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.booking.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/use/booking/bookings.html',
                        controller: 'BookingController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('booking');
                        $translatePartialLoader.addPart('bookingStatus');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('booking.detail', {
                parent: 'use',
                url: '/booking/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.booking.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/use/booking/booking-detail.html',
                        controller: 'BookingDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('booking');
                        $translatePartialLoader.addPart('bookingStatus');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Booking', function($stateParams, Booking) {
                        return Booking.get({id : $stateParams.id});
                    }]
                }
            })
            .state('booking.new', {
                parent: 'booking',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/use/booking/booking-dialog.html',
                        controller: 'BookingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {startAt: null, endAt: null, status: null, createdDate: null, createdBy: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('booking', null, { reload: true });
                    }, function() {
                        $state.go('booking');
                    })
                }]
            })
            .state('booking.edit', {
                parent: 'booking',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/use/booking/booking-dialog.html',
                        controller: 'BookingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Booking', function(Booking) {
                                return Booking.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('booking', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

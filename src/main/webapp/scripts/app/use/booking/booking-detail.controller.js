'use strict';

angular.module('crossfitApp')
    .controller('BookingDetailController', function ($scope, $rootScope, $stateParams, entity, Booking, CrossFitBox, Member) {
        $scope.booking = entity;
        $scope.load = function (id) {
            Booking.get({id: id}, function(result) {
                $scope.booking = result;
            });
        };
        $rootScope.$on('crossfitApp:bookingUpdate', function(event, result) {
            $scope.booking = result;
        });
    });

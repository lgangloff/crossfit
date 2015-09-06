'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotDetailController', function ($scope, $rootScope, $stateParams, entity, TimeSlot, CrossFitBox) {
        $scope.timeSlot = entity;
        $scope.load = function (id) {
            TimeSlot.get({id: id}, function(result) {
                $scope.timeSlot = result;
            });
        };
        $rootScope.$on('crossfitApp:timeSlotUpdate', function(event, result) {
            $scope.timeSlot = result;
        });
    });

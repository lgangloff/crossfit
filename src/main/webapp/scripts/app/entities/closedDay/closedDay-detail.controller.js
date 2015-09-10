'use strict';

angular.module('crossfitApp')
    .controller('ClosedDayDetailController', function ($scope, $rootScope, $stateParams, entity, ClosedDay, CrossFitBox) {
        $scope.closedDay = entity;
        $scope.load = function (id) {
            ClosedDay.get({id: id}, function(result) {
                $scope.closedDay = result;
            });
        };
        $rootScope.$on('crossfitApp:closedDayUpdate', function(event, result) {
            $scope.closedDay = result;
        });
    });

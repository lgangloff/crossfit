'use strict';

angular.module('crossfitApp')
    .controller('MembershipTypeDetailController', function ($scope, $rootScope, $stateParams, entity, MembershipType) {
        $scope.membershipType = entity;
        $scope.load = function (id) {
            MembershipType.get({id: id}, function(result) {
                $scope.membershipType = result;
            });
        };
        $rootScope.$on('crossfitApp:membershipTypeUpdate', function(event, result) {
            $scope.membershipType = result;
        });
    });

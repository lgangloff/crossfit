'use strict';

angular.module('crossfitApp')
    .controller('MemberDetailController', function ($scope, $rootScope, $stateParams, entity, Member, User, CrossFitBox, FileDocument, MembershipType) {
        $scope.member = entity;
        $scope.load = function (id) {
            Member.get({id: id}, function(result) {
                $scope.member = result;
            });
        };
        $rootScope.$on('crossfitApp:memberUpdate', function(event, result) {
            $scope.member = result;
        });
    });

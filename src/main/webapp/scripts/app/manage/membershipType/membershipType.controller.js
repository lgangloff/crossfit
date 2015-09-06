'use strict';

angular.module('crossfitApp')
    .controller('MembershipTypeController', function ($scope, MembershipType) {
        $scope.membershipTypes = [];
        $scope.loadAll = function() {
            MembershipType.query(function(result) {
               $scope.membershipTypes = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            MembershipType.get({id: id}, function(result) {
                $scope.membershipType = angular.copy(result);
                $('#deleteMembershipTypeConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            MembershipType.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteMembershipTypeConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.membershipType = {name: null, price: null, openAccess: null, numberOfSession: null, numberOfSessionPerWeek: null, id: null};
        };
    });

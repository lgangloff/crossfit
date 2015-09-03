'use strict';

angular.module('crossfitApp').controller('MemberDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Member', 'User', 'MembershipType',
        function($scope, $stateParams, $modalInstance, entity, Member, User,MembershipType) {

        $scope.member = entity;
        $scope.membershiptypes = MembershipType.query();
        $scope.load = function(id) {
            Member.get({id : id}, function(result) {
                $scope.member = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:memberUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.member.id != null) {
                Member.update($scope.member, onSaveFinished);
            } else {
                Member.save($scope.member, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

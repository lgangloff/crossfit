'use strict';

angular.module('crossfitApp').controller('MemberDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Member', 'User',
        function($scope, $stateParams, $modalInstance, entity, Member, User) {

        $scope.member = entity;
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

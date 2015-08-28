'use strict';

angular.module('crossfitApp').controller('MemberDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Member', 'User', 'CrossFitBox', 'FileDocument', 'MembershipType',
        function($scope, $stateParams, $modalInstance, entity, Member, User, CrossFitBox, FileDocument, MembershipType) {

        $scope.member = entity;
        $scope.users = User.query();
        $scope.crossfitboxs = CrossFitBox.query();
        $scope.filedocuments = FileDocument.query();
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

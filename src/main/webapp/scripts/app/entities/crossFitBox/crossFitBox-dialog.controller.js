'use strict';

angular.module('crossfitApp').controller('CrossFitBoxDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'CrossFitBox', 'FileDocument', 'User',
        function($scope, $stateParams, $modalInstance, entity, CrossFitBox, FileDocument, User) {

        $scope.crossFitBox = entity;
        $scope.filedocuments = FileDocument.query();
        $scope.users = User.query();
        $scope.load = function(id) {
            CrossFitBox.get({id : id}, function(result) {
                $scope.crossFitBox = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:crossFitBoxUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.crossFitBox.id != null) {
                CrossFitBox.update($scope.crossFitBox, onSaveFinished);
            } else {
                CrossFitBox.save($scope.crossFitBox, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

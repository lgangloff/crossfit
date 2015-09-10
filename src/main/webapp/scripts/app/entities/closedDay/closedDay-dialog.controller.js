'use strict';

angular.module('crossfitApp').controller('ClosedDayDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'ClosedDay', 'CrossFitBox',
        function($scope, $stateParams, $modalInstance, entity, ClosedDay, CrossFitBox) {

        $scope.closedDay = entity;
        $scope.crossfitboxs = CrossFitBox.query();
        $scope.load = function(id) {
            ClosedDay.get({id : id}, function(result) {
                $scope.closedDay = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:closedDayUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.closedDay.id != null) {
                ClosedDay.update($scope.closedDay, onSaveFinished);
            } else {
                ClosedDay.save($scope.closedDay, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

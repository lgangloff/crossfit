'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'TimeSlot', 'CrossFitBox',
        function($scope, $stateParams, $modalInstance, entity, TimeSlot, CrossFitBox) {

        $scope.timeSlot = entity;
        $scope.crossfitboxs = CrossFitBox.query();
        $scope.load = function(id) {
            TimeSlot.get({id : id}, function(result) {
                $scope.timeSlot = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:timeSlotUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.timeSlot.id != null) {
                TimeSlot.update($scope.timeSlot, onSaveFinished);
            } else {
                TimeSlot.save($scope.timeSlot, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

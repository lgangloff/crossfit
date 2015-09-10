'use strict';

angular.module('crossfitApp').controller('BookingDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking', 'CrossFitBox', 'Member',
        function($scope, $stateParams, $modalInstance, entity, Booking, CrossFitBox, Member) {

        $scope.booking = entity;
        $scope.crossfitboxs = CrossFitBox.query();
        $scope.members = Member.query();
        $scope.load = function(id) {
            Booking.get({id : id}, function(result) {
                $scope.booking = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:bookingUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.booking.id != null) {
                Booking.update($scope.booking, onSaveFinished);
            } else {
                Booking.save($scope.booking, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

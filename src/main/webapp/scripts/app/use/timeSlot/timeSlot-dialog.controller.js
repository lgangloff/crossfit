'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking',
        function($scope, $stateParams, $modalInstance, entity, Booking) {

        $scope.subscription = entity; // id du timeSlot, date de début date de fin
        

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:timeSlotUpdate', result);
            $modalInstance.close(result);
        };

        $scope.subscribe = function () {
            if ($scope.subscription.bookingId == null) {
                Booking.save($scope.subscription, onSaveFinished);
            } 
        };
        
        $scope.unSubscribe = function () {
//          if ($scope.timeSlot.id != null) {
//              Booking.update($scope.subscription, onSaveFinished);
//          } 
      };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

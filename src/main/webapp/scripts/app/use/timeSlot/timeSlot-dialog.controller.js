'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking', 'Availability', 'DateUtils',
        function($scope, $stateParams, $modalInstance, entity, Booking, Availability, DateUtils) {

        $scope.subscription = entity; // id du timeSlot, date de début date de fin
        
        	Availability.availability({id : $stateParams.id, date : (DateUtils.convertDateTimeFromServer($stateParams.start)).toISOString().slice(0, 10)}, function(result) {
        		$scope.availability = result;
            });


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

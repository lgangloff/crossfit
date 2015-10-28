'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking', 'Availability', 'TimeSlot', 'DateUtils',
        function($scope, $stateParams, $modalInstance, entity, Booking, Availability, TimeSlot, DateUtils) {

    	console.log($stateParams);
        $scope.subscription = entity; // id du timeSlot, date de début date de fin
        
    	Availability.availability({id : $stateParams.id, date : (DateUtils.convertDateTimeFromServer($stateParams.date)).toISOString().slice(0, 10)}, function(result) {
    		$scope.availability = result;
        });


        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:timeSlotUpdate', result);
            $modalInstance.close(result);
        };

        $scope.subscribe = function () {
            if ($scope.subscription.bookingId == null) {
                TimeSlot.booking({id: $stateParams.id, date : (DateUtils.convertDateTimeFromServer($stateParams.date)).toISOString().slice(0, 10)}, onSaveFinished);
            } 
        };
        
        $scope.unSubscribe = function (id) {
	          if (id != null) {
	              Booking.delete({id: id}, onSaveFinished);
	          } 
        };
        
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

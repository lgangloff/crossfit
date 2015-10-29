'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking', 'Availability', 'TimeSlot', 'DateUtils',
        function($scope, $stateParams, $modalInstance, entity, Booking, Availability, TimeSlot, DateUtils) {

    	Availability.availability({id : $stateParams.id, date : $stateParams.date}, function(result) {
    		console.log("availability");
    		$scope.availability = result;
        });


        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:timeSlotUpdate', result);
            $modalInstance.close(result);
        };

        $scope.subscribe = function () {
        	TimeSlot.booking({id: $stateParams.id, date : $stateParams.date}, onSaveFinished);
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

'use strict';

angular.module('crossfitApp').controller('TimeSlotDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Booking', 'Availability', 'TimeSlot', 'DateUtils',
        function($scope, $stateParams, $modalInstance, entity, Booking, Availability, TimeSlot, DateUtils) {

  
    	Availability.availability({id : entity.id, date : entity.date}, function(result) {
    		$scope.availability = result;
        });


        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:timeSlotUpdate', result);
            $modalInstance.close(result);
        };

        $scope.subscribe = function () {
        	TimeSlot.booking({id: entity.id, date : entity.date}, onSaveFinished);
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

'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotController', function ($scope, $state, TimeSlot, TimeSlotEvent) {
    	$scope.eventSources = [];
        
        $scope.uiConfig = {
			calendar:{
				height: 700,
				editable: true,
				header:{
					left: '', center: '', right: ''
				},
				firstDay: 1,
				defaultView: 'agendaWeek',
				allDaySlot: false,
				columnFormat: 'dddd',
				selectable: true,
				selectHelper: true,
				select: function(start, end) {
					var startD = new Date(start);
					var endD = new Date(end);

					var dayOfWeek = startD.getDay();
					if (dayOfWeek == 0){
						dayOfWeek = 7;
					}
					var startTime = startD.toLocaleTimeString();
					var endTime = endD.toLocaleTimeString();
		            $state.go('timeSlot.new', {dayOfWeek:dayOfWeek,start:startTime, end:endTime});
				},
				dayClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize
			}
		};
        
        $scope.loadAll = function() {
        	TimeSlotEvent.query(function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                	 $scope.eventSources.push(result[i]);
                }
            });
            
        };
        $scope.reset = function() {
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            TimeSlot.get({id: id}, function(result) {
                $scope.timeSlot = result;
                $('#deleteTimeSlotConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            TimeSlot.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteTimeSlotConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.timeSlot = {dayOfWeek: null, startTime: null, endTime: null, maxAttendees: null, requiredLevel: null, id: null};
        };
    });

'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotController', function ($scope, $state, $stateParams, TimeSlot, TimeSlotEvent, DateUtils) {
    	$scope.eventSources = [];
    	var parts = $stateParams.startDate.split('-');
    	  
        $scope.uiConfig = {
			calendar:{
				height: 700,
				editable: false,
				header:{
					left: '', center: '', right: 'today prev,next'
				},
				firstDay: 1,
				defaultDate: $stateParams.startDate ? new Date(parts[0], parts[1]-1, parts[2]) : new Date(),
				defaultView: 'agendaWeek',
				allDaySlot: false,
				columnFormat: 'ddd D MMM',
				axisFormat: 'HH:mm',
				timeFormat: {
				    agenda: 'H:mm'
				},
				selectable: false,
				selectHelper: true,
				
				eventClick: function(calEvent, jsEvent, view) {
					if (calEvent.id){
			            $state.go('timeSlot.edit', {id:calEvent.id});
					}
			    },
			    viewRender : function(view, element){
			    	$scope.startDateCalendar = new Date(view.start).toISOString().slice(0, 10);
			    	$scope.endDateCalendar = new Date(view.end).toISOString().slice(0, 10);
		            $state.go('timeSlot', {startDate:$scope.startDateCalendar, endDate:$scope.endDateCalendar},{notify:false});
		            $scope.loadAll();
			    }
			}
		};
        
        $scope.loadAll = function() {
        	$scope.eventSources.length = 0;
        	TimeSlotEvent.query({end:$scope.endDateCalendar,start:$scope.startDateCalendar, editable:false}, function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                	 $scope.eventSources.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.loadAll();
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.timeSlot = {dayOfWeek: null, startTime: null, endTime: null, maxAttendees: null, requiredLevel: null, id: null};
        };
    });

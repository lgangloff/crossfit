'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotController', function ($scope, $state, $stateParams, TimeSlot, TimeSlotEvent, DateUtils) {
    	$scope.eventSources = [];
    	var parts = $stateParams.startDate.split('-');
    	  
        $scope.uiConfig = {
			calendar:{
				height: 865,
				editable: false,
				header:{
					left: 'prev,today,next', center: 'title', right: 'agendaDay,agendaWeek,month'
				},
				firstDay: 1,
				defaultDate: $stateParams.startDate ? new Date(parts[0], parts[1]-1, parts[2]) : new Date(),
				defaultView: 'agendaWeek',
				allDaySlot: false,
				columnFormat: 'dddd D',
				axisFormat: 'HH:mm',
				timeFormat: 'H:mm',
				titleFormat : {
					agenda : 'MMMM',
					month : 'MMMM'
				},
				minTime: "06:00:00",
				selectable: false,
				selectHelper: true,
				    
				eventClick: function(calEvent, jsEvent, view) {
					if (calEvent.id){
			            $state.go('timeSlot.subscribe', {id:calEvent.id, start:calEvent.start, end: calEvent.end});
					}
			    },
			    viewRender : function(view, element){
			    	$scope.startDateCalendar = new Date(view.start).toISOString().slice(0, 10);
			    	$scope.endDateCalendar = new Date(view.end).toISOString().slice(0, 10);
		            $state.go('timeSlot', {startDate:$scope.startDateCalendar, endDate:$scope.endDateCalendar},{notify:false});
		            $scope.loadAll();
			    }
			},
			calendarMobile:{
				height: "auto",
				editable: false,
				header:{
					left: '', center: 'prev,today,next', right: ''
				},
				defaultDate: $stateParams.startDate ? new Date(parts[0], parts[1]-1, parts[2]) : new Date(),
				defaultView: 'basicDay',
				columnFormat: 'ddd D MMM',
				timeFormat: 'H:mm',
				selectable: false,
				selectHelper: true,
				
				eventClick: function(calEvent, jsEvent, view) {
					if (calEvent.id){
			            $state.go('timeSlot.subscribe', {id:calEvent.id, start:calEvent.start, end: calEvent.end});
					}
			    },
			    viewRender : function(view, element){
			    	$scope.startDateCalendar = new Date(view.start).toISOString().slice(0, 10);
			    	$scope.endDateCalendar = new Date(view.end).toISOString().slice(0, 10);
		            $state.go('timeSlot', {startDate:$scope.startDateCalendar, endDate:$scope.endDateCalendar},{notify:false});
		            $scope.loadAll();
			    },
			    eventAfterRender : function(event, element){
			    	$(".fc-time").css("font-size","x-large");
			    	$(".fc-time").css("display","block");
			    	$(".fc-time").css("text-align","center");
			    	
			    	$(".fc-title").css("font-size","small");
			    	$(".fc-title").css("display","block");
			    	$(".fc-title").css("text-align","center");
			    	
		            element.height(50);
		            $('.fc-time').css('display:block;');
			    }
			}
		};
        
        $scope.loadAll = function() {
        	$scope.eventSources.length = 0;
        	TimeSlotEvent.query({end:$scope.endDateCalendar,start:$scope.startDateCalendar}, function(result, headers) {
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

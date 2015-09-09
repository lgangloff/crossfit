'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotController', function ($scope, $state, TimeSlot, TimeSlotEvent) {
    	$scope.eventSources = [];
        $scope.firstDateCalendar = new Date().toISOString();
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
				columnFormat: 'ddd D MMM',
				axisFormat: 'HH:mm',
				timeFormat: {
				    agenda: 'H:mm'
				},
				selectable: true,
				selectHelper: true,
				select: function(start, end) {
					var startD = new Date(start);
					var endD = new Date(end);

					var dayOfWeek = startD.getDay();
					if (dayOfWeek == 0){
						dayOfWeek = 7;
					}
					var startTime = startD.getUTCHours() + ":" + startD.getUTCMinutes() + ":" + startD.getUTCSeconds();
					var endTime = endD.getUTCHours() + ":" + endD.getUTCMinutes() + ":" + endD.getUTCSeconds();
		            $state.go('timeSlot.new', {dayOfWeek:dayOfWeek,start:startTime, end:endTime});
				},
				eventClick: function(calEvent, jsEvent, view) {
		            $state.go('timeSlot.edit', {id:calEvent.id});
			    },
				eventDrop: function(event, delta, revertFunc) {

					var startD = new Date(event.start);
					var endD = new Date(event.end);

					var dayOfWeek = startD.getDay();
					if (dayOfWeek == 0){
						dayOfWeek = 7;
					}

					var startTime = startD.getUTCHours() + ":" + startD.getUTCMinutes() + ":" + startD.getUTCSeconds();
					var endTime = endD.getUTCHours() + ":" + endD.getUTCMinutes() + ":" + endD.getUTCSeconds();
					TimeSlot.get({id : event.id}, function(result) {
						result.startTime = startTime;
						result.endTime = endTime;
						result.dayOfWeek = dayOfWeek;
		                TimeSlot.update(result);
					});
					 
			    },
				eventResize:  function(event, delta, revertFunc) {

					var startD = new Date(event.start);
					var endD = new Date(event.end);

					var dayOfWeek = startD.getDay();
					if (dayOfWeek == 0){
						dayOfWeek = 7;
					}
					var startTime = startD.getUTCHours() + ":" + startD.getUTCMinutes() + ":" + startD.getUTCSeconds();
					var endTime = endD.getUTCHours() + ":" + endD.getUTCMinutes() + ":" + endD.getUTCSeconds();
					TimeSlot.get({id : event.id}, function(result) {
						result.startTime = startTime;
						result.endTime = endTime;
						result.dayOfWeek = dayOfWeek;
		                TimeSlot.update(result);
					});
			    }, 
			    viewRender : function(view, element){
			    	$scope.firstDateCalendar = new Date(view.start).toISOString();
			    	$scope.loadAll();
			    }
			}
		};
        
        $scope.loadAll = function() {
        	TimeSlotEvent.query({start:$scope.firstDateCalendar}, function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                	 $scope.eventSources.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.loadAll();
        };

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

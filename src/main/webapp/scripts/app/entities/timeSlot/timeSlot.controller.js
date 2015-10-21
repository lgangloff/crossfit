'use strict';

angular.module('crossfitApp')
    .controller('TimeSlotController', function ($scope, TimeSlot, ParseLinks) {
        $scope.timeSlots = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            TimeSlot.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.timeSlots.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.timeSlots = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
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
            $scope.timeSlot = {dayOfWeek: null, name: null, startTime: null, endTime: null, maxAttendees: null, requiredLevel: null, id: null};
        };
    });

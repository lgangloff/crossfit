'use strict';

angular.module('crossfitApp')
    .controller('MainController', function ($scope, Principal, Planning, Booking) {
    	$scope.planning = [];
        $scope.page = 0;
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.loadAll();
        });
        
        
        $scope.loadAll = function() {
            Planning.query({page: $scope.page, per_page: 5}, function(result, headers) {
                for (var i = 0; i < result.days.length; i++) {
                    $scope.planning.push(result.days[i]);
                }
            });
        };
        $scope.reset = function() {
        	$scope.planning = [];
            $scope.page = 0;
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        
        
        $scope.delete = function (id) {
            Booking.get({id: id}, function(result) {
                $scope.booking = result;
                $('#deleteBookingConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Booking.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteBookingConfirmation').modal('hide');
                });
        };
    });

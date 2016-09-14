'use strict';

angular.module('crossfitApp')
    .controller('MainController', function ($scope, Principal, Planning) {
    	$scope.planning = [];
        $scope.page = 0;
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.loadAll();
        });
        
        
        $scope.loadAll = function() {
            Planning.query({page: $scope.page, per_page: 3}, function(result, headers) {
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
        
        $scope.showMore = function(){
        	$scope.loadPage($scope.page + 1);
        }
    });

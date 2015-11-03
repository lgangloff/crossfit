'use strict';

angular.module('crossfitApp')
    .controller('MemberSettingsController', 
    		['$scope', '$filter',  '$stateParams', '$state', 'CurrentMember', 'Member', 'User',
    	        function($scope, $filter, $stateParams, $state, CurrentMember, Member, User) {
		$scope.success = null;
        $scope.error = null;
    	$scope.member = CurrentMember.get();
    	
    	$scope.member.$promise.then(function(member) {
    		member.level = $filter('translate')('crossfitApp.Level.'+member.level);
    	});

    	console.log($scope.member);


    	$scope.save = function () {
    		Member.update($scope.member).then(function() {
                $scope.error = null;
                $scope.success = 'OK';
                
            }).catch(function() {
                $scope.success = null;
                $scope.error = 'ERROR';
            });
        };
    }]);

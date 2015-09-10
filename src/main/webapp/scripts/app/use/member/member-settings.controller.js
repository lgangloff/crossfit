'use strict';

angular.module('crossfitApp')
    .controller('MemberSettingsController', 
    		['$scope', '$stateParams', '$state', 'CurrentMember', 'Member', 'User',
    	        function($scope, $stateParams, $state, CurrentMember, Member, User) {
		$scope.success = null;
        $scope.error = null;
    	$scope.member = CurrentMember.get();


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

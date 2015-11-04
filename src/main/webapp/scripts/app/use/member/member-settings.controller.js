'use strict';

angular.module('crossfitApp')
    .controller('MemberSettingsController', 
    		['$scope', '$filter',  '$stateParams', '$state', 'CurrentMember', 'Member', 'User',
    	        function($scope, $filter, $stateParams, $state, CurrentMember, Member, User) {
		
    	
    	CurrentMember.get().$promise.then(function(member) {
    		$scope.member = member;
    	});

    	$scope.save = function () {
    		Member.update($scope.member);
        };
    }]);

'use strict';

angular.module('crossfitApp').controller('MemberDialogController',
    ['$scope', '$stateParams', '$state', '$modalInstance', 'entity', 'Member', 'User', 'MembershipType',
        function($scope, $stateParams, $state, $modalInstance, entity, Member, User, MembershipType) {

    	$scope.showAllForm = ! $state.is('member.editMembership');
        $scope.member = entity;
        $scope.membershiptypes = MembershipType.query();
        $scope.load = function(id) {
            Member.get({id : id}, function(result) {
                $scope.member = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:memberUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.member.id != null) {
                Member.update($scope.member, onSaveFinished);
            } else {
                Member.save($scope.member, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.reinitMembershipDateToNow = function(){
        	$scope.member.membershipStartDate = new Date();
        	$scope.member.membershipEndDate = null;
        }

        $scope.addOneMonthToMembershipEndDate = function(){
        	if ($scope.member.membershipEndDate == null){
        		$scope.member.membershipEndDate = $scope.member.membershipStartDate;
        	}
        	var d = new Date($scope.member.membershipEndDate);
        	d.setMonth(d.getMonth() + 1);
        	$scope.member.membershipEndDate = d;
        }
}]);

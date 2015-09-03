'use strict';

angular.module('crossfitApp').controller('SubscriptionDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Subscription', 'User', 'CrossFitBox', 'FileDocument', 'MembershipType',
        function($scope, $stateParams, $modalInstance, entity, Subscription, User, CrossFitBox, FileDocument, MembershipType) {

        $scope.subscription = entity;
        $scope.users = User.query();
        $scope.crossfitboxs = CrossFitBox.query();
        $scope.filedocuments = FileDocument.query();
        $scope.membershiptypes = MembershipType.query();
        $scope.load = function(id) {
            Subscription.get({id : id}, function(result) {
                $scope.subscription = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('crossfitApp:subscriptionUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.subscription.id != null) {
                Subscription.update($scope.subscription, onSaveFinished);
            } else {
                Subscription.save($scope.subscription, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

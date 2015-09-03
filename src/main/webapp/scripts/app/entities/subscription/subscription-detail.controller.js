'use strict';

angular.module('crossfitApp')
    .controller('SubscriptionDetailController', function ($scope, $rootScope, $stateParams, entity, Subscription, User, CrossFitBox, FileDocument, SubscriptionshipType) {
        $scope.subscription = entity;
        $scope.load = function (id) {
            Subscription.get({id: id}, function(result) {
                $scope.subscription = result;
            });
        };
        $rootScope.$on('crossfitApp:subscriptionUpdate', function(event, result) {
            $scope.subscription = result;
        });
    });

'use strict';

angular.module('crossfitApp')
    .controller('SubscriptionController', function ($scope, Subscription, ParseLinks) {
        $scope.subscriptions = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Subscription.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.subscriptions.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.subscriptions = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Subscription.get({id: id}, function(result) {
                $scope.subscription = result;
                $('#deleteSubscriptionConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Subscription.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteSubscriptionConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.subscription = {telephonNumber: null, sickNoteEndDate: null, subscriptionStartDate: null, subscriptionEndDate: null, level: null, id: null};
        };
    });

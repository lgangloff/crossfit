'use strict';

angular.module('crossfitApp')
    .controller('CrossFitBoxController', function ($scope, CrossFitBox, ParseLinks) {
        $scope.crossFitBoxs = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            CrossFitBox.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.crossFitBoxs = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            CrossFitBox.get({id: id}, function(result) {
                $scope.crossFitBox = result;
                $('#deleteCrossFitBoxConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            CrossFitBox.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCrossFitBoxConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.crossFitBox = {name: null, website: null, adminwebsite: null, bookingwebsite: null, rootwebsite: null, id: null};
        };
    });

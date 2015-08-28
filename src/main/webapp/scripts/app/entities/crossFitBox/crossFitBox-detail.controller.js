'use strict';

angular.module('crossfitApp')
    .controller('CrossFitBoxDetailController', function ($scope, $rootScope, $stateParams, entity, CrossFitBox, FileDocument, User) {
        $scope.crossFitBox = entity;
        $scope.load = function (id) {
            CrossFitBox.get({id: id}, function(result) {
                $scope.crossFitBox = result;
            });
        };
        $rootScope.$on('crossfitApp:crossFitBoxUpdate', function(event, result) {
            $scope.crossFitBox = result;
        });
    });

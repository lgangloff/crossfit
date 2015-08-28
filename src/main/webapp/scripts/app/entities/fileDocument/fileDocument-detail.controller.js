'use strict';

angular.module('crossfitApp')
    .controller('FileDocumentDetailController', function ($scope, $rootScope, $stateParams, entity, FileDocument) {
        $scope.fileDocument = entity;
        $scope.load = function (id) {
            FileDocument.get({id: id}, function(result) {
                $scope.fileDocument = result;
            });
        };
        $rootScope.$on('crossfitApp:fileDocumentUpdate', function(event, result) {
            $scope.fileDocument = result;
        });
    });

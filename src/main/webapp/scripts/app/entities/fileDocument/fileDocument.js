'use strict';

angular.module('crossfitApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('fileDocument', {
                parent: 'entity',
                url: '/fileDocuments',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.fileDocument.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/fileDocument/fileDocuments.html',
                        controller: 'FileDocumentController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('fileDocument');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('fileDocument.detail', {
                parent: 'entity',
                url: '/fileDocument/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'crossfitApp.fileDocument.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/fileDocument/fileDocument-detail.html',
                        controller: 'FileDocumentDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('fileDocument');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'FileDocument', function($stateParams, FileDocument) {
                        return FileDocument.get({id : $stateParams.id});
                    }]
                }
            })
            .state('fileDocument.new', {
                parent: 'fileDocument',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fileDocument/fileDocument-dialog.html',
                        controller: 'FileDocumentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {uuid: null, name: null, content: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('fileDocument', null, { reload: true });
                    }, function() {
                        $state.go('fileDocument');
                    })
                }]
            })
            .state('fileDocument.edit', {
                parent: 'fileDocument',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fileDocument/fileDocument-dialog.html',
                        controller: 'FileDocumentDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FileDocument', function(FileDocument) {
                                return FileDocument.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('fileDocument', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

'use strict';

angular.module('crossfitApp')
    .factory('Member', function ($resource, DateUtils) {
        return $resource('use/members/:id', {}, {
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.sickNoteEndDate = DateUtils.convertLocaleDateToServer(data.sickNoteEndDate);
                    data.membershipStartDate = DateUtils.convertLocaleDateToServer(data.membershipStartDate);
                    data.membershipEndDate = DateUtils.convertLocaleDateToServer(data.membershipEndDate);
                    return angular.toJson(data);
                }
            }
        });
    });

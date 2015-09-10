'use strict';

angular.module('crossfitApp')
    .factory('CurrentMember', function ($resource, DateUtils) {
        return $resource('use/members/logged', {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.sickNoteEndDate = DateUtils.convertLocaleDateFromServer(data.sickNoteEndDate);
                    data.membershipStartDate = DateUtils.convertLocaleDateFromServer(data.membershipStartDate);
                    data.membershipEndDate = DateUtils.convertLocaleDateFromServer(data.membershipEndDate);
                    return data;
                }
            }
        });
    });

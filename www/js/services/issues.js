/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('issues', function ($q, $resource, app) {
        var service = {};

        /**
         * Get project list
         *
         * @returns {*}
         */
        service.forProjectKey = function (key) {
            var defer    = $q.defer(),
                jql      = 'project = ' + key,
                Issues   = $resource(app.api.baseUrl + 'search', {jql: jql}),
                list     = Issues.get({}, function () {
                    defer.resolve(list);
                });

            return defer.promise;
        };

        return service;
    });
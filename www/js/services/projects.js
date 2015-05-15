/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('projects', function ($q, $resource, app) {
        var service = {};

        /**
         * Get project list
         *
         * @returns {*}
         */
        service.getProjectList = function () {
            var defer = $q.defer();
            var Projects = $resource(app.api.baseUrl + 'project', {expand: 'lead'});
            var list = Projects.query({}, function () {
                defer.resolve(list);
            });

            return defer.promise;
        };

        service.getProject = function (id) {
            var defer = $q.defer();
            var Project = $resource(app.api.baseUrl + 'project/:id', {id: id, expand: 'lead,description'});
            var project = Project.get({}, function () {
                defer.resolve(project);
            });

            return defer.promise;
        };

        return service;
    });
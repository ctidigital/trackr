/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('ProjectCtrl', function ($scope, projectCollection) {
        $scope.project = projectCollection.project;
        $scope.issues  = projectCollection.issueCollection.issues;
    });
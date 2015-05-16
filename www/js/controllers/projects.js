/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('ProjectsCtrl', function ($scope, projects, $ionicLoading) {
        $scope.projects = projects;
        $ionicLoading.hide();
    });
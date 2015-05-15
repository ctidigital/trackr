/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, app) {
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.user = app.getUserModel();
    });
/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('ProjectCtrl', function ($scope, $ionicLoading, project, issues) {
        $scope.project = project;

        // Load issues
        $ionicLoading.show({
            template: '<h5>Loading Issues</h5><ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
        });

        issues.forProjectKey(project.key).then(function (result) {
            $scope.safeApply(function () {
                $scope.issues = result.issues;
                $ionicLoading.hide();
            });
        }, function () {
            $ionicLoading.hide();
        });

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    });
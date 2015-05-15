/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('AuthCtrl', function ($scope, $state, $ionicLoading, authentication) {
        $scope.auth = {
            username: '',
            password: ''
        };

        $scope.login = function (isValid) {
            if(isValid) {
                $ionicLoading.show({
                    template: '<h5>Authenticating</h5><ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
                });

                authentication.login(
                    $scope.auth.username,
                    $scope.auth.password
                ).then(function () {
                        $ionicLoading.hide();
                        $ionicLoading.show({
                            template: '<h5>Loading Projects</h5><ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
                        });
                        $state.go('app.projects');
                    }, function (response) {
                        $ionicLoading.hide();
                        $scope.error = true;
                        if(response.status === 404) {
                            $scope.errorMessage = 'Invalid Username provided';
                        }else if(response.status === 401 || response.status === 403){
                            $scope.errorMessage = 'Authentication failed';
                        }else{
                            $scope.errorMessage = 'Authentication failed';
                        }
                    }
                );
            }
        };
    });
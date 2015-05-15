/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .controller('AuthCtrl', function ($scope, $state, authentication) {
        $scope.auth = {
            username: '',
            password: ''
        };

        $scope.login = function (isValid) {
            if(isValid) {
                authentication.login(
                    $scope.auth.username,
                    $scope.auth.password
                ).then(function () {
                        $state.go('app.projects');
                    }, function (response) {
                        console.log(response);
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
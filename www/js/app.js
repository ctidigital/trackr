/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr', [
    'trackr.config',
    'ionic',
    'ngCordova',
    'ngResource',
    'timer',
    'ion-autocomplete'
]).config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('auth', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        }).state('app', {
            abstract: true,
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).state('app.projects', {
            url: '/projects',
            resolve: {
                projects: function (projects) {
                    return projects.getProjectList();
                }
            },
            views: {
                content: {
                    templateUrl: 'views/projects.html',
                    controller: 'ProjectsCtrl'
                }
            }
        })
        .state('app.project', {
            url: '/project/:id',
            resolve: {
                projectCollection: function ($stateParams, $q, $ionicLoading, projects, issues) {
                    var promises = {
                            project: projects.getProject($stateParams.id),
                            issueCollection: issues.forProjectKey($stateParams.id)
                        },
                        result = $q.all(promises);
                        result.then(function () {
                            $ionicLoading.hide();
                        });

                    $ionicLoading.show({
                        template: '<h5>Loading project</h5><ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
                    });

                    return result;
                }
            },
            views: {
                content: {
                    templateUrl: 'views/project.html',
                    controller: 'ProjectCtrl'
                }
            }
        }).state('app.tracker', {
            url: '/tracker',
            views: {
                content: {
                    templateUrl: 'views/tracker.html',
                    controller: 'TrackerCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('authenticationInterceptor');
}).run(function ($ionicPlatform, $cordovaSplashscreen) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        $cordovaSplashscreen.hide();
    });
});

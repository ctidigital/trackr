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
                project: function (projects, $stateParams) {
                    return projects.getProject($stateParams.id);
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
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        $cordovaSplashscreen.hide();
    });
});

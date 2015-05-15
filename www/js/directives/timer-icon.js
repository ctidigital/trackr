/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .directive('timerIcon', function ($rootScope, $ionicPopover, tracker) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/timer-icon.html',
            link: function postLink(scope) {
                scope.isActive = false;

                $ionicPopover.fromTemplateUrl('views/directives/popover-timer.html', {
                    scope: scope
                }).then(function(popover) {
                    scope.popover = popover;
                });

                $rootScope.$on(tracker.EVENTS.START, function (event, issue) {
                    scope.isActive = true;
                    scope.issue = issue;
                });

                $rootScope.$on(tracker.EVENTS.STOP, function () {
                    scope.isActive = false;
                });
            }
        };
    });

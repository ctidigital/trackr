/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .directive('issues', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/issues.html',
            scope: {
                collection: '='
            },
            link: function postLink() {
            }
        };
    });

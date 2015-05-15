/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .directive('issue', function ($rootScope, $ionicActionSheet, tracker) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/issue-item.html',
            scope: {
                item: '='
            },
            link: function postLink(scope) {
                scope.showOptions = function () {
                    var hideSheet = $ionicActionSheet.show({
                        buttons: [
                            {
                                text: 'Track this issue'
                            }
                        ],
                        cancelText: 'Cancel',
                        cancel: function () {
                            hideSheet();
                        },
                        buttonClicked: function (index) {
                            if(index === 0) {
                                if(!tracker.isTracking()) {
                                    tracker.startTracking(scope.item);
                                }else{
                                    // @TODO notify user of existing issue being tracked
                                }
                            }

                            return true;
                        }
                    });
                };
            }
        };
    });

/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('tracker', function ($rootScope, $resource) {
        var service = {
            EVENTS: {
                START: 'tracker.start',
                STOP:  'tracker.stop',
                PAUSE: 'tracker.pause'
            },
            tracking: null
        };

        /**
         * Start tracking an issue
         *
         * @param issue
         */
        service.startTracking = function (issue) {
            // @TODO validate for key, project.key, project.name, project.avatarUrls['48x48']

            if(!service.isTracking()) {
                service.tracking = issue;

                // Notify listeners of new Tracking issue
                $rootScope.$on(service.EVENTS.START, service.tracking);
            }else{
                // @TODO notify user we are currently tracking another issue
            }
        };

        /**
         * Stop tracking an issue
         */
        service.stopTracking = function () {
            // @TODO validate for key, project.key, project.name, project.avatarUrls['48x48']

            if(service.isTracking()) {
                // Notify listeners we are no longer going to track issue
                $rootScope.$on(service.EVENTS.STOP, service.tracking);

                service.tracking = null;
            }else{
                // @TODO notify user we are currently not tracking any issues
            }
        };

        /**
         * Whether we are currently tracking an issue
         *
         * @returns {boolean}
         */
        service.isTracking = function () {
            return (service.tracking === null);
        };

        $rootScope.$on(service.EVENTS.START, function () {
            $rootScope.$broadcast('timer-start');
        });

        $rootScope.$on(service.EVENTS.STOP, function () {
            $rootScope.$broadcast('timer-stop');
        });

        return service;
    });
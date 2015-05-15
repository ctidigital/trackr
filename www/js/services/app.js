/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('app', function (user, env) {
        var service = {
            api: {
                baseUrl: env.api.baseUrl + env.api.endpoint + '/'
            }
        };

        /**
         * Get User Credentials
         *
         * @returns {{username: string, password: string}}
         */
        service.getUserCredentials = function () {
            return user.getCredentials();
        };

        /**
         * Set User Credentials
         *
         * @param username
         * @param password
         */
        service.setUserCredentials = function (username, password) {
            user.setUserCredentials(username, password);
        };

        /**
         * Set User Model
         *
         * @param model
         */
        service.setUserModel = function (model) {
            // @TODO validate model
            user.model = model;
        };

        /**
         * Get User Model
         *
         * @returns {*}
         */
        service.getUserModel = function () {
            return user.model;
        };

        return service;
    });
/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('user', function () {
        var service = {
            credentials: {
                username: '',
                password: ''
            },
            model: {}
        };

        /**
         * Get User Credentials
         *
         * @returns {{username: string, password: string}}
         */
        service.getCredentials = function () {
            return service.credentials;
        };

        /**
         * Set User Credentials
         *
         * @param username
         * @param password
         */
        service.setUserCredentials = function (username, password) {
            service.credentials.username = username;
            service.credentials.password = password;
        };

        service.getProfile = function () {

        };

        return service;
    });
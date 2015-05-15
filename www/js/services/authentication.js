/**
 * Trackr
 *
 * @author Jason Brown <j.brown@ctidigital.com>
 */
angular.module('trackr')
    .factory('authentication', function ($q, $resource, app) {
        return {
            /**
             *
             * @param username
             * @param password
             * @returns {*}
             */
            login: function (username, password) {
                app.setUserCredentials(username, password);

                var defer = $q.defer(),
                    Users = $resource(app.api.baseUrl + 'user');
                    user = Users.get({username: username}, function () {
                        app.setUserModel(user);
                        defer.resolve(user);
                    }, function (error) {
                        app.setUserCredentials('', '');
                        defer.reject(error);
                    });

                return defer.promise;
            }
        };
    })

    /**
     * Network Interceptor to add Basic Authentication to http requests
     * Targets only those sent to and from the API
     */
    .factory('authenticationInterceptor', function (app) {
        var service = {
            /**
             * Encodes user credentials for transmitting as Basic Authentication
             *
             * @param username
             * @param password
             * @returns {string}
             */
            encodeForBasic: function (username, password) {
                // Use Base64 encoding
                return window.btoa(username + ':' + password);
            },

            /**
             * Decodes an encoded string provided as part of Basic Authentication
             *
             * @param encodedString
             * @returns {{username: string, password: string}}
             */
            decodeFromBasic: function (encodedString) {
                var decoded = window.atob(encodedString);

                var credentials = decoded.split(':');

                return {
                    username: credentials[0],
                    password: credentials[1]
                };
            },
            'request': function (config) {
                // Only modify request if it is against the API
                if(config.url.indexOf(app.api.baseUrl) !== -1) {
                    var credentials = app.getUserCredentials(),
                        encoded     = service.encodeForBasic(credentials.username, credentials.password);

                    if(config.hasOwnProperty('params')) {
                        config.params.os_authType = 'basic';
                    }

                    config.headers['Content-Type'] = 'application/json';
                    config.headers['Authorization'] = "Basic " + encoded;
                }

                return config;
            }
        };

        return service;
    });
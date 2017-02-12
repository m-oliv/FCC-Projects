'use strict';

angular.module('fccTwitch.services', [])
    .service('UtilService', function ($mdToast) {
        this.showToastMessage = function (message) {
            if (isDefined(message) && !isNull(message)) {
                $mdToast.show($mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .hideDelay(3000)
                );
            }
        };
    });

angular.module('fccTwitch.services.UrlService', [])
    .service('UrlService', function () {
        this.userInfoUrl = 'https://wind-bow.gomix.me/twitch-api/users/';
        this.channelInfoUrl = 'https://wind-bow.gomix.me/twitch-api/streams/';
        this.streamInfoUrl = 'https://wind-bow.gomix.me/twitch-api/channels/';

        this.getUserInfoUrl = function () {
            return this.userInfoUrl;
        }

        this.getChannelInfoUrl = function () {
            return this.channelInfoUrl;
        }

        this.getStreamInfoUrl = function () {
            return this.streamInfoUrl;
        }
    });

angular.module('fccTwitch.services.HttpService', ['fccTwitch.services.UrlService'])
    .service('HttpService', function (UrlService) {
        this.getUserInformation = function (username, success, error) {
            $http({
                method: 'GET',
                url: UrlService.getUserInfoUrl() + username
            }).then(function successCallback(response) {
                console.log(response);
                success(response.data);
            }, function errorCallback(response) {
                error(response);
            });

            return {
                cancelRequest: function (reason) {
                    cancel.resolve(reason);
                }
            };
        }

        this.getChannelInformation = function (username, success, error) {
            $http({
                method: 'GET',
                url: UrlService.getChannelInfoUrl() + username
            }).then(function successCallback(response) {
                console.log(response);
                success(response.data);
            }, function errorCallback(response) {
                error(response);
            });

            return {
                cancelRequest: function (reason) {
                    cancel.resolve(reason);
                }
            };
        }

        this.getStreamInformation = function (username) {
            $http({
                method: 'GET',
                url: UrlService.getStreamInfoUrl() + username
            }).then(function successCallback(response) {
                console.log(response);
                success(response.data);
            }, function errorCallback(response) {
                error(response);
            });

            return {
                cancelRequest: function (reason) {
                    cancel.resolve(reason);
                }
            };
        }
    });

angular.module('fccTwitch', ['ngMaterial', 'fccTwitch.services.HttpService'])
    .controller('TwitchDashboardController', function ($scope, HttpService) {
        $scope.grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        $scope.streamers = [];

        var streamerInfo = {
            name: '', // user name
            bio: '', // user bio
            logo: '', // user logo
            game: '', // streaming game
            nowStreaming: '', // status stream
            language: '', // channel language
            url: '' // channelUrl
        };

        function init(){
            
        }

        angular.element(document).ready(function () {
            init();
        });
    });
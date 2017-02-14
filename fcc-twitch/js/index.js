'use strict';

angular.module('fccTwitch.services.UtilService', [])
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
    .service('HttpService', function ($http, UrlService) {
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

        this.getStreamInformation = function (username, success, error) {
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

angular.module('fccTwitch', ['ngMaterial', 'fccTwitch.services.HttpService', 'fccTwitch.services.UtilService'])
    .controller('TwitchDashboardController', function ($scope, $log, HttpService, UtilService) {
        $scope.grid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        $scope.streamers = [];

        var userData = [],
            streamData = [],
            channelData = [];

        var streamerInfo = {
            username: '',
            name: '',
            bio: '',
            logo: '',

            viewers: '',
            game: '',
            fps: '',

            nowStreaming: '',
            streamViews: '',
            language: '',
            isMature: '',
            url: ''
        };
        //var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
        var users = ["ESL_SC2", "freecodecamp"];

        angular.element(document).ready(function () {
            init();
        });

        function init() {
            var i, usersLength = users.length;
            for (i = 0; i < usersLength; i++) {
                getUserInformation(users[i]);
                getChannelInformation(users[i]);
                getStreamInformation(users[i]);
            }
        }

        $scope.onRefreshPageDataClicked = function () {

        };

        function clearData(){
            streamerInfo = {
            username: '',
            name: '',
            bio: '',
            logo: '',

            viewers: '',
            game: '',
            fps: '',

            nowStreaming: '',
            streamViews: '',
            language: '',
            isMature: '',
            url: ''
        };
        }

        function getUserInformation(user) {
            HttpService.getUserInformation(user.toLowerCase(),onGetUserInformationSuccess, onGetUserInformationError);
        }

        function onGetUserInformationSuccess(data) {
            $log.debug("Successfully retrieved user data.");
            //$log.debug(data);
            userData.push({
                username: data.name,
                name: data.display_name,
                bio: data.bio,
                logo: data.logo
            });
        }

        function onGetUserInformationError(data) {
            $log.debug("Error retrieving user data.");
            $log.debug(data);
            UtilService.showToastMessage("Error retrieving user data.");
        }

        function getChannelInformation(user) {
            HttpService.getChannelInformation(user.toLowerCase(), onGetChannelInformationSuccess, onGetChannelInformationError);
        }

        function onGetChannelInformationSuccess(response) {
            $log.debug("Successfully retrieved channel data.");
            //$log.debug(response);
            if(response.stream!==null){
                channelData.push({
                    user: response.stream.channel.name,
                    viewers: response.stream.viewers,
                    game: response.stream.game,
                    fps: response.stream.average_fps
                });
            }
        }

        function onGetChannelInformationError(response) {
            $log.debug("Error retrieving channel data.");
            $log.debug(response);
            UtilService.showToastMessage("Error retrieving channel data.");
        }

        function getStreamInformation(user) {
            HttpService.getStreamInformation(user.toLowerCase(), onGetStreamInformationSuccess, onGetStreamInformationError);
        }

        function onGetStreamInformationSuccess(response) {
            $log.debug("Successfully retrieved stream data.");
            //$log.debug(response);
            streamData.push({
                user: response.name,
                nowStreaming: response.status,
                streamViews: response.views,
                language: response.language,
                isMature: response.mature,
                url: response.url
            });

            $log.debug(userData);
            $log.debug(channelData);
            $log.debug(streamData);
        }

        function onGetStreamInformationError(response) {
            $log.debug("Error retrieving stream data.");
            $log.debug(response);
            UtilService.showToastMessage("Error retrieving stream data.");
        }
    });
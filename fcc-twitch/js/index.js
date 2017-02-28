'use strict';

angular.module('fccTwitch.services.DialogService', [])
    .service('DialogService', function ($mdDialog, $log) {
        this.showAlert = function (event, title, description, ok) {
            var alert = $mdDialog.alert()
                .title(title)
                .textContent(description)
                .ok(ok)
                .targetEvent(event);

            $mdDialog.show(alert);
        };
    });

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
    .service('HttpService', function ($http, $q, UrlService) {

        this.getUserInformation = function (username, success, error) {
            var cancel = $q.defer();
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
            var cancel = $q.defer();
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
            var cancel = $q.defer();
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

angular.module('fccTwitch', ['ngMaterial', 'fccTwitch.services.HttpService', 'fccTwitch.services.UtilService',
        'fccTwitch.services.DialogService'
    ])
    .controller('TwitchDashboardController', function ($scope, $log, $q, $timeout, $window, HttpService,
        UtilService, DialogService) {

        $scope.showSearch = false;
        $scope.searchTerm = "";
        $scope.showSearchResults = false;
        $scope.streamers = [];

        $scope.logoStyle = {
            'border-radius': '50%'
        }
        var userData = [],
            streamData = [],
            channelData = [];

        var streamerInfo = {
            username: '',
            name: '',
            bio: "TBD",
            logo: '',
            isValidUser: false,

            isStreaming: false,
            viewers: 0,
            game: '',
            fps: 0,

            nowStreaming: '',
            streamViews: 0,
            language: '',
            isMature: false,
            url: ''
        };
        var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", 
        "noobs2ninjas", "brunofin","comster404"];

        angular.element(document).ready(function () {
            init();
        });

        function init() {
            requestData();
            $timeout(function () {
                processData();
                $log.debug($scope.streamers);
                $scope.showSearchResults = true;
            }, 2000);
        }

        $scope.onRefreshPageDataClicked = function () {
            $scope.showSearchResults = false;
            requestData();
            $timeout(function () {
                processData();
                $log.debug($scope.streamers);
                $scope.showSearchResults = true;
            }, 2000);
        };

        function requestData() {
            var promise = $q.when(true);
            angular.forEach(users, function (user) {
                promise = promise.then(function () {
                    return getUserInformation(user);
                });
            });

            $log.debug(userData);
            $log.debug(channelData);
            $log.debug(streamData);
        }

        function processData() {
            for (var i = 0; i < users.length; i++) {

                clearData();

                if (containsUser(users[i].toLocaleLowerCase())) {

                    streamerInfo.isValidUser = true;
                    for (var j = 0; j < userData.length; j++) {
                        if (userData[j].username === users[i].toLocaleLowerCase()) {
                            streamerInfo.username = userData[j].username;
                            streamerInfo.name = userData[j].name;
                            if (userData[j].bio !== null && userData[j].bio !== undefined && userData[j].bio !== '') {
                                streamerInfo.bio = userData[j].bio;
                            }
                            streamerInfo.logo = userData[j].logo;
                            break;
                        }
                    }

                    for (var k = 0; k < channelData.length; k++) {
                        if (channelData[k].user === users[i].toLocaleLowerCase()) {
                            streamerInfo.isStreaming = true;
                            streamerInfo.viewers = channelData[k].viewers;
                            streamerInfo.game = channelData[k].game;
                            streamerInfo.fps = Math.round(channelData[k].fps);
                            break;
                        }
                    }

                    for (var l = 0; l < streamData.length; l++) {
                        if (streamData[l].user === users[i].toLocaleLowerCase()) {
                            streamerInfo.isMature = streamData[l].isMature;
                            streamerInfo.language = streamData[l].language;
                            streamerInfo.nowStreaming = streamData[l].nowStreaming;
                            streamerInfo.streamViews = streamData[l].streamViews;
                            streamerInfo.url = streamData[l].url;
                            break;
                        }
                    }
                } else {
                    streamerInfo.username = users[i];
                    streamerInfo.name = users[i];
                }
                $scope.streamers.push(streamerInfo);
            }
        }

        function clearData() {
            streamerInfo = {
                username: '',
                name: '',
                bio: "TBD",
                logo: 'https://dl.dropboxusercontent.com/u/12474798/Placeholder_couple_superhero_final.png',
                isValidUser: false,

                isStreaming: false,
                viewers: 0,
                game: '',
                fps: 0,

                nowStreaming: '',
                streamViews: 0,
                language: '',
                isMature: false,
                url: ''
            };
        }

        function getUserInformation(user) {
            HttpService.getUserInformation(user.toLowerCase(), function (response) {
                onGetUserInformationSuccess(response, user);
            }, onGetUserInformationError);
        }

        function onGetUserInformationSuccess(data, user) {
            $log.debug("Successfully retrieved user data.");
            //$log.debug(data);
            userData.push({
                username: data.name,
                name: data.display_name,
                bio: data.bio,
                logo: data.logo
            });

            getChannelInformation(user);
        }

        function onGetUserInformationError(data) {
            $log.debug("Error retrieving user data.");
            $log.debug(data);
            UtilService.showToastMessage("Error retrieving user data.");
        }

        function getChannelInformation(user) {
            HttpService.getChannelInformation(user.toLowerCase(), function (response) {
                onGetChannelInformationSuccess(response, user);
            }, onGetChannelInformationError);
        }

        function onGetChannelInformationSuccess(response, user) {
            $log.debug("Successfully retrieved channel data.");
            //$log.debug(response);
            if (response.stream !== null) {
                channelData.push({
                    user: response.stream.channel.name,
                    isStreaming: true,
                    viewers: response.stream.viewers,
                    game: response.stream.game,
                    fps: response.stream.average_fps
                });
            }

            getStreamInformation(user);
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
        }

        function onGetStreamInformationError(response) {
            $log.debug("Error retrieving stream data.");
            $log.debug(response);
            UtilService.showToastMessage("Error retrieving stream data.");
        }

        $scope.onMoreInfoButtonClicked = function (username, bio) {
            DialogService.showAlert(null, username + "'s bio", bio, "close");
        }

        $scope.onCardClick = function (streamer) {
            if(stramer.isValidUser){
                $window.open(streamer.url, '_blank');
            }
        }

        $scope.isStreamingColor = function (value) {
            return value ? {
                color: 'green'
            } : {
                color: 'red'
            }
        }

        $scope.isMatureColor = function (value) {
            return value ? {
                color: 'red'
            } : {
                color: 'gray'
            }
        }

        function containsUser(user) {
            for (var i = 0; i < userData.length; i++) {
                if (userData[i].username === user) {
                    return true;
                }
            }
            return false;
        }
    });
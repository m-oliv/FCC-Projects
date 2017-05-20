'use strict';

angular.module('fccPomodoro', ['ngMaterial'])
    .controller('PomodoroDashboardController', function ($scope, $log, $q, $timeout, $window) {
         $scope.time = { break: 0, work: 0};
         $scope.timerBreak = 0;
         $scope.timerWork = 0;

         /**
          * TODO: count the time
          see this:
            - https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
            - https://stackoverflow.com/questions/12050268/angularjs-make-a-simple-countdown
          */
    });
'use strict';

angular.module('fccPomodoro', ['ngMaterial'])
  .controller('PomodoroDashboardController', function ($scope, $log, $interval) {
    $scope.time = {
      break: 0,
      work: 0
    };
    $scope.timerBreak = 0;
    $scope.timerWork = 0;
    var workPromise, breakPromise;

    // get the time in hh:mm:ss
    function getTimeElements(timer) {
      return {
        hours: Math.floor(timer / 3600),
        minutes: Math.floor(timer % 3600 / 60),
        seconds: Math.floor(timer % 3600 % 3600)
      }
    }

    // process timer
    $scope.onStartTimerClick = function (timer, type) {
      if (type === 0) {
        // work timer
        workPromise = $interval(function (timerWork) {
          $scope.timerWork = Number($scope.time.work) * 60;

        }, 
        1000);
      } else if (type === 1) {
        // break timer
        breakPromise = $interval(function (timerWork) {
          $scope.timerBreak = Number($scope.time.break) * 60;

        }, 
        1000);
      }

    }

    // stop the timer
    $scope.stopTimer = function (type) {
      if (type === 0) {
        // stop work timer
        $interval.cancel(workPromise);
      } else if (type === 1) {
        // stop break timer
        $interval.cancel(breakPromise);
      }else{
        // stop everything if the condition fails
        $interval.cancel(workPromise);
        $interval.cancel(breakPromise);
      }
    }

    /**
     * TODO: count the time
     see this:
       - https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
       - https://stackoverflow.com/questions/12050268/angularjs-make-a-simple-countdown
     */
  });
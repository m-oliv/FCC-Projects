'use strict';

angular.module('fccPomodoro', ['ngMaterial'])
    .controller('PomodoroDashboardController', function ($scope, $log, $q, $timeout, $window) {
         $scope.time = { break: 0, work: 0};
         
    });
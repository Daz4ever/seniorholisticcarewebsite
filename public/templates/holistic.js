var app = angular.module('holistic',['ui.router', 'ngAnimate', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state({
    name: 'frontpage',
    url: '/',
    templateUrl: 'frontpage.html',
    controller: 'frontpageController'
  });
  $urlRouterProvider.otherwise('/');
});

app.factory("holistic", function($http, $cookies, $rootScope, $state) {

  // SERVICE VARIABLES

  var service = {};




});

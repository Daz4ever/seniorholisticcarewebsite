var app = angular.module('holistic',['ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('root',{
    url: '/',
    views: {
      'contact': {
        templateUrl: 'contact.html',
        controller: 'contactpageController'
      }
    }

  });

  $urlRouterProvider.otherwise('/');
});

app.factory('holistic', function($http, $rootScope, $state) {

  var service = {};

  service.contactform = function(data){
    return $http ({
      method: 'POST',
      url: '/contactform',
      data: data
    });
  };
  return service;
});

app.controller('contactpageController', function($scope, holistic){
  console.log("hello");
  $scope.contactsubmit = function(){
    var data = {
      first: $scope.first_name,
      last: $scope.last_name,
      phone: $scope.phone_number,
      email: $scope.email_address,
      radio: $scope.x,
      question: $scope.anyquestions
    };

    holistic.contactform(data)
    .success(function(data){
      console.log("here", data);
    })
    .error(function(data){
      console.log("failed");
    });
  };

});

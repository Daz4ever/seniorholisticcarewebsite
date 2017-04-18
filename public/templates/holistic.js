var app = angular.module('holistic',['ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('root',{
    url: '/',
    views: {
      'about': {
        templateUrl: 'about.html'
      },
      'care': {
        templateUrl: 'care.html'
      },
      'blog': {
        templateUrl: 'blog.html'
      },
      'contact': {
        templateUrl: 'contact.html',
        controller: 'contactpageController'
      }

    }

  })
  .state({
    name: 'submittedforms',
    url: '/submittedforms',
    templateUrl: 'submittedforms.html',
    controller: 'submittedformsController'
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
  service.allforms = function(){
    return $http ({
      method: 'GET',
      url: '/allforms',
      params: {username: "dom"}
    });
  };
  return service;
});

app.controller('contactpageController', function($scope, holistic){

  $scope.contactsubmit = function(){
    var data = {
      first: $scope.first_name,
      last: $scope.last_name,
      phone: $scope.phone_number,
      email: $scope.email_address,
      radio: $scope.x,
      question: $scope.anyquestions,
      username: "dom"
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

app.controller('submittedformsController', function($scope, $state, holistic){
  $state.go('submittedforms');
  holistic.allforms()
  .success(function(data){
    console.log("alldata", data);

    // var data2 = data.sort(function(a,b){
    //   var c = new Date(a.date);
    //   var d = new Date(b.date);
    //   return c-d;
    // });

    var data2 = data.sort(function(a, b){
      return new Date(a.date).getTime() - new Date(b.date).getTime()});

    console.log("2", data2);
    $scope.forms = data2;

  })
  .error(function(data){
    console.log("failed");
  });

});

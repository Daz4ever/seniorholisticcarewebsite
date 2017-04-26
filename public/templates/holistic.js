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
      'gallery': {
        templateUrl: 'gallery.html'
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
  })
  .state({
    name: 'login',
    url: '/login',
    templateUrl: 'login.html',
    controller: 'loginController'
  });

  $urlRouterProvider.otherwise('/');
});

app.factory('holistic', function($http, $rootScope, $state, $cookies) {

  // $rootScope.cookieData = null;
  // $rootScope.cookieData = $cookies.getObject('cookieData');
  // console.log("Printing initial cookie", $rootScope.cookieData);
  //
  // if ($rootScope.cookieData) {
  // $rootScope.auth = $rootScope.cookieData.token;
  // $rootScope.username = $rootScope.cookieData.username;
  // console.log("GET HERE PLEASE", $rootScope.auth);
  //   console.log("GET HERE PLEASE 2", $rootScope.username);
  //
  // }
  //
  // $rootScope.logout = function(){
  //   $cookies.remove('cookieData');
  //   $rootScope.cookieData = null;
  //   $rootScope.username = null;
  //   $rootScope.auth = null;
  // };

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
      params: {username: $rootScope.username, token: $rootScope.auth}
    });
  };
  service.del = function(id){
    return $http ({
      method: 'POST',
      url: '/delete',
      data: {id: id, username: $rootScope.username, token: $rootScope.auth}
    });
  };
  return service;
});

app.controller('loginController', function($scope, holistic, $cookies, $rootScope){
  $scope.login = function(){
  loginInfo = {
    username: "admin",
    password: $scope.password
  };

  foodlog.login(loginInfo)
  .error(function(data){
    console.log("failed");
    $scope.loginfailed = true;
    $timeout(function(){$scope.loginfailed = false;}, 2500);


  })
  .success(function(data){
    console.log(data);
    $cookies.putObject('cookieData', data);
    console.log("ADDED COOKIE");
    $rootScope.username = data.username;
    $rootScope.auth = data.token;
    console.log('Hello', $rootScope.username);

    $state.go('submittedforms');
  });
};

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
      username: "admin"
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

  $scope.deleteForm = function(id){
    console.log("am I here????");
    holistic.del(id)
    .success(function(data){
      console.log(data);
      $state.reload();
    })
    .error(function(data){
      console.log("failed");
    });
  };
});

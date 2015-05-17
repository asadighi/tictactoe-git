var app = angular.module('app', ['ngRoute', 'ngResource']);

//---------------
// Routes
//---------------

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeController'
    })
    .when('/:id', {
      templateUrl: '/templates/game.html',
      controller: 'GameController'
    });

}]);
app.controller('HomeController', ['$scope', 'Games', '$location', function ($scope, Games, $location) {


	$scope.newGame = function() {

		if (!$scope.playerName1 ||  !$scope.playerName2)	{
			alert('Player names are required');
			return;
		}
		var game = new Games({ playerName1: $scope.playerName1, playerName2: $scope.playerName2});
        		game.$save(function(newGame){
                 	var gameId = newGame._id;
                 	 $location.path("/" + gameId);
                }, function(error) {
                	alert('Ops! Sorry something went wrong. try again please...')
                });
	};

}]);
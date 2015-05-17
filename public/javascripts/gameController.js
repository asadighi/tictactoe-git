app.controller('GameController', ['$scope', '$routeParams', 'Games', function ($scope, $routeParams, Games) {


	$scope.updateGame = function() {
		$scope.game = Games.get({id: $routeParams.id });
	};

	$scope.cellClass = function(rowIndex, colIndex)
	{
		var cellValue = $scope.game.board[rowIndex][colIndex];
		if (cellValue == 'X') {
			return 'X-Cell occupied-cell';
		}
		if (cellValue == 'O') {
			return 'O-Cell occupied-cell';
		}

		if ($scope.game.winnerNumber)
		{
			return 'occupied-cell';
		}
		return "free-cell";
	};

	$scope.playerMoves = function(rowIndex, colIndex) {
		var cellValue = $scope.game.board[rowIndex][colIndex];
		if (cellValue || $scope.game.winnerNumber) {
			return;
		}
		Games.playerMoves({id: $routeParams.id}, { rowIndex: rowIndex, colIndex: colIndex}, function(game)
		{
			$scope.game = game;			
		});
	};

	$scope.replay = function() {
		Games.replay({id: $routeParams.id}, {}, function(game)
		{
			$scope.game = game;			
		});
	};

	$scope.updateGame();
  
}]);
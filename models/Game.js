//////////////////////////////////////////////
// Game Model
/////////////////////////////////////////////
// In here the model for Game and its corresponding server side logic is defined.
//


var mongoose = require('mongoose'), 
	Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed;

var GameSchema = new mongoose.Schema({
  playerName1: {type:String, required: true},
  playerName2: {type:String, required: true},
  playerTurn: {type: Number, default: 0},
  playerWins1: {type: Number, default: 0},
  playerWins2: {type: Number, default: 0},
  winnerNumber: {type: String},
  board: { type: Mixed, default: [ [null, null, null], [null, null, null], [null, null, null]] }
});

GameSchema.statics.playerMoves = function(gameId, rowIndex, colIndex, callback) {
	var Game = this;
	if (!gameId) {
		callback({status: 400, message: 'gameId is required'});
		return;
	}
	Game.findById(gameId, function (err, game) {
		if (err || !game) {
	  		callback({status: 403, message: 'Invalid gameId was provided'});
	  		return;
		} 
		
		if (!game.board) {
			game.board = [ [null, null, null], [null, null, null], [null, null, null]];
		}

		var symbol = playerSymbol(game.playerTurn);
		game.board[rowIndex][colIndex] = symbol;
		game.playerTurn = 1 - game.playerTurn;
		var winnerSymbol = checkForWinner(game);
		if (winnerSymbol)
		{
			var winnerNumber = playerNumber(winnerSymbol);
			if (winnerNumber == 0) {
				game.playerWins1++;
				game.winnerNumber='0';
			}
			else if (winnerNumber == 1) {
				game.playerWins2++;
				game.winnerNumber='1';
			}
			else {
				game.winnerNumber='-1';
			}

		}
		Game.findByIdAndUpdate(game.id, game, function (err, previousValue) {
		    if (err) { 
		    	callback({ status: 500, message: err } ); 
		    }
		    else {
		    	callback(null, game);
		    }
		  });
	});
};

GameSchema.statics.replay = function(gameId, callback) {
	var Game = this;
	if (!gameId) {
		callback({status: 400, message: 'gameId is required'});
		return;
	}

	Game.findById(gameId, function (err, game) {
		if (err || !game) {
	  		callback({status: 403, message: 'Invalid gameId was provided'});
	  		return;
		} 
		
		game.winnerNumber = null;
		game.board = [ [null, null, null], [null, null, null], [null, null, null]];
		game.playerTurn = 0;
		Game.findByIdAndUpdate(game.id, game, function (err, previousValue) {
		    if (err) { 
		    	callback({ status: 500, message: err } ); 
		    }
		    else {
		    	callback(null, game);
		    }
		  });
		
	});
};

function playerSymbol(playerTurn)
{
	if (playerTurn == 0) {
		return "O";
	}
	return "X";
}

function playerNumber(playerSymbol)
{
	if (playerSymbol == "O") {
		return 0;
	}
	if (playerSymbol == "X") {
		return 1;
	}
	return -1; //This is a tie
}

function checkForWinner(game)
{
	var winningCombinations = 
	[
		[{row: 0, col:0}, {row: 0, col:1}, {row: 0, col:2}],
		[{row: 1, col:0}, {row: 1, col:1}, {row: 1, col:2}],
		[{row: 2, col:0}, {row: 2, col:1}, {row: 2, col:2}],
		[{row: 0, col:0}, {row: 1, col:0}, {row: 2, col:0}],
		[{row: 0, col:1}, {row: 1, col:1}, {row: 2, col:1}],
		[{row: 0, col:2}, {row: 1, col:2}, {row: 2, col:2}],
		[{row: 0, col:0}, {row: 1, col:1}, {row: 2, col:2}],
		[{row: 0, col:2}, {row: 1, col:1}, {row: 2, col:0}],
	];

	var allCellsOccupied = true;
	for (var setId = 0; setId < winningCombinations.length; setId++) {
	  	var winningCombination = winningCombinations[setId];
	  	var winnerSymbol = null;
		for (var cellId = 0; cellId < winningCombination.length; cellId++) {
	  		var cell = 	winningCombination[cellId]; 

	  		var cellSymbol = game.board[cell.row][cell.col];
	  		if (!cellSymbol)
	  		{
	  			allCellsOccupied = false;
	  		}
	  		if (cellId == 0)
	  		{
	  			winnerSymbol = cellSymbol;
	  		}
	  		else
	  		{
	  			if (winnerSymbol != cellSymbol)
	  			{
	  				winnerSymbol = null;
	  				break;
	  			}
	  		}

	  	};
	  	if (winnerSymbol)
	  	{	

	  		return winnerSymbol;
	  	}
	}
	if (allCellsOccupied) {
		return '-'; //This is a tie
	}
	return null;
}

module.exports = mongoose.model('Game', GameSchema);
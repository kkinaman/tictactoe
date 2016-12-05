var prompt = require('prompt');

var Game = function() {
  this.players = ['X', 'O'];
  this.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  this.isWinner = false;
}

Game.prototype.printBoard = function() {
  var printable = this.board.map(row => row.map(square => square ? square : ' '));
  for (var i = 0; i < printable.length; i++) {
    console.log(printable[i]);
  }
};

//player is either X or O, from players
//move is a tuple, the coordinate where to place X or O
//returns whether the move was valid
Game.prototype.markBoard = function(player, move) {
  var row = move[0];
  var col = move[1];
  if (this.board[row][col]) {
    //not valid move
    return false;
  } else {
    this.board[row][col] = player;
    return true;
  }
};

Game.prototype.checkForWinner = function() {
  //if any rows of 3 of either Xs or Os, return true
}

Game.prototype.start = function() {
  console.log('This is the board:');
  this.printBoard();
  console.log('Input moves in format > [row, col]');
  console.log('e.g. [0, 1]');
  console.log('[0, 1, 2]');
  console.log('[1,  ,  ]');
  console.log('[2,  ,  ]');

  // while (!this.isWinner) {
    console.log('Player X, it is your turn');
    prompt.start();
    var player = 0;
    prompt.get(['move'], (err, result) => {
      var move = JSON.parse(result['move']);
      this.markBoard(this.players[0], move);
      this.printBoard();
    });
    if (player) {
      player = 0;
    } else {
      player = 1;
    }
  // }

}

var newGame = new Game();
newGame.start();


// console.log('__|__|__');
// console.log('__|__|__');
// console.log('  |  |  ');
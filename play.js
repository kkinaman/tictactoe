var prompt = require('prompt');

var Game = function() {
  this.players = ['X', 'O'];
  this.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  this.winner = '';
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
  //check rows and columns
  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i].reduce((same, cur) => same === cur ? same : null) ||
      (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i])) {
      if (this.board[i][i] === null) {
        return false;
      }
      this.winner = this.board[i][i];
      return true;
    }
  }
  //check diagonals
  if ((this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) || 
    (this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2])) {
    if (this.board[1][1] === null) {
        return false;
      }
    this.winner = this.board[1][1];
    return true;
  }
}

Game.prototype.start = function() {
  console.log('Welcome to Tic Tac Toe!');
  console.log('Input moves in format > [row, col]');
  console.log('e.g. [0, 1], by this indexing scheme:');
  console.log('[0, 1, 2]');
  console.log('[1,  ,  ]');
  console.log('[2,  ,  ]');

  var promptForMove = player => {
    if (this.checkForWinner()) {
      console.log('PLAYER', this.winner, 'IS THE WINNER! :D')
      return;
    }
    console.log('Player', this.players[player], ', it is your turn');
    prompt.get(['move'], (err, result) => {
      try {
        var move = JSON.parse(result['move']);
      } catch (e) {

      }
      if (!Array.isArray(move) || !this.markBoard(this.players[player], move)) {
        console.log('Invalid input (that square may already be taken)');
      }
      this.printBoard();

      if (player) {
        player = 0;
      } else {
        player = 1;
      }

      promptForMove(player);
    });
  }

  var player = 0;
  
  prompt.start();

  promptForMove(player);

}

var newGame = new Game();
newGame.start();

//Joseph Dykstra
//2014-08-20

/////////// MODIFIABLE ///////////
const BOARD_HEIGHT = 10 //height of the board
const BOARD_WIDTH = 10  //width of the board
const BLOCK_SIZE = 30   //pixels for each block
const START_LEN = 5     //length the snake starts out as
const ADD_LEN = 3       //length the snake adds after eating food
const WAIT_MS = 500     //milleseconds between steps
const D_RIGHT = 0   //direction (right)
const D_UP = 1      //direction (up)
const D_LEFT = 2    //direction (left)
const D_DOWN = 3    //direction (down)

////////// UNMODIFIABLE //////////
var snakeDir = D_RIGHT
var snakeLen = START_LEN
var board = []
var createBoard = function() {
	var populator = []
	for (var i=0; i<BOARD_WIDTH;  i++) {
		populator.push(0)
	}
	for (var i=0; i<BOARD_HEIGHT; i++) {
		board.push(populator)
	}
}

var printBoardToConsole = function (piece, x, y) {
	if (!str) {
		var str = ''
	}
	str += piece + ' '
	if (y>=BOARD_SIZE-1) { console.log(str) }
};

var BoardIterator = function BoardIterator(cb) {
	cb = cb || printBoardToConsole
	return function() {
		for (var i=0; i<BOARD_WIDTH; i++) {
			for (var j=0; j<BOARD_HEIGHT; j++) {
				cb(board[i][j], Number(i), Number(j))
			}
		}
	}
}

var makeSnake = function () {
	board[0] = board[0].map(function (e, i) {
		return i<START_LEN ? i+1 : 0
	})
}

var printBoard = new BoardIterator(function (piece, x, y) {
	if (piece>0) {
		//fill(0, 0, 255)
		//rect(x*BLOCK_SIZE, y*BLOCK_SIZE, (x+1)*BLOCK_SIZE, (y+1)*BLOCK_SIZE)
	}
})

var addlife = new BoardIterator(function (piece) {
	if (piece>0) {
		piece += ADD_LEN
	}
})

var findHead = function(cb) {
	var max = -Infinity
	var maxX = -1
	var maxY = -1
	BoardIterator(function (piece, x, y) {
		if (piece>max) {
			max = piece
			maxX = Number(x)
			maxY = Number(y)
		}
	})
	cb(maxX, maxY)
}

var step = function () {
	findHead(function (x, y) {
		switch(snakeDir) {
			case D_RIGHT: (x<BOARD_WIDTH-1) ?  board[x+1][y] = snakeLen : return false
			case D_UP:    (y>0) ?              board[x][y-1] = snakeLen : return false
			case D_LEFT:  (x>0) ?              board[x-1][y] = snakeLen : return false
			case D_DOWN:  (y<BOARD_HEIGHT-1) ? board[x][y+1] = snakeLen : return false
			default: throw Error("invalid direction")
		}
	})
	return true
}

var io = function () {
	//INPUT!!!
	printBoard() //OUTPUT
}

///////// PLAY /////////
resetBoard()

var playing = setInterval(io, WAIT_MS)


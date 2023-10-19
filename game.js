// Stores the logic related to the game itself
const gameController = (function () {
  //Add Event Listener to the tiles
  const _tileListener = (function () {
    const _tiles = document.querySelectorAll(".tile");

    _tiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        gameBoard.addMarkerToBoard(
          getCurrentPlayer().marker,
          +tile.dataset.index
        );

        displayController.updateBoardRender();
        _checkForWin(); //TODO
      });
    });
  })();

  let _players = new Array();

  const _setPlayer = (playerName, playerMarker) =>
    _players.push(createPlayer(playerName, playerMarker));

  const player1 = _setPlayer("Player 1", "X"); //REMOVE AFTER TESTING
  const player2 = _setPlayer("Player 2", "0"); //REMOVE AFTER TESTING

  //Get current Player, alternating between both
  const getCurrentPlayer = () => {
    return _players[gameBoard.getEmptyTiles().length % 2 != 0 ? 0 : 1];
  };

  const _checkForWin = () => {
    const _checkForRow = () => {
      for (let i = 0; i <= 6; i += 3) {
        let currentRow = [];
        for (let j = i; j <= i + 2; j++) {
          currentRow[j] = gameBoard.getTile(j);
        }

        if (
          currentRow.every((tile) => tile == "X") ||
          currentRow.every((tile) => tile == "0")
        ) {
          return true;
        }
      }
    };

    const _checkForCollum = () => {
      for (let i = 0; i < 3; i++) {
        let currentCol = [];
        for (let j = i; j <= i + 6; j += 3) {
          currentCol[j] = gameBoard.getTile(j);
        }

        if (
          currentCol.every((tile) => tile == "X") ||
          currentCol.every((tile) => tile == "0")
        ) {
          return true;
        }
      }
    };

    const _checkForDiagonal = () => {}; // TODO

    if (_checkForRow() || _checkForCollum()) {
      console.log("Win"); // REMOVE AFTER TESTING
    }
  }; //TODO

  return { getCurrentPlayer };
})();

// Stores the logic that manages the board
const gameBoard = (function () {
  let _board = new Array(9);

  const getBoard = () => _board;

  const getTile = (tile) => _board[tile];

  const getEmptyTiles = () => {
    let _emptyTiles = new Array();
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] == null) {
        _emptyTiles.push(i);
      }
    }
    return _emptyTiles;
  };

  const addMarkerToBoard = (marker, tile) => {
    if (getEmptyTiles().includes(tile)) {
      _board[tile] = marker;
    }
  };

  return { getBoard, getTile, getEmptyTiles, addMarkerToBoard };
})();

//Stores the logic that renders the game
const displayController = (function () {
  const _tiles = document.querySelectorAll(".tile");
  // Render marker on HTML
  const updateBoardRender = () => {
    _tiles.forEach((tile) => {
      tile.textContent = gameBoard.getBoard()[+tile.dataset.index];
    });
  };

  return { updateBoardRender };
})();

//Player Factory
function createPlayer(name, marker) {
  return { name, marker };
}

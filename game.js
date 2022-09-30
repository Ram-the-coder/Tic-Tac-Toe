function Game({ onCompleteTurn }) {
  this.state = {
    playerToPlay: X,
    board: createArray({
      length: 3,
      mapper: () => Array(3).fill(EMPTY),
    }),
    isGameOver: false,
    winner: null,
    difficulty: DIFFICULTY.EASY,
  };

  this.setState = (state) => (this.state = state);
  this.updateState = (updates) => this.setState({ ...this.state, ...updates });

  this.checkGameCompletion = () => {
    const winner = getWinner(this.state.board);
    if (winner) this.updateState({ winner, isGameOver: true });
    if (isDraw(this.state.board)) this.updateState({ isGameOver: true });
  };

  this.completeTurn = () => {
    this.updateState({ playerToPlay: otherPlayer(this.state.playerToPlay) });
    this.checkGameCompletion();
    onCompleteTurn();
    if (!this.state.isGameOver && this.state.playerToPlay === O) aiMove(this);
  };

  this.makeMove = (i, j) => {
    throwIfMoveIsInvalid(this.state, i, j);
    this.updateState({
      board: getBoardAfterMove(this.state.board, this.state.playerToPlay, i, j),
    });
    this.completeTurn();
  };
}

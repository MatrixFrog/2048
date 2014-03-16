class Grid {
  constructor(size) {
    this.size = size;

    this.cells = [];

    this.build();
  }

  // Build a grid of the specified size
  build() {
    for (let x = 0; x < this.size; x++) {
      let row = this.cells[x] = [];

      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }
  };

  // Find the first available random position
  randomAvailableCell() {
    let cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };

  availableCells() {
    let cells = [];

    this.eachCell(function (x, y, tile) {
      if (!tile) {
        cells.push({x, y});
      }
    });

    return cells;
  };

  // Call callback for every cell
  eachCell(callback) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  };

  // Check if there are any cells available
  cellsAvailable() {
    return !!this.availableCells().length;
  };

  // Check if the specified cell is taken
  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  };

  cellOccupied(cell) {
    return !!this.cellContent(cell);
  };

  cellContent(cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  };

  // Inserts a tile at its position
  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  };

  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  };

  withinBounds(position) {
    return position.x >= 0 && position.x < this.size &&
           position.y >= 0 && position.y < this.size;
  };
}
window.Grid = Grid;

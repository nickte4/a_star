/* File for Spot object */
// Spot is the grid space
class Spot {
  constructor(i, j) {
    this.i = i; // col pos
    this.j = j; // row pos
    this.f = 0; // function f (total cost)
    this.g = 0; // function g (actual cost)
    this.h = 0; // function h (remaining cost)
    this.neighbors = []; // all neighbors of spot
    this.previous = undefined; // pointer to where it came from
    this.wall = false; // marks if it is a wall
    // decimal == chance to be a wall (e.g. 0.1 = 10% chance)
    if (random(1) < 0.3) {
      this.wall = true;
    }
  }

  show(spotColor) {
    fill(spotColor);
    if (this.wall) fill(0);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  addNeighbors(grid) {
    var i = this.i;
    var j = this.j;
    // all neighbors of pixel on each side
    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
    // all neighbors of pixel on its corners
    if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0) this.neighbors.push(grid[i + 1][j - 1]);
    if (i > 0 && j < rows - 1) this.neighbors.push(grid[i - 1][j + 1]);
    if (i < cols - 1 && j < rows - 1) this.neighbors.push(grid[i + 1][j + 1]);
  }
}

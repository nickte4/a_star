/* File for all p5.js graphics on screen */
const cols = 5;
const rows = 5;
var grid = new Array(cols);

// Spot is the grid space
function Spot() {
  this.f = 0;
  this.g = 0;
  this.h = 0;
}

function setup() {
  // sets up size of canvas window
  createCanvas(400, 400);
  console.log("*A");

  // Making a 2D array (grid space)
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    grid[colIdx] = new Array(rows);
  }

  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rowIdx; rowIdx++) {
      grid[colIdx][rowIdx] = new Spot();
    }
  }
}

// draw is the animation loop to continuously draw graphics to screen
function draw() {
  // background set to black (0)
  background(0);
}

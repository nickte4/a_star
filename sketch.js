/* File for all p5.js graphics on screen */
const cols = 5;
const rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start; // starting node
var end; // ending node i.e. destination
var w, h;

// Spot is the grid space
function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show = function () {
    fill(255);
    noStroke();
    rect(this.x * w, this.y * h, w - 1, h - 1);
  };
}

function setup() {
  // sets up size of canvas window
  createCanvas(400, 400);

  w = width / cols;
  h = height / rows;

  // Making a 2D array (grid space)
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    grid[colIdx] = new Array(rows);
  }

  // place a Spot in each pixel of grid
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      grid[colIdx][rowIdx] = new Spot(colIdx, rowIdx);
    }
  }

  // the start is the top left pixel
  start = grid[0][0];
  // the  end is the bottom right pixel (could be randomized)
  end = grid[cols - 1][rows - 1];

  openSet.push(start);

  console.log(grid);
}

// draw is the animation loop to continuously draw graphics to screen
function draw() {
  // normally, this would be a while loop, but draw() itself is a loop
  if (openSet.length > 0) {
    // keep going
  } else {
    // no solution
  }
  // background set to black (0)
  background(0);

  // debug: draw dots at each grid pixel
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      grid[colIdx][rowIdx].show();
    }
  }
}

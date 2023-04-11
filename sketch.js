/* File for all p5.js graphics on screen */
function removeFromArray(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elem) {
      arr.splice(i, 1);
    }
  }
}

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
  this.neighbors = [];

  this.show = function (spotColor) {
    fill(spotColor);
    noStroke();
    rect(this.x * w, this.y * h, w - 1, h - 1);
  };

  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;
    // all neighbors of pixel on each side
    this.neighbors.push(grid[i + 1][j]);
    this.neighbors.push(grid[i - 1][j]);
    this.neighbors.push(grid[i][j + 1]);
    this.neighbors.push(grid[i][j - 1]);
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
    var winner = 0; // idx of best node to take
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    // best node to take
    var current = openSet[winner];

    if (current === end) {
      console.log("DONE!");
    }

    // remove current from open set
    removeFromArray(openSet, current);
    // add current to closed set
    closedSet.push(current);
  } else {
    // no solution
  }
  // background set to black (0)
  background(0);

  // debug: draw dots at each grid pixel
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      grid[colIdx][rowIdx].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
}

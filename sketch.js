/* File for all p5.js graphics on screen */
// size of grid
const cols = 20;
const rows = 20;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start; // starting node
var end; // ending node i.e. destination
var w, h;
var path = [];

function removeFromArray(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // return dist(a.i, a.j, b.i, b.j);
  return abs(a.i - b.i) + abs(a.j - b.j);
}

// Spot is the grid space
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;

  this.show = function (spotColor) {
    fill(spotColor);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  };

  this.addNeighbors = function (grid) {
    const i = this.i;
    const j = this.j;
    // all neighbors of pixel on each side
    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i < 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j < 0) this.neighbors.push(grid[i][j - 1]);
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

  // add neighbors to each pixel in grid
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      grid[colIdx][rowIdx].addNeighbors(grid);
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
      noLoop();
      console.log("DONE!");
    }

    // remove current from open set
    removeFromArray(openSet, current);
    // add current to closed set
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + 1;
        if (openSet.includes(neighbor)) {
          // node already checked before, see if its g
          // is worse than current path
          if (tempG < neighbor.g) neighbor.g = tempG;
        } else {
          // new node discovered
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    // no solution
  }
  // background set to black (0)
  background(0);

  // debug: draw dots at each grid pixel
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      // color white
      grid[colIdx][rowIdx].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    // color red
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    // color green
    openSet[i].show(color(0, 255, 0));
  }

  // find current shortest path
  path = [];
  var temp = current;
  while (temp) {
    path.push(temp);
    temp = temp.previous;
  }

  for (var i = 0; i < path.length; i++) {
    // color blue
    path[i].show(color(0, 0, 255));
  }
}

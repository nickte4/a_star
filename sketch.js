/* File for all p5.js graphics on screen */
// size of grid
const cols = 50;
const rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start; // starting node
var end; // ending node i.e. destination
var w, h;
var path = [];

// finds and draws current path as blue
function findAndDrawCurrPath(current, path) {
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

// draws potential grid spaces green
function drawGreenSpaces(openSet) {
  for (var i = 0; i < openSet.length; i++) {
    // color green
    openSet[i].show(color(0, 255, 0));
  }
}

// draws discarded grid spaces red
function drawRedSpaces(closedSet) {
  for (var i = 0; i < closedSet.length; i++) {
    // color red
    closedSet[i].show(color(255, 0, 0));
  }
}

// draws grid spaces as white
function drawGridSpaces(grid) {
  for (var colIdx = 0; colIdx < cols; colIdx++) {
    for (var rowIdx = 0; rowIdx < rows; rowIdx++) {
      // color white
      grid[colIdx][rowIdx].show(color(255));
    }
  }
}

// checks if current node is at the end
function checkIfFinished(currSpot, endSpot) {
  if (currSpot == endSpot) {
    noLoop();
    console.log("DONE!");
  }
}

// gets the best node from the open set
// USE PRIORITY QUEUE HERE
function findBestNode(openSet) {
  // linear search time algo --> could become better with min heap
  let winner = 0;
  for (var i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
      winner = i;
    }
  }
  return winner;
}

// evaluates the cost of neighbors around current spot
function checkNeighbors(neighbors, current, openSet) {
  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];

    if (!closedSet.includes(neighbor) && !neighbor.wall) {
      var tempG = current.g + 1;

      var newPath = false;
      if (openSet.includes(neighbor)) {
        // node already checked before, see if its g is worse than current path
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
          newPath = true;
        }
      } else {
        // new node discovered
        neighbor.g = tempG;
        newPath = true;
        openSet.push(neighbor);
      }

      if (newPath) {
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  }
}

// remove element from array
function removeFromArray(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j); // euclidean distance
  // return abs(a.i - b.i) + abs(a.j - b.j); // manhattan distance
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
  // the  end is the bottom right pixel
  end = grid[cols - 1][rows - 1];
  start.wall = false; // make sure start is not wall
  end.wall = false; // make sure end is not a wall

  // RANDOM SETTING
  // var randCol = Math.floor(random(0, cols - 1));
  // var randRow = Math.floor(random(0, rows - 1));
  // end = grid[randCol][randRow];

  openSet.push(start);

  console.log(grid);
}

// draw is the animation loop to continuously draw graphics to screen
function draw() {
  // normally, this would be a while loop, but draw() itself is a loop
  if (openSet.length > 0) {
    // keep going

    // get index of best node
    var winner = findBestNode(openSet);
    // best node to take
    var current = openSet[winner];
    // check if we are at destination
    checkIfFinished(current, end);

    // must not be done yet, move best node into closed set
    removeFromArray(openSet, current);
    closedSet.push(current);

    checkNeighbors(current.neighbors, current, openSet);
  } else {
    // no solution
    console.log("no solution");
    noLoop();
    return;
  }
  // background set to black (0)
  background(0);

  // draw white grid spaces
  drawGridSpaces(grid);

  // draw discarded grid spaces red
  drawRedSpaces(closedSet);

  // draw potential grid spaces green
  drawGreenSpaces(openSet);

  // find and draw current shortest path blue
  findAndDrawCurrPath(current, path);

  // show where the end grid space is
  end.show(color("yellow"));
}

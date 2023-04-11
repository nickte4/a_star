/*
 * File for implementing a priority queue
 * using an array implementation of binary min-heap
 */
class pQueue {
  constructor(size) {
    this.heap = new Array(size);
    this.size = -1;
  }
  // PRIVATE METHODS
  // return index of parent of a given node (using its index)
  #parent(i) {
    return parseInt((i - 1) / 2);
  }

  // return index of left child of a given node
  #leftChild(i) {
    return parseInt(2 * i + 1);
  }

  // return index of right child of a given node
  #rightChild(i) {
    return parseInt(2 * i + 2);
  }

  #swap(i, j) {
    var temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // shifts node up to maintain heap property
  #shiftUp(i) {
    // swap nodes while the parent is greater than the curr node
    while (i > 0 && this.heap[this.#parent(i)].f > this.heap[i].f) {
      // swap parent and curr node
      this.#swap(this.#parent(i), i);
      // update i to parent of i
      i = this.#parent(i);
    }
  }

  // shifts node down to maintain heap property
  #shiftDown(i) {
    var minIndex = i;
    // get left child index
    var leftChildIdx = this.#leftChild(i);

    // if the left child is lesser than curr, swap indices
    if (
      leftChildIdx <= this.size &&
      this.heap[leftChildIdx].f < this.heap[minIndex].f
    ) {
      minIndex = leftChildIdx;
    }

    // get right child index
    var rightChildIdx = this.#rightChild(i);
    if (
      rightChildIdx <= this.size &&
      this.heap[rightChildIdx].f < this.heap[minIndex].f
    ) {
      minIndex = rightChildIdx;
    }

    // swap nodes if minIndex changed
    if (i != minIndex) {
      this.#swap(i, minIndex);
      this.#shiftDown(minIndex);
    }
  }

  // PUBLIC METHODS
  insert(elem) {
    this.size = this.size + 1;
    this.heap[this.size] = elem;
    // shift up to maintain heap property
    this.#shiftUp(this.size);
  }

  length() {
    return this.size;
  }

  extractMin() {
    var result = this.heap[0];
    // replace value at root with last leaf
    this.heap[0] = this.heap[this.size];
    this.size = this.size - 1;

    // shift down replaced root to maintain heap property
    this.#shiftDown(0);
    return result;
  }

  getMin() {
    return this.heap[0];
  }

  remove(elem) {
    var elemIdx = 0;
    for (var i = 0; i < this.size; i++) {
      if (this.heap[i] == elem) {
        elemIdx = i;
        break;
      }
    }
    this.heap[elemIdx] = this.getMin() + 1;

    // shift up node to root of heap
    this.#shiftUp(elemIdx);
    this.extractMin();
  }

  contains(elem) {
    for (var i = 0; i <= this.size; i++) {
      if (this.heap[i] == elem) return true;
    }
    return false;
  }

  elem(i) {
    return this.heap[i];
  }
}

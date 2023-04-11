/*
 * File for implementing a priority queue
 * using an array implementation of binary min-heap
 */
class pQueue {
  constructor(size) {
    var heap = Array(size).fill(0);
    this.size = -1;
  }
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
    var temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  // shifts node up to maintain heap property
  #shiftUp(i) {
    // swap nodes while the parent is greater than the curr node
    while (i > 0 && heap[this.#parent(i)].f > H[i].f) {
      // swap parent and curr node
      this.#swap(parent(i), i);
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
    if (leftChildIdx <= this.size && heap[leftChildIdx].f < heap[minIndex].f) {
      minIndex = leftChildIdx;
    }

    // get right child index
    var rightChildIdx = this.#rightChild(i);
    if (
      rightChildIdx <= this.size &&
      heap[rightChildIdx].f < heap[minIndex].f
    ) {
      minIndex = rightChildIdx;
    }

    // swap nodes if minIndex changed
    if (i != minIndex) {
      this.#swap(i, minIndex);
      this.#shiftDown(minIndex);
    }
  }

  insert(elem) {
    this.size = this.size + 1;
    heap[this.size] = elem;
    // shift up to maintain heap property
    this.#shiftUp(this.size);
  }

  extractMin() {
    var result = heap[0];
    // replace value at root with last leaf
    heap[0] = heap[this.size];
    this.size = this.size - 1;

    // shift down replaced root to maintain heap property
    this.#shiftDown(0);
    return result;
  }

  getMin() {
    return heap[0];
  }

  remove(elem) {
    var elemIdx = 0;
    for (var i = 0; i < this.size; i++) {
      if (heap[i] == elem) {
        elemIdx = i;
        break;
      }
    }
    heap[elemIdx] = this.getMin() + 1;

    // shift up node to root of heap
    this.#shiftUp(elemIdx);
    this.extractMin();
  }
}

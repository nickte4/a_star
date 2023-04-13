# a_star

## **About The Project:**

A JavaScript project implementing the A-Star pathfinding algorithm using TheCodingTrain's tutorial video.

## **Built With**

- HTML (minimal)
- CSS (minimal)
- JavaScript

## **Scope**

Created with the A_Star algorithm. A part of it was built using a Priority Queue implemented via a min-heap. Details about this is below in **Sets using a Priority Queue**.

## **Description:**

The following project was created using TheCodingTrain's Challenge 51 Video about A-Star Pathfinding. This algorithm is a slight alteration on Djikstra's algorithm for finding the shortest path to a destination. This algorithm is traditionally seen on graphs with weighted edges (these weights signifying the cost of reaching from one node to another). This algorithm can be seen in a variety of forms--most obviously in video games (think League of Legends point-and-click pathfinding).

This project was created in JavaScript using the p5 graphics library.

# **A-Star Pathfinding:**

So a little more about A-Star Pathfinding. As mentioned before, it's an alteration of Djikstra's algorithm which essentially centers around answering the question of "What is the shortest path to reach node B from node A?"

In Djikstra's algorithm, (explained in very layman's terms) there (usually) are a number of nodes between node A and node B. Connecting all of the nodes are edges with an "edge weight". This weight is essentially the cost of reaching a node. If the weight from (A,C) = 5, that means it costs 5 to reach node C from node A. This cost can be thought of as the distance between the nodes. An interesting thing about this algorithm though, it finds the shortest path from node A to every other node. So, rather than achieving a straight up node A to node B short path, we can find node A to node anything. This will allow us to find a short path to node B as a consequence (there is a nice proof explaining that this works mathematically but that's not coding so BORING--so I won't go into it.)

In the A-Star algorithm, there is a function f(n) = g(n) + h(n). g is the accumulating 'actual' cost from beginning to end. This is the Djikstra's part of the algorithm. h is the calculation of how long will it take to get to the end from the current point. These two functions combined into f will tell us how long it takes to get to each node.

A note about h:
Since we would only actually know g (as we can calculate how long it took to get to our current node), we don't actually know h or how much longer till the end. Thus, we take an educated guess in which we take the literal distance (a straight line from current node to end node) as an estimate. Note! This estimate will always be an underestimate since this path would be the quickest (im)possible path to take. The function h must be an underestimate--otherwise the final answer may be wrong.

The following algorithm is the basis of A-Star: at a node, all other nodes connected to it are assigned a cost value f based on how long it took to get there (g) and how much longer till end (h). Then the connected node with the lowest cost is taken, and the process repeats for this new node.

# **How the canvas is set up:**

It will be less like a graph with nodes and edge weights and more like a grid where each grid space is free unless there is an obstacle occupying it.

```

| S o o o o o |
| o o 0 o o o |
| o o o o 0 o |
| 0 o o o o E |

```

In the above example, each open space is an (o), start is (S), end is (E), and obstacle is (0). The algorithm will calculate its cost based on how many open spaces it took to reach e. This would be the typical set-up to find the shortest path in a pixel grid space.

# **Open and Closed Set:**

There is a notion of two sets used in this algorithm.
The closed set--which stores all nodes that have been evaluated and do not need to be revisited.

The open set--stores all nodes that need to be evaluated.

The algorithm finishes either when the open set is empty--i.e. nothing is left to be evaluated--or when the destination is reached beforehand.

# **Sets using a Priority Queue**

So this was probably the most challenging part of the algorithm--which was not even a part of the actual algorithm funnily enough. Essentially, one of the initial pitfalls of the previous iteration (commit id: 0c3c64c) was that the best node to use in the open set was found via a O(n) linear search algorithm (just using a for loop basically).

An optimization that the CodingTrain suggested was to use a priority queue that placed the node with the least f at the top of the queue. To implement this, I used a min-heap. I used [GeeksForGeeks](https://www.geeksforgeeks.org/priority-queue-using-binary-heap/) as a guide for this.

One of the main challenges that came with this was that I had to figure out how to create classes in JS ES6 and use them in other files. Another problem I kept running into was how to iterate over the priority queue/min-heap. I tried an iterator which did not want to work whatsoever, so I switched gears and just iterated over the heap itself with a for loop. This is where one of the ineffiencies lie for this data structure.

# **Current Ineffiencies**

1. Code may be confusing in its organization. Could use better sectioning.

2. Sets are implemented using a priority queue via a min-heap. This means the following (worst-case) time complexities:

```
Insertion: O(log(n))
Deletion: O(log(n))
GetMin: O(1)
Search: O(N)
```

This makes the sets quite fast to insert and delete an element, extraordinarily fast to get the min. element, but unfortunately slow to search for an element.

## **Contact**

Nick Topacio - ntopacio25@gmail.com

## **Acknowledgments**

- [GeeksForGeeks](https://www.geeksforgeeks.org/priority-queue-using-binary-heap/)
- [Coding Train Video](https://www.youtube.com/watch?v=aKYlikFAV4k&t=13s&ab_channel=TheCodingTrain)

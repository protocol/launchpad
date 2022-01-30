---
description: Distributed Data Structures
---

## Distributed Data Structures

### Beyond File Data

It's easy to think primarily in terms of files, (particularly when "file" is in the IPFS acronym!), but content addressed data is so much more powerful than just a mechanism for addressing plain files. File data in IPFS, using DAG-PB and UnixFS has fixed layouts, a limited Data Model, and room for a few pieces of additional properties to represent directory structures and basic file metadata.

If files were enough for data storage, we would not need databases with sophsticated data models and capabilities to organize and address sets and subsets of arbitrary data types. But we obviously do need these tools to expand the possibilities in application development. In web3 application development, we need our databases to be distributed, robust and scalable. The IPLD Data Model and the suite of IPLD tooling and libraries are intended to meet this challenge.

### Persistent and Immutable

**Persistent and immutable data structures are not new.** Functional Programming leans heavily on these concepts and research has been going on into these data structures for a very long time. Standard libraries for Scala, Clojure, Haskell, etc. are full of data structures that translate (almost) directly to the distributed, content-addressed world.

The HAMT algorithm used for UnixFS filesystem sharding, as mentioned in the [IPLD & IPFS](ipfs.md) section, is an excellent example of such an algorithm and you'll find variations of this algorithm in the various "collections" implementations in many languages.

Selecting algorithms for building, traversing and mutating content addressed data structures require careful consideration of the trade-offs. Algorithms that are efficient in memory-space, often don't translate well to a world where we need to deal with network latency.

* The **size** of the units of content addressed data ("blocks" in the IPLD world) is one of the most important considerations, particularly when navigating graphs requires loading one block before knowing what other blocks it connects to, leading to compounding latency problems.
* The **depths** and **density** of graphs can also incur latency problems. Generally the fewer block loads the better. Algorithms that pack data densely and require fewer hops to access a users' data are preferred where possible.

Directional and acyclic graphs of immutable pieces of data can be challenging to wrangle but scale powerfully.

### Example: Super-large array

Let's build an algorithm for storing a scalable distributed *array*. We want to be able to store a few, to a few billion elements in our array, and do so with IPLD. Our array could be distributed across many parties, and we shouldn't need to have *all* of the blocks that make up our array just to access a single element. Accessing one element in a super-large array should require minimal block loads from our storage system (or distributed network).

For simplicity, our array cannot be sparse and must include contiguous elements starting from index `0` *(aside: sparse arrays are an entirely different matter, although something the Filecoin chain has to deal with)*.

Let's begin with a simple IPLD block to hold our array data:

```
[ e0, e1, e2, e3, e4 ]
```

(Our elements could be any data type, perhaps integers, strings, or even CIDs of other blocks in other graphs!).

We could encode this into an IPLD block, ideally with DAG-CBOR for efficiency. Our single block is already useful, we can address elements 0 to 4 with one block. This block is our "root", but it's also the entirety of our "graph" at this stage.

Let's set a constraint on the size of an individual block, so we don't end up simply encoding a billion elements into a single IPLD block (and likely break or violate constraints of the system we're working within, such as IPFS). For the sake of our example we'll set the limit on any individual block to `5` elements.

Adding additional elements to our array is going to require adding more blocks. Let's add 3 more elements:

```
[ e0, e1, e2, e3, e4 ]   [ e5, e6, e7 ]
```

We no longer have a coherent graph, we simply have two blocks, so we need to stitch them together, so we add a new level to our graph:

```
Height 2:                 [ L1.0, L1.1 ]
                             /       \
Height 1:  [ e0, e1, e2, e3, e4 ]   [ e5, e6, e7 ]
```

Our new node also contains an array, but this time the array is CIDs (labelled `L1.0` and `L1.1`) pointing to the leaf nodes that contain the data we care about. This new node is our new "root", it's all we need to access any element in our array. We can refer to the "height" of each node to denote the distance from the leaves. This will be a useful property when considering our algorithms for accessing and modifying our data structure.

Our data structure, currently holding `8` elements, encoded as IPLD data has:

* Three distinct content addressed blocks
* Three CIDs
* Two leaf nodes containing our data
* One root to address all content in the DAG

We can continue in this pattern, adding more elements to our data structure and therefore more blocks:

```
H2:                                   [ L1.0, L1.1, L1.2, L1.3, L1.4 ]
                                   /         /     |      \            \
                               /           /       |        \              \
                           /             /         |          \                \
                       /               /           |            \                  \
                   /                 /             |              \                    \
H1:  [e0,e1,e2,e3,e4]  [e5,e6,e7,e8,e9]  [e10,e11,e12,e13,e14]  [e15,e16,e17,e18,e19]  [e20,e21,e22,e23,e24]
```

Great, our data structure can hold `25` elements!

* Six distinct content addressed blocks
* Six CIDs
* Five leaf nodes containing our data
* One root to address all content in the DAG

But now we have a problem if we want to hold our original size constraint. Our root node is going to have more than five elements if we add another block to contain more elements.

The solution is to simply add another level, so our data elements are now at Height 3:

```
H3:                                                                 [ L2.0, L2.1 ]
                                                                  /                \
                                                               /                      \
                                                            /                            \
                                                         /                                  \
                                                      /                                        \
H2:                                   [ L1.0, L1.1, L1.2, L1.3, L1.4 ]                        [ L1.5 ]
                                   /         /     |      \            \                           \
                               /           /       |        \              \                          \
                           /             /         |          \                \                         \
                       /               /           |            \                  \                        \
                   /                 /             |              \                    \                       \
H1:  [e0,e1,e2,e3,e4]  [e5,e6,e7,e8,e9]  [e10,e11,e12,e13,e14]  [e15,e16,e17,e18,e19]  [e20,e21,e22,e23,e24]  [e25]
```

In this same way, we can keep on adding elements by increasing the height and adding additional intermediate linking nodes to support our DAG.

We only need to know the root CID for our data structure, but we need an algorithm for navigating to a particular element. If we want to implement a `Get(index)` operation to fetch a single element of our super-large array, we need an algorithm that can tell us _next_ block to load as we navigate down from the root through increasing "height" layers.

An approximation of such an algorithm could look like the following, implemented in JavaScript, with a `SuperLargeArrayBlock` class to represent a single block in our structure, with a `getElementAt(index)` method to fetch a particular element of the array:

```js
const width = 5 // fixed maximum length of any individual block

class SuperLargeArrayBlock {
  getElementAt(index) {
    if (this.height > 1) {
      const childIndex = Math.floor(index / (width ** (this.height - 1)))
      const newIndex = index % (width ** (this.height - 1))
      // load and traverse into a child
      return this.getChildAt(childIndex).getElementAt(index)
    }
    // read directly from this node's data array
    return this.elements[index]
  }

  getChildAt(childIndex) {
    // ... load a child block and return a SuperLargeArrayBlock for it
  }
}
```

The two parts of this algorithm:

* For blocks at `height>1` we need to account for our distance for the leaves and work out which child element that our final element is at. `index / width^(height-1)` provides us with this value. But note that we can't pass the original `index` value down to that child because it only knows about the graph below it, so we essentially _remove_ part of the `index` value that is not relevant to the child and pass that on.
* For blocks at `height==1`, we have leaves of our graph and know that the elements in the local array are the final elements that the user is looking for.

It's not critical to understand in depth how this algorithm works; but it is worthwhile considering how such algorithms and data structures can scale and how we can navigate them without having to _have_ the entirety of the data available and in memory. Block-by-block traversal through IPLD data is how we scale our data structures.

Algorithms for **mutation** operations that update our data structure, requiring new hashes for changed blocks, are left as an exercise for the brave. Consider how one might add `Push(value)`, `Pop()` or `Set(index, value)` operations.

### Further reading

You can read an in-depth description of this data structure, its properties and algorithms for traversal and mutation in the specification for the [**Vector**](https://github.com/ipld/ipld/blob/master/_legacy/specs/data-structures/vector.md) data structure.

The [**HAMT**](https://ipld.io/specs/advanced-data-layouts/hamt/) algorithm is worth reading as it serves as a general-purpose associative array algorithm across many parts of the IPLD ecosystem, including IPFS itself.

The [**AMT**](https://pkg.go.dev/github.com/filecoin-project/go-amt-ipld/v4#pkg-overview) algorithm is a combination of the array discussed here, with some concepts from a general-purpose HAMT, to produce a sparse array. This algorithm is heavily used within the Filecoin chain, along with the HAMT.

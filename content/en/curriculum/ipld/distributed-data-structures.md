---
title: "Distributed Data Structures"
description: "Understand how distributed data structures work"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 260
category: lecture
level:
- deep
objectives:
  show: true
  goals:
  - "1.5"
  subgoals:
  - 1.51
  - 1.52
  - 1.53
---

## Beyond File Data

It's easy to think primarily in terms of files, (particularly when "file" is in the IPFS acronym!), but content addressed data is so much more powerful than just a mechanism for addressing plain files. File data in IPFS, using DAG-PB and UnixFS has fixed layouts, a limited Data Model, and room for a few pieces of additional properties to represent directory structures and basic file metadata.

If files were enough for data storage, we would not need databases with sophisticated data models and capabilities to organize and address sets and subsets of arbitrary data types. In web3 application development, we need our databases to be distributed, robust and scalable. 

The IPLD Data Model and the suite of IPLD tooling and libraries are intended to meet this challenge.

## HAMTs & Distributed Data Structs | IPFS Camp 2022 - by Rod Vagg
{{% youtube dvd2IMernQQ %}}
At a high level, the talk covered the following concepts:

- **Persistent and immutable data structures** - Functional Programming languages like Scala, Clojure, Haskell, etc. lean heavily on these concepts. HAMT algorithm is used to build super large arrays. Latency tradeoffs needed to consider are: size of each block vs density of the graph. 

- **DAG Building in IPFS** - Consists of creating constraints for the size of UnixFS wrapped blocks and adding more and more another parent blocks to address more and more raw content.

- **Super-Large Array Example** - We want to be able to store a few to a few billion elements in the array. Accessing one element in a super-large array should require minimal block loads from the storage system. The elements could be of any data type or even CIDs of other blocks in other graphs.

An approximation of such an algorithm could look like the following, implemented in JavaScript, with a `SuperLargeArrayBlock` class to represent a single block in our structure, with a `getElementAt(index)` method to fetch a particular element of the array:

```js
const width = 5 // fixed maximum length of any individual block

class SuperLargeArrayBlock {
  getElementAt(index) {
    if (this.height > 1) {
      const childIndex = Math.floor(index / (width ** (this.height - 1)))
      const newIndex = index % (width ** (this.height - 1))
      // load and traverse into a child
      return this.getChildAt(childIndex).getElementAt(newIndex)
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

Algorithms for **mutation** operations that require new hashes for changed blocks, are left as an exercise for the brave. Consider how one might add `Push(value)`, `Pop()` or `Set(index, value)` operations.

### Further reading

[**Vector**](https://github.com/ipld/ipld/blob/master/_legacy/specs/data-structures/vector.md) - data structure has properties and algorithms for traversal and mutation. 

[**HAMT**](https://ipld.io/specs/advanced-data-layouts/hamt/) - a general-purpose associative array algorithm used across many parts of the IPLD ecosystem, including IPFS itself.

[**AMT**](https://pkg.go.dev/github.com/filecoin-project/go-amt-ipld/v4#pkg-overview) algorithm - used to produce a sparse array. Used heavily within the Filecoin chain and HAMTs.
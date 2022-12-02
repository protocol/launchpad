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
  - "1.6"
  subgoals:
  - 1.61
  - 1.62
  - 1.63
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

### Sharding with HAMTs

The word shard can be thought of as _a small part of a whole_. Hence [**Sharding**](https://www.geeksforgeeks.org/what-is-sharding/) means breaking up a larger part into smaller pieces. Sharding of IPFS file graphs is an important concept because we use similar approaches in different ways to scale our various data structures, including the Filecoin blockchain (which is _not_ file data and uses DAG-CBOR codec).

UnixFS uses a sharding technique called a **HAMT**, or [Hash Array Mapped Trie](https://en.wikipedia.org/wiki/Hash_array_mapped_trie). This algorithm turns out to be particularly useful in the content addressed world due to its stability and balanced nature. With a HAMT, we can build an arbitrarily large data structure from linked IPLD blocks that store `Name:Link` mappings. 

Consider the challenge of storing Wikipedia on IPFS, where almost all pages are under a single root. Wikipedia is like a single directory with millions of HTML files. A single DAG-PB block with a `"Links"` list that large would produce a block far too large to store and transfer efficiently. So we use a HAMT to spread it over many blocks, where their `"Links"` lists are made up of links whose names are part of a hash digest of each name of the file.

## Pathing in IPLD

'Pathing' refers to the use of simple strings called "paths" to describe navigation between nodes in an IPLD data graph. You can think of "pathing" in IPLD as being comparable to how you use "paths" in a filesystem. With file systems, each step is over a directory and leads you to either a file or another directory; for IPLD, each step is over a "node" and leads you to another "node".

For example, the IPFS "address"
```
ipfs://QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html
```
(which some browsers support natively, or you can use via an [IPFS gateway](https://ipfs.io/ipfs/QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html), includes a CID and a path. 

The CID addresses a single block, but the path (`/0927/index.html`) takes us further. In this example, the path is navigating through a series of linked blocks to find a leaf block containing the content for the `index.html` file. _(Note: the underlying IPLD data is transformed through UnixFS to provide directory-like pathing, but we'll ignore that nuance for the purpose of a discussion on pathing!)._

Another example, which you can try on the command line with kubo (go-ipfs), is inspecting the contents of the Filecoin genesis block, which is a DAG-CBOR block. Running the below command we can fetch this block and see it by having it translated using the DAG-JSON codec for nice human-readable printing:

```bash
$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi
{"Datetime":"2017-05-05 01:27:51","Message":"This is the Genesis Block of the Filecoin Decentralized Storage Network.","Network":"Filecoin","Token":"Filecoin","TokenAmounts":{"Miners":"1,400,000,000","ProtocolLabs":{"Development":"300,000,000","Foundation":"100,000,000","Fundraising":"200,000,000"},"TotalSupply":"2,000,000,000"}}
```

IPLD paths let us get to specific nodes within this block:

```bash
$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi/Message
"This is the Genesis Block of the Filecoin Decentralized Storage Network."

$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi/TokenAmounts/ProtocolLabs/Foundation
"100,000,000"
```

More information about pathing can be found at [https://ipld.io/docs/data-model/pathing/](https://ipld.io/docs/data-model/pathing/).


## Selectors

IPLD Selectors are expressions that describe a traversal over an IPLD DAG, and select a subset of nodes during that walk. Paths and selectors are related, in that a path can be expressed as a selector and it traverses to a specific node in a graph. Selectors allow for the traversal and "selection" of multiple parts of an IPLD graph.

**You can think of Selectors as roughly like [regexps](https://www.computerhope.com/jargon/r/regex.htm), but made for IPLD graphs.**

Selectors are expressed as IPLD data, we typically document them as a DAG-JSON form; although their terseness do not exactly lend readability.

A very common selector is the "Explore All Recursively": 
```bash
{"R":{"l":{"none":{}},":>":{"a":{">":{"@":{}}}}}}
```

This selector instructs a traversal to: **Explore all nodes of a graph recursively,**_**without limit**_. This selector is primarily useful if you are interested in watching which _blocks_ a traversal will load during its exploration; those blocks and their load order provide a stable sequence of all blocks in the entire DAG starting from the root where the traversal began.

A close relative of the "Explore All Recursively" is the "Match All Recursively": 
```
{"R":{"l":{"none":{}},":>":{"|":[{".":{}},{"a":{">":{"@":{}}}}]}}}
```

This selector adds a **Match** to the previous selector, such that the traversal engine will identify every single node in the graph. This will not only load all the connected blocks, but emit every single decoded value it can find, in a deterministic order.

Paths, when translated to selectors, _explore_ along named edges of a graph and then _match_ the end point (which may or may not be a terminal in the graph).

Selectors are a relatively new technology, but are becoming an increasingly important tool in the IPFS and Filecoin stack; particularly for establishing a deterministic method for multiple parties to describe part, or all of a graph of data.

For example:
* [Graphsync](https://ipld.io/specs/transport/graphsync/) uses selectors to synchronize part, or all of an IPLD graph of blocks between two peers.
* Filecoin uses selectors for storage deal-making, with clients describing the extent of their DAG within a storage deal. It also uses selectors for retrieval; with clients able to request a specific sub-graph of IPLD blocks from a root within a deal.

Selectors are described in detail in the [specification](https://ipld.io/specs/selectors/).

## Further reading

[**Vector Spec**](https://github.com/ipld/ipld/blob/master/_legacy/specs/data-structures/vector.md) - data structure has properties and algorithms for traversal and mutation. 

[**HAMT Spec**](https://ipld.io/specs/advanced-data-layouts/hamt/) - In-depth look at general-purpose associative array algorithm used across many parts of the IPLD ecosystem, including IPFS itself.

[**AMT Overview**](https://pkg.go.dev/github.com/filecoin-project/go-amt-ipld/v4#pkg-overview) algorithm - used to produce a sparse array. Used heavily within the Filecoin chain and HAMTs.
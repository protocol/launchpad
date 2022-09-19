---
title: "Graphs: Merkle DAGs"
description: "Understand what are Merkle DAGs"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 200
category: lecture
level:
- shallow
- deep
---

#### Merkle DAGs | IPFS Camp 2019 - Mikeal Rogers

This section on DAGs from IPFS Camp 2019 goes over how Merkle DAGs are created, read, and used in IPFS. Mikeal Rogers tells us what are the tradeoffs between different block sizes. .

{{< youtube z9GmPIfqUbE >}}


At a high level, the talk covered the following topics:

* Merkle DAGs - Built from from the ground up, impossible to have circular references, and parents’ hashes are built from the hashes of its children nodes.

* Block sizes - Blocks that are too big cause verification problems, transport problems, and less deduplication. 

* Too small - Hashing takes longer, more requests for blocks, more hops to a piece of data. 

* Just right - Depends on your use case, this will optimize for reading and writing in your scenario


**DAG** is an acronym for **Directed Acyclic Graph**. This is a basic concept arising from graph theory and defines: any connected set of data where the connections go in only one direction ("directed") and the graph does not contain any cycles ("acyclic"). Ralph Merkle, formalised the hash tree pattern 1979 which specializes a form of DAG. Essentially:

> Content being hashed may also contain hash digests of other content; therefore, any content "address" authenticates content "linked" via the inclusion of their digest in the tree below it

Hence: **Merkle DAGs**.

"Merkle Trees" are another common term for the same thing, however these are often associated with strict trees of hashes, where each level of the tree is _only_ the concatenation of hashes below it. This structure is useful for "inclusion" algorithms but is not strictly necessary to define a "Merkle DAG" (or "tree"). Any node in the tree may contain hashes of content below that node along with any other content that may be useful at that node.

If you haven't worked with Merkle Trees before, [check out the tutorial in Protoschool to get a better understanding](https://proto.school/merkle-dags/01).

## Merkle Roots

![](<../../.gitbook/assets/ipld\_merkle\_roots (1).png>)

The tip of any Merkle DAG is called its "root". The hash of that root can be said to authenticate (and "link to") all of the other content below it in the graph simply because each point in that graph includes hashes of content below it (i.e. hashes of hashes, all the way down).

A **Git commit** is the hash digest of the root of a large graph. This root "block" is a concatenation of various pieces of data, including the author of the commit, the timestamp, the _previous_ commit hash digest and the hash digest of the filesystem "tree". The filesystem tree is built by hashing files, then concatenating the hashes of files within a directory to form a directory node which is then hashed and included in the parent of that directory, etc. i.e. a Git commit hash digest only hashes a small piece of data, but that data includes hashes of other data, forming a large tree spanning the files in that commit and all previous commits in the history of the Git repository.

A **Bitcoin block** is the hash of only 80 bytes of data! But that small packet of data includes the hashes of the previous block as well as the tip of a very large tree containing the transactions contained within that block. Bitcoin and other blockchains use the immutability and directionality of DAGs for authentication and inclusion of the entire history of the chain.

We can use the **root** of a Merkle DAG to address arbitrarily large amounts of data.

## Merkle Mutability

![](<../../.gitbook/assets/ipld\_merkle\_mutability (2).png>)

A graph of immutable data can said to be "mutable" if we accept that the hashes will need to change to match the changed data, and these changed hashes will propagate all the way up through the graph to a new root.

Mutating content addressed data in this way provides some interesting properties, we can add, remove or modify data at any point in the graph and generate a new root each time.

* New roots give us **snapshots** for each change.
* Different snapshots (roots) may address much of the same data, since only small parts of the graph may have changed, this gives us **de-duplication**. One of the ways that Git is efficient is that only the changes need to be stored, and only those changed parts of a tree need be re-hashed to generate a new root (commit).

IPFS benefits from these same properties. A copy of Wikipedia on IPFS may take up many GBs, but changing a single page only requires changes to that page and its parents (up to the new "root"!). Having a CID for the old and new lets us move back and forward in time through the snapshots, while not needing to download the whole thing from scratch.

## Further Reading

* [**Merkle DAGs: Structuring Data for the Distributed Web**](https://proto.school/merkle-dags) on Proto.school, a guided, interactive tutorial.
* [Merkle proofs Explained.](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)
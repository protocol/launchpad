---
title: "Introduction to IPFS"
description: "The What and Why of IPFS"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 70
category: lecture
level:
- shallow
- deep
goal: 1
subgoals:
- 1.01
- 1.02
- 1.03
- 1.04
- 1.05
---


IPFS is one of many [general purpose peer to peer (P2P) networks](https://en.wikipedia.org/wiki/Peer-to-peer#Other_P2P_applications). Peer to peer networks are just everyday computer users that share data directly with each other. In these systems, you don't have to go through an intermediary like Google to share a file with someone. As an example, if we were looking for the [IPFS white paper](https://github.com/ipfs/papers/blob/master/ipfs-cap2pfs/ipfs-p2p-file-system.pdf), we would ask a peer and they will either respond with the paper or pass along the request to another peer. Eventually, someone will return with the paper if they have it saved.

![Difference between Centralised, Decentralised, & Distributed Networks](IPFS_dist_cent.png)
Peer to peer systems are most synonymous with distributed networks. This is because we have direct connections with our peers as opposed to in centralised and decentralised networks, we often still have to go through a mediary to find content.

These [different types of networks](https://www.gemini.com/cryptopedia/blockchain-network-decentralized-distributed-centralized) offer various tradeoffs. The world wide web is in essense a centralised network. We are familiar with the speed of receiving content, availability of data when we want it, the ease of discovering new things, and straight forward way of securing our accounts.

On the other hand, peer to peer networks excel in everything that centralised networks don't. This includes owning our own data and censorship resistance against governments, corporations, or hackers. They allow us to trust that the data we recieve is the data we ask for, if it is available. And generally the more users sharing data with each other, the better the network will be.

[Decentralised networks](https://petkanics.medium.com/the-benefits-of-decentralization-88a0b5d0fd39) maintain privacy and censorship resistance while being able to discover new content and maintain availability of data. Unfortunately, this comes at the cost of speed. Decentralised networks have to agree on all actions made by users because they save the actions on every computer in the network. Then in the future, all computers can reference any action taken by any single user. For this reason, decentralised networks are generally paid for by the user and use up large amounts of electricty.

## Why IPFS?

The acceleration of innovation over the past few decades, in comparison with the past million years of human evolution, is moving at an incredible pace.

IPFS as an organization is trying to look ahead to the next 10, 100, 1000 years and beyond and think about how computing will shape and impact a future we can't even begin to imagine.

{{< youtube zE_WSLbqqvo >}}

<br></br>
Though it gets difficult to predict what is going to happen in the next, say, 100 years, we can start to invest in it now with Web3.

Computation has gone through so many phases; from the first computers, to machines that can timeshare, to multiprocessing and sandboxed VMs, to user terminals, to networked computers with multiprocessing, now with personal computers networked across a worldwide internet that all came from a relatively simple set of functions and data transmission. Now, IPFS is on the front lines of the Web3 evolution that will bring us to the next stage in computing.

#### How IPFS Works | Steve Allen
In this video, Steve Allen describes how IPFS **Imports, Names, Finds** and **Fetches** content.

{{< youtube 0IGzEYixJHk >}}

At a high level, the talk covered the following concepts:

#### Import
* [Chunking](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) – When an object is added to IPFS, it is chunked up into smaller parts, each part is hashed, and a CID is created for each chunk. This DAG building process has two main parameters, the leaf format and the chunking strategy.
* [UnixFS](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) – When you add a file to IPFS, it might be too big to fit in a single block, so it needs metadata to link all its blocks together. UnixFS is a protocol-buffers-based format for describing files, directories, and symlinks in IPFS. This data format is used to represent files and all their links and metadata in IPFS. UnixFS creates a block (or a tree of blocks) of linked objects.
* [IPLD](https://docs.ipfs.io/project/related-projects/#ipld) – A meta-format for understanding, encoding, and decoding Merkle-linked data. IPLD works to make it possible to define a data model and make it possible to link together different types of Merkle-linked data.

#### Name
* [Content IDentifiers (CIDs)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) – These are self-describing hashes used to describe everything stored in IPFS, essentially a hash with some metadata.
* Paths – Paths are recursive unlike URLs and can refer to previous blocks.
* [IPNS](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) – Public keys are mapped to a path, and you use your private key to sign it- as you modify this content, you can use IPNS to point to a new version of a previous piece of content that is signed by your private key.

#### Find
* [Routing & DHT](https://docs.ipfs.io/concepts/dht/#distributed-hash-tables-dhts) – Content on IPFS uses a combination of a CID and routing systems that help identify the set of peers you can get the content from with a distributed routing table (or Distributed Hash Table).
* [Kademlia](https://docs.ipfs.io/concepts/dht/#kademlia) – Kademlia is a distance metric + query algorithm that helps users find the peers with the most accessible pieces of data.

#### Fetch
* [Bitswap](https://docs.ipfs.io/concepts/bitswap/#how-bitswap-works) – Using wantlists of data, or CIDs, that specific users are looking for, and checks peers that a node is connected to first for those CIDs before querying the rest of the DHT.


<!--

#### IPFS Basics – Working with Files in IPFS

This video covers the basics of working with IPFS files in a Linux cli, as well as a quick explanation of the ins and outs of the IPFS desktop CLI and the Mutable File system used with it.
-->

<!-- {% embed url="https://youtu.be/A7yZaYhrwyM" %} -->
<!-- The commands covered and explained include:

* `ipfs swarm peers`
* `ipfs cat /ipfs/<put-your-CID-here>`
* `ipfs get <put-your-CID-here>`
* `ipfs pin <put-your-CID-here>`
* `ipfs pin rm /ipfs/<put-your-CID-here>`
*  `ipfs add`  -->

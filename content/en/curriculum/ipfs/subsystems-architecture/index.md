---
title: "IPFS Subsystems & Architecture"
description: "A Technical Guide to the IPFS architecture"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 140
---

### Subsystems
_This is an [annotated version of the subsystems Repo](https://github.com/ipfs/go-ipfs/#map-of-go-ipfs-subsystems)_

<!-- What else should we add in? -->
**Map of go-ipfs Subsystems**
_WIP: This is a high-level architecture diagram of the various sub-systems of go-ipfs. To be updated with how they interact._

![ipfs subsystem 1](go-ipfs-subsystems.png)

![ipfs subsystem 2](cli-diagram.png)

### Architecture

_This is an [annotated version of the architecture in the specs repo](https://github.com/ipfs/specs/blob/master/ARCHITECTURE.md)_

<!-- Add more? Add less? -->

This spec document defines the IPFS protocol stack, the subsystems, the interfaces, and how it all fits together. It delegates non-interface details to other specs as much as possible. This is meant as a top-level view of the protocol and how the system fits together.

Note, this document is not meant to be an introduction of the concepts in IPFS and is not recommended as a first pass to understanding how IPFS works. For that, please refer to the IPFS paper.

#### IPFS and the Merkle DAG
At the heart of IPFS is the MerkleDAG, a directed acyclic graph whose links are hashes. This gives all objects in IPFS useful properties:

- Authenticated: content can be hashed and verified against the link
- Permanent: once fetched, objects can be cached forever
- Universal: any datastructure can be represented as a merkledag
- Decentralized: objects can be created by anyone, without centralized writers

In turn, these yield properties for the system as a whole:

- Links are content addressed
- Objects can be served by untrusted agents
- Objects can be cached permanently
- Objects can be created and used offline
- Networks can be partitioned and merged
- Any datastructure can be modelled and distributed

IPFS is a stack of network protocols that organize agent networks to create, publish, distribute, serve, and download merkledags. It is the authenticated, decentralized, permanent web.

#### Nodes and Network Model
The IPFS network uses PKI based identity. An "ipfs node" is a program that can find, publish, and replicate merkledag objects. Its identity is defined by a private key. Specifically:

```
privateKey, publicKey := keygen()
nodeID := multihash(publicKey)
```

See more in the [IPFS keystore spec](https://github.com/ipfs/specs/blob/master/KEYSTORE.md).

#### IPFS Cluster

[IPFS Cluster](https://ipfscluster.io/) is a distributed application that works as a sidecar to IPFS peers, maintaining a global cluster pinset and intelligently allocating its items to the IPFS peers. IPFS Cluster powers large IPFS storage services like nft.storage and web3.storage

IPFS Cluster:
* Runs independent from the rest of the IPFS Swarm
* Performs actions that make it simple to add pins at scale, utilizing a set of 'cluster peers'
* The cluster peers take care of asking IPFS to pin things at a sustainable rate and retry pinning in case of failures
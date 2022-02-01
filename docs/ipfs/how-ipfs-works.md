---
description: The Basics of How IPFS Works
---



## How IPFS Works

#### How IPFS Works | Steve Allen
{% embed url="https://www.youtube.com/watch?v=0IGzEYixJHk" %}

### IPFS Concepts
_This is an [annotated version of this doc](https://www.youtube.com/watch?v=0IGzEYixJHk)_

New to IPFS or the distributed web? Here's where to get started on understanding the key ingredients in what makes IPFS work. Because IPFS is a system that hopes to change how we use the Internet, it comes with many new concepts.

<!-- Which should we mark as optional? -->

#### How IPFS Deals with Files | IPFS Camp 2019
{% embed url="https://www.youtube.com/watch?v=Z5zNPwMDYGgk" %}

#### The Lifecycle of Data in DWeb | IPFS Camp 2019
{% embed url="https://www.youtube.com/watch?v=fLUq0RkiTBA" %}

#### Whiteboard Series with NEAR | Ep: 42 Adin Schmahmann
{% embed url="https://www.youtube.com/watch?v=J-drqD2UebM" %}

## IPFS Subsystems & Architecture
### Subsystems
_This is an [annotated version of the subsystems Repo](https://github.com/ipfs/go-ipfs/#map-of-go-ipfs-subsystems)_

<!-- What else should we add in? -->
**Map of go-ipfs Subsystems**
_WIP: This is a high-level architecture diagram of the various sub-systems of go-ipfs. To be updated with how they interact._

![ipfs subsystem 1](https://camo.githubusercontent.com/05362f4ab9e7c512338a589145f704f6f0dcea273c64b63628072b86e304e3f5/68747470733a2f2f646f63732e676f6f676c652e636f6d2f64726177696e67732f642f652f32504143582d3176535f6e3146765375366d646d5369726b427249494569623267716867746174443961776150325f576472474e347a544e65673632305851643950393557542d49766f676e5378494964434d3575452f7075623f773d3134343626683d31303336)

![ipfs subsystem 2](https://github.com/ipfs/go-ipfs/blob/master/docs/cli-http-api-core-diagram.png?raw=true)

### Architecture

_This is an [annotated version of the architecture in the specs repo](https://github.com/ipfs/specs/blob/master/ARCHITECTURE.md)_

<!-- Add more? Add less? -->

This spec document defines the IPFS protocol stack, the subsystems, the interfaces, and how it all fits together. It delegates non-interface details to other specs as much as possible. This is meant as a top-level view of the protocol and how the system fits together.

Note, this document is not meant to be an introduction of the concepts in IPFS and is not recommended as a first pass to understanding how IPFS works. For that, please refer to the IPFS paper.

#### IPFS and the Merkle DAG
At the heart of IPFS is the MerkleDAG, a directed acyclic graph whose links are hashes. This gives all objects in IPFS useful properties:

authenticated: content can be hashed and verified against the link
permanent: once fetched, objects can be cached forever
universal: any datastructure can be represented as a merkledag
decentralized: objects can be created by anyone, without centralized writers
In turn, these yield properties for the system as a whole:

links are content addressed
objects can be served by untrusted agents
objects can be cached permanently
objects can be created and used offline
networks can be partitioned and merged
any datastructure can be modelled and distributed
(todo: list more)
IPFS is a stack of network protocols that organize agent networks to create, publish, distribute, serve, and download merkledags. It is the authenticated, decentralized, permanent web.

#### Nodes and Network Model
The IPFS network uses PKI based identity. An "ipfs node" is a program that can find, publish, and replicate merkledag objects. Its identity is defined by a private key. Specifically:

```
privateKey, publicKey := keygen()
nodeID := multihash(publicKey)
```
See more in the [IPFS keystore spec](https://github.com/ipfs/specs/blob/master/KEYSTORE.md).

#### The Stack
IPFS has a stack of modular protocols. Each layer may have multiple implementations, all in different modules. This spec will only address the interfaces between the layers, and briefly mention possible implementations. Details are left to the other specs.

IPFS has five layers:

IPFS stack layers:

- naming - [content addressed](https://docs.ipfs.io/concepts/content-addressing/) (`/ipfs/<cid>`) OR  a self-certifying PKI namespace ([IPNS](https://docs.ipfs.io/concepts/glossary#ipns), `/ipns/{libp2p-key}`) OR a [DNSLink](https://docs.ipfs.io/concepts/glossary#dnslink) (`/ipns/{dnslink-name}`)
- merkledag - datastructure format (thin waist)
- exchange - block transport and replication
- routing - locating content and peers
- network - establishing connections between peers

## IPFS Basics & Toolkits

#### IPFS Basics + Tools | ETHGlobal & Juan Benet

<!-- Add Description -->

{% embed url="https://www.youtube.com/watch?v=ldEDa6_CT7k" %}

#### Interplanetary File Storage! | Simply Explained

<!-- Add Description -->

{% embed url="https://www.youtube.com/watch?v=5Uj6uR3fp-U" %}

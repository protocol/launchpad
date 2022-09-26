---
title: "Data Transfer"
description: "The Data Exchange Algorithm of IPFS"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 130
category: lecture
level:
- deep
---

## Introduction

// context

Bitswap is a protocol to exchange blocks (i.e. data) in a peer to peer network. IPFS uses Bitswap to retrieve files from other peers in the network. At the interface level, the Bitswap protocol has two operations: `get(CID)` and `put(CID)`. The `get`operation is used to find a block with a specific CID, and the `put` operation is used to announce that we are storing a block.

## How it works

Bitswap is a message-oriented protocol, so the communication happens by exchanging messages among peers. The messages supported are:
- `WANT-HAVE` (request): when we send this message, we're communicating the network that we're interested in a specific block (e.g. `WANT-HAVE(CID)`).
- `HAVE` (response): in response to our `WANT-HAVE` message, peers storing the CID notify so.
- `DONT-HAVE` (response): in response to our `WANT-HAVE` message, peers NOT storing the CID, notify so.
- `CANCEL` (request): if we have requested a CID and we're no longer interested, we notify it.
- `WANT-BLOCK` (request): we ask the peers storing the CID to send the block.
- `BLOCK` (response): in response to our `WANT-BLOCK` message, the peer sends the block.

## Example

Let's say that you're running an IPFS node, and you want to retrieve a file, `notes.txt`, from the network, which has a root block with CID `CID1`.

// image

To get the entire file, it is necessary to traverse the graph. For example, to get to the `CID5` block, we must must:
1. Get the root block (`CID1`), which points to `CID2`.
2. Get the `CID2` block, which points to `CID5`.
3. Get the `CID5`.

The process of retrieiving a file in Bitswap involves sending `WANT-HAVE` and `WANT-BLOCK` messages for all the different blocks of the file, starting by the root block.

### Getting the Root Block

First, Bitswap checks if our node is hosting the CID in our local blockstore. When we download information from the IPFS network, the content is stored in our local blockstore, so if you requested the CID before, it could potentionally be in you computer.

If the CID is not found locally, then Bitswap opens a _session_.
In the context of Bitswap, a _session_ contains the nodes that might potentially store the blocks of the file. In the beginning, the _session_ is composed of the direct peers of your node (i.e. the peers that you are connected to).

Bitswap sends a `WANT-HAVE(CID1)` message to all the nodes in the session. In the following diagram, the message is sent to four nodes.

// image

Two peers (`Node 1` and `Node 3`) have returned a `HAVE` message, which means that they are storing the block. However, Bitswap only asks one peer to actually **exchange the block's data** to avoid requesting the same content twice.

// image

If a node stores the root block, it could potentially hold the other children blocks of the file. Bitswap keeps the information about `Node1` and `Node 3` in the _session_ to request other blocks of the file in the future.
However, because `Node 2` did not store the root block, Bitswap assumes that this node will not have any other block of the `notes.txt` file, so it is removed from the _session_.
This means that `Node 2` will not be queried anymore to retrieve any of the blocks of the `notes.txt` file.

If none of the peers holds the block, then a Bitswap uses the DHT to find other nodes that might be storing the block.

### Getting the rest of the file

Now that Bitswap has retrieved the root block of the file, it must get the children of the root block. In the previous example, the children blocks of `CID1` are `CID2`, `CID3` and `CID4`. The process to find these blocks is the same than for the root block.

If you run out of...

## The WantList

Consider that you send a `WANT-HAVE(CID1)` message to a node that is not storing the `CID1` block.
You will receive a `DONT-HAVE(CID1)` response, but the node will also take note that you're looking for the `CID1` block.
This way, if the node stores the requested CID in the future, it will send it to you.

Bitswap keeps track of the blocks that other nodes are looking for in a component called _the ledger_.
For example, consider the following diagram.

// image

The `Node 7` node is looking for the `CID1` block, and the `Node 8` node is looking for the `CID4` block. The `Node 15` node does not store any of those blocks, however, keeps the information in its ledger.
If in the future the `Node 15` node receives any of the blocks, it will send it straight away.

## Bitswap architecture
Bitswap is composed of several components:

- Connection Manager: manages the connections with other peers to retrieve and announce blocks by interacting with the network interface. In the case of IPFS, the connection manager interacts with a libp2p node.
- Ledger: 
- Session Manager:

## IPFS Data
IPFS differs greatly in the way that it stores, shares, and retrieves files. Instead of having clients rely on servers, IPFS allows peers to connect and search for one another in an efficient manner to exchange data directly.

## Bitswap
_See the full set of resources [on the ResNetLab Tutorials page](https://research.protocol.ai/tutorials/resnetlab-on-tour)_

#### Content Exchange | ResNetLabs on Tour

{{< youtube jaGkTW2xacE >}}

#### Beyond Bitswap | ResNetLabs on Tour <!-- Presenter?-->

<!-- Add introduction here -->

{{< youtube cXl-tzX24VQ >}}

<!-- Add summarizing points -->

## Graphsync

#### Future of Decentralized Data Transfer | Hannah Howard

<!-- Need an intro paragraph -->

{{< youtube Qtt21TItPI4 >}}

<!-- Summarizing points -->
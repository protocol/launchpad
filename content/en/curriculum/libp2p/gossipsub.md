---
title: "Gossipsub"
description: "A Publish / Subscribe Message Delivery Network"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 330
---

### What is Gossipsub?

Gossipsub is a pubsub (publish/subscribe) protocol that provides the routing for messaging that can be used in blockchain environments for transaction messages that transfer value, and block messaging that update the status of the blockchain, along with other applications.

Before Gossibpsub, permissionless networks like Ethereum and Fliecoin used a messaging layer called flooding (or floodsub) to help protect against malicious attacks that would slow down or stop messaging on that network, however flooding can create a lot of redundancy because it floods the nodes in the network with messages.

Gossipsub uses a different method of communication, forwarding metadata to peers in the network, using a **lazy pull** that limits the number of peers a node communicates with, but directly sharing nodes in their network (known as an **Eager Push**), and uses a **score function** to highlight good behavior or nodes, and help flag malicious activity.

Learn more in the [GossipSub paper](https://arxiv.org/pdf/2007.02754.pdf)


### Videos

#### Demystifying libp2p Gossipsub | Ethereum Foundation - Raúl Kripalani

{{< youtube BUc4xta7Mfk >}}

#### Gossipsub 1.1 | David Dias

A scalable, extensible & hardened P2P PubSub Router protocol | Ready Layer One - David Dias

{{< youtube H9Eb4uftrSA >}}
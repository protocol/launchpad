---
title: "Publish/Subscribe"
description: "A Publish / Subscribe Message Delivery Network"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 330
category: lecture
level:
- deep
---

A PubSub (Publish/Subscribe) system allows peers to only receive messages of a specific type. A _publisher_ sends messages of a specific type to _subscribers_ of that type. For example, consider a chat application with a chat group called `music`. Users interested subscribe to the group; when someone sends a message to the group, only those subscribed receive the message.

In libp2p, peers subscribe and send messages to _topics_. The concept is pretty similar to messaging systems (e.g., Kafka), but libp2p allows this behavior in a decentralized way. The main implementations of the protocol are Floodsub and Gossipsub.

## FloodSub

In Floodsub, the first implementation of the pub/sub protocol, messages are delivered to all the connected nodes of a peer. For example, consider the following diagram.

![Floodsub message delivery](floodsub.png)

1. `Peer 1` is connected to `Peer 2` and `Peer 3`; `Peer 2` and `Peer 3` are connected to `Peer 4`.
2. `Peer 1` publishes a message, which is sent to `Peer 2` and `Peer 3`.
3. Both `Peer 2` and `Peer 3` forward the message to `Peer 4`.

FloodSub is simple, reliable, and highly resistant to malicious actors and censors, but the main problem of FloodSub is that it duplicates messages, thus using a lot of bandwidth. In the previous example, `Peer 4` receives the message twice.

[Gossipsub](https://arxiv.org/pdf/2007.02754.pdf), the protocol developed after FloodSub, tries to reduce the number of duplicate messages (i.e., bandwidth) by taking a different approach. Gossipsub is covered later in the Launchpad curriculum.

## Gossipsub



You can get more information about PubSub in the [libp2p documentation](https://docs.libp2p.io/concepts/publish-subscribe/).

### Videos

#### Demystifying libp2p Gossipsub | Ethereum Foundation - Raúl Kripalani

{{< youtube BUc4xta7Mfk >}}

#### Gossipsub 1.1 | David Dias

A scalable, extensible & hardened P2P PubSub Router protocol | Ready Layer One - David Dias

{{< youtube H9Eb4uftrSA >}}

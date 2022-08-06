---
title: "Distributed Networking Solutions"
description: "Pubsub and Circuit Relays allow distributed networking"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 340
category: lecture
level: all
---

## Circuit Relays

In some cases, peers might not be publicly reachable. For example, consider that peer `A` wants to connect to `B`, but peer `B` is behind a firewall that does not allow incoming connections.

To solve this issue, libp2p provides a protocol called [Circuit Relay v2](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md). When a peer is not reachable by other peers, another machine can relay messages for that peer. Consider the following diagram:

![Circuit relay example](circuit-relay.png)

1. `A` is not reachable, so it asks `C` to listen on its behalf.
2. `B` establishes a connection to `C` in an attempt to communicate with `A`.
3. `C` relays messages from `B` to `A`.

Note that `A` starts the connection to `C` because `A` is not publicly accessible.

### Multiaddresses

When sending messages over a circuit relay, we must know how to reach the _relay machine_ (i.e., the machine that is acting as a bridge). In the previous example, `B` has to find out how to reach `C`.

[Multiaddresses](https://github.com/multiformats/multiaddr) identify circuit relays by using the IDs of the peers involved. The following is a sample circuit relay multiaddress.

```
/ip4/127.0.0.1/tcp/2330/p2p/PEER_ID_OF_C/p2p-circuit/p2p/PEER_ID_OF_A
```

You can read the previous address like: "Make a connection to `127.0.0.1` at TCP port `2330`, which is the address of the peer `C`. Then, perform a circuit relay to peer `A`".

You can get more information about circuit relays in the [libp2p documentation](https://docs.libp2p.io/concepts/circuit-relay/) and the [Circuit Relay v2 specs](https://github.com/libp2p/specs/blob/master/relay/circuit-v2.md).

## Publish/Subscribe

A PubSub (Publish/Subscribe) system allows peers to only receive messages of a specific type. A _publisher_ sends messages of a specific type to _subscribers_ of that type. For example, consider a chat application with a chat group called `music`. Users interested subscribe to the group; when someone sends a message to the group, only those subscribed receive the message.

In libp2p, peers subscribe and send messages to _topics_. The concept is pretty similar to messaging systems (e.g., Kafka), but libp2p allows this behavior in a decentralized way. The main implementations of the protocol are Floodsub and Gossipsub.

In Floodsub, the first implementation of the pub/sub protocol, messages are delivered to all the connected nodes of a peer. For example, consider the following diagram.

![Floodsub message delivery](floodsub.png)

1. `Peer 1` is connected to `Peer 2` and `Peer 3`; `Peer 2` and `Peer 3` are connected to `Peer 4`.
2. `Peer 1` publishes a message, which is sent to `Peer 2` and `Peer 3`.
3. Both `Peer 2` and `Peer 3` forward the message to `Peer 4`.

FloodSub is simple, reliable, and highly resistant to malicious actors and censors, but the main problem of FloodSub is that it duplicates messages, thus using a lot of bandwidth. In the previous example, `Peer 4` receives the message twice.

[Gossipsub](https://arxiv.org/pdf/2007.02754.pdf), the protocol developed after FloodSub, tries to reduce the number of duplicate messages (i.e., bandwidth) by taking a different approach. Gossipsub is covered later in the Launchpad curriculum.

You can get more information about PubSub in the [libp2p documentation](https://docs.libp2p.io/concepts/publish-subscribe/).

## Resources

In the course of creating and researching distributed apps, there were a number of problems encountered that the libp2p project addressed. The following video is a workshop that covers some of the issues found in distributed networking.

{{< youtube oIMZP7sfFtM >}}
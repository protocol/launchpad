---
description: The Building Blocks of Libp2p
---

# Core Concepts

### Concepts

_This is an annotated version of_ [_this libp2p doc_](https://docs.libp2p.io/concepts/)

libp2p covers a lot of ground, and may involve unfamiliar terminology and concepts. This section defines some basic vocabulary and links to to the core information about these concepts.

#### [Transport](https://docs.libp2p.io/concepts/transport/)

To communicate on the internet, you need to use an agreed upon **T**ransport **P**rotocol (most of the internet uses a TCP/IP combination). With Libp2p you can listen, dial, and provide addresses (which specify the transport). Libp2p makes it possible to use multiaddresses to communicate with different protocols, in a peer-to-peer fashion.

#### [NAT Traversal]((https://docs.libp2p.io/concepts/nat/))

NAT allows many machines with private addressed on a private network to use a single public address, however, it also comes with a firewall, which can make it difficult for two peers to connect.

[NAT Traversal](https://tailscale.com/blog/how-nat-traversal-works/) is a strategy for making it possible for two peers behing NATs to connect.

Libp2p uses [STUN Hole-Punching and the TURN Circuit Relay Protocol](https://docs.libp2p.io/concepts/nat/) to give peers direct access to communicate with one another.  


#### [Circuit Relay]((https://docs.libp2p.io/concepts/circuit-relay/))

Circuit relay is a transport protocol that routes traffic between two peers over a third-party “relay” peer, when NAT Traversal and hole punching aren't an option, [the circuit relay can be used to connect them](https://blog.aira.life/understanding-ipfs-circuit-relay-ccc7d2a39).


#### [Protocols](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol)

Protocols define an application you are using with libp2p and provide the core funcitonality. [The Libp2p Protocol](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol) uses Protocol Ids to identify them, Handler Functions to accept connections, and Binary Streams as a medium.

There are some [key defining features of a libp2p protocol](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol), including a [protocol negotiation processes](https://docs.libp2p.io/concepts/protocols/#protocol-negotiation), and [libp2p uses other protocols defined here](https://docs.libp2p.io/concepts/protocols/#core-libp2p-protocols) to define itself.

#### Peer Identity

A Peer Identity (often written `PeerId`) is a unique reference to a specific peer within the overall peer-to-peer network.

As well as serving as a unique identifier for each peer, a PeerId is a verifiable link between a peer and its public cryptographic key.

**What is a PeerId**

Each libp2p peer controls a private key, which it keeps secret from all other peers. Every private key has a corresponding public key, which is shared with other peers.

Together, the public and private key (or “key pair”) allow peers to establish secure communication channels with each other.

Conceptually, a PeerId is a cryptographic hash of a peer’s public key. When peers establish a secure channel, the hash can be used to verify that the public key used to secure the channel is the same one used to identify the peer.

The PeerId spec goes into detail about the byte formats used for libp2p public keys and how to hash the key to produce a valid PeerId.

PeerIds are encoded using the multihash format, which adds a small header to the hash itself that identifies the hash algorithm used to produce it.

[Read More](https://docs.libp2p.io/concepts/peer-id/)

#### Addressing

Flexible networks need flexible addressing systems. Since libp2p is designed to work across a wide variety of networks, we need a way to work with a lot of different addressing schemes in a consistent way.

A `multiaddress` (often abbreviated `multiaddr`), is a convention for encoding multiple layers of addressing information into a single "future-proof" path structure. It \[defines]\[spec\_multiaddr] human-readable and machine-optimized encodings of common transport and overlay protocols and allows many layers of addressing to be combined and used together.

For example: `/ip4/127.0.0.1/udp/1234` encodes two protocols along with their essential addressing information. The `/ip4/127.0.0.1` informs us that we want the `127.0.0.1` loopback address of the IPv4 protocol, and `/udp/1234` tells us we want to send UDP packets to port `1234`.

Things get more interesting as we compose further. For example, the multiaddr `/p2p/QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N` uniquely identifies my local IPFS node, using libp2p's [registered protocol id](https://github.com/multiformats/multiaddr/blob/master/protocols.csv) `/p2p/` and the [multihash](https://github.com/protocol/launchpad/blob/main/reference/glossary/README.md#multihash) of my IPFS node's public key.

[Read More](https://docs.libp2p.io/concepts/addressing/)

#### Security Considerations

libp2p makes it simple to establish [encrypted, authenticated communication channels](https://github.com/protocol/launchpad/blob/main/docs/secure-comms/README.md) between two peers, but there are other important security issues to consider when building robust peer-to-peer systems.

Many of the issues described here have no known "perfect solution," and the solutions and mitigation strategies that do exist may come with tradeoffs and compromises in other areas. As a general-purpose framework, libp2p tries to provide the tools for application developers to address these problems, rather than taking arbitrary approaches to security that may not be acceptable to all systems built with libp2p.

**Identity and Trust**

Every libp2p peer is uniquely identified by their [peer id](https://github.com/protocol/launchpad/blob/main/docs/peer-id/README.md), which is derived from a private cryptographic key. Peer ids and their corresponding keys allow us to _authenticate_ remote peers, so that we can be sure we're talking to the correct peer and not an imposter.

**Cooperative Systems with Abuse Potential**

Some of libp2p's most useful built-in protocols are cooperative, leveraging other peers in the network to perform tasks that benefit everyone. For example, data stored on the Kad-DHT is replicated across the set of peers that are "closest" to the data's associated key, whether those peers have any particular interest in the data or not.

Cooperative systems are inherently susceptible to abuse by bad actors, and although we are researching ways to limit the impact of such attacks, they are possible in libp2p today.

[Read More](https://docs.libp2p.io/concepts/security-considerations/)

#### Publish/Subscribe

Publish/Subscribe is a system where peers congregate around topics they are interested in. Peers interested in a topic are said to be subscribed to that topic:

![peer topic blob](https://docs.libp2p.io/concepts/publish-subscribe/subscribed_peers.png)

Peers can send messages to topics. Each message gets delivered to all peers subscribed to the topic:

![peer message blob](https://docs.libp2p.io/concepts/publish-subscribe/message_delivered_to_all.png)

**Design goals**

In a peer-to-peer pub/sub system all peers participate in delivering messages throughout the network. There are several different designs for peer-to-peer pub/sub systems which offer different trade-offs. Desirable properties include:

* **Reliability:** All messages get delivered to all peers subscribed to the topic.
* **Speed:** Messages are delivered quickly.
* **Efficiency:** The network is not flooded with excess copies of messages.
* **Resilience:** Peers can join and leave the network without disrupting it. There is no central point of failure.
* **Scale:** Topics can have enormous numbers of subscribers and handle a large throughput of messages.
* **Simplicity:** The system is simple to understand and implement. Each peer only needs to remember a small amount of state.

libp2p currently uses a design called gossipsub. It is named after the fact that peers gossip to each other about which messages they have seen and use this information to maintain a message delivery network.

[Read More](https://docs.libp2p.io/concepts/publish-subscribe/)

#### Stream Multiplexing

Stream Multiplexing (often abbreviated as "stream muxing") allows multiple independent logical streams to all share a common underlying transport medium.

libp2p applications often open many independent streams of communication between peers and may have several concurrent streams open at the same time with a given remote peer. Stream multiplexing allows us to amortize the overhead of establishing new [transport](https://github.com/protocol/launchpad/blob/main/concepts/transport/README.md) connections across the lifetime of our interaction with a peer. We also only need to deal with [NAT traversal](https://github.com/protocol/launchpad/blob/main/concepts/nat/README.md) once to be able to open as many streams as we need, since they will all share the same underlying transport connection.

libp2p provides a common [interface](core-concepts.md#interface) for stream multiplexers with several [implementations](core-concepts.md#implementations) available. Applications can enable support for multiple multiplexers, which will allow you to fall back to a widely-supported multiplexer if a preferred choice is not supported by a remote peer.

**Where it Fits in the Libp2p Stack**

libp2p's multiplexing happens at the "application layer", meaning it's not provided by the operating system's network stack. However, developers writing libp2p applications rarely need to interact with stream multiplexers directly, except during initial configuration to control which modules are enabled.

**Interface**

The \[stream multiplexing interface]\[interface-stream-muxing] defines how a stream muxing module can be applied to a connection and what operations are supported by a multiplexed connection.

**Implementations**

There are several stream multiplexing modules available in libp2p. Please note that not all stream muxers are supported by every libp2p language implementation.

[Read More](https://docs.libp2p.io/concepts/stream-multiplexing/)

### Concrete Types and Building Blocks

Use [Crate Libp2p](https://docs.rs/libp2p/0.40.0/libp2p/) to understand the modules, macros, structs, enums, traits, and functions used for the libp2p implementations

#### Rust Libp2p Tutorial (Optional)

_Find the_ [_full tutorial here_](https://docs.rs/libp2p/0.40.0/libp2p/tutorial/index.html)

This tutorial aims to give newcomers a hands-on overview on how to use the Rust libp2p implementation. People new to Rust likely want to get started on Rust itself, before diving into all the networking fun. This library makes heavy use of asynchronous Rust. In case you are not familiar with these concepts the Rust async-book should prove useful. People new to libp2p might prefer to get a general overview at libp2p.io first, though libp2p knowledge is not required for this tutorial.

This tutorial covers building a small ping clone, sending a ping to a peer, expecting a pong as a response.

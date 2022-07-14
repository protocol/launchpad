---
description: The Building Blocks of libp2p
---

# Core Concepts

### What is libp2p?
libp2p is a modular peer networking stack, consisting of protocols, specs, and libraries, with many building blocks that can be implemented in applications independently, or in any combination that an application developer wishes.

libp2p lives on and above the transport layers (in the traditional OSI model) and allows you to use the transport, security, encryption, and multiplexing protocols that you choose, interchangeably.

![libp2p stack](<../../.gitbook/assets/libp2p_stack.png>)

With the libp2p networking layer, you can use the building blocks available to you to on browsers, mobile devices, and embbeded runtimes, using the [go-libp2p](https://github.com/libp2p/go-libp2p), [js-libp2p](https://github.com/libp2p/js-libp2p), [rust-libp2p](https://github.com/libp2p/rust-libp2p), and [other](https://github.com/libp2p) implementations. [Learn more on libp2p.io](https://libp2p.io/implementations/).

Libp2p gives you the ability to locate, connect, authenticate, negotiate protocols, and interact with peers and processes, regardless of runtime.


### Concepts

_This is an annotated version of_ [_this libp2p doc_](https://docs.libp2p.io/concepts/)

libp2p covers a lot of ground, and may involve unfamiliar terminology and concepts. This section defines some basic vocabulary and links to to the core information about these concepts.

#### [Transport](https://docs.libp2p.io/concepts/transport/)

To communicate on the internet, you need to use an agreed upon **T**ransport **P**rotocol (most of the internet uses a TCP/IP combination). With libp2p you can listen, dial, and provide addresses (which specify the transport). libp2p makes it possible to use multiaddresses to communicate with different protocols, in a peer-to-peer fashion.

#### [NAT Traversal]((https://docs.libp2p.io/concepts/nat/))

NAT allows many machines with private addressed on a private network to use a single public address, however, it also comes with a firewall, which can make it difficult for two peers to connect.

[NAT Traversal](https://tailscale.com/blog/how-nat-traversal-works/) is a strategy for making it possible for two peers behing NATs to connect.

libp2p uses [STUN Hole-Punching and the TURN Circuit Relay Protocol](https://docs.libp2p.io/concepts/nat/) to give peers direct access to communicate with one another.  


#### [Circuit Relay]((https://docs.libp2p.io/concepts/circuit-relay/))

Circuit relay is a transport protocol that routes traffic between two peers over a third-party “relay” peer, when NAT Traversal and hole punching aren't an option, [the circuit relay can be used to connect them](https://blog.aira.life/understanding-ipfs-circuit-relay-ccc7d2a39).


#### [Protocols](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol)

Protocols define an application you are using with libp2p and provide the core funcitonality. [The libp2p Protocol](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol) uses Protocol Ids to identify them, Handler Functions to accept connections, and Binary Streams as a medium.

There are some [key defining features of a libp2p protocol](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol), including a [protocol negotiation processes](https://docs.libp2p.io/concepts/protocols/#protocol-negotiation), and [libp2p uses other protocols defined here](https://docs.libp2p.io/concepts/protocols/#core-libp2p-protocols) to define itself.

#### [Peer Identity](https://docs.libp2p.io/concepts/peer-id/)

A Peer Identity (often written `PeerId`) is a unique multihash identifier for each peer with a link to their public key.


#### [Addressing](https://docs.libp2p.io/concepts/addressing/)

Flexible networks need flexible addressing systems. Since libp2p is designed to work across a wide variety of networks, we need a way to work with a lot of different addressing schemes in a consistent way.

libp2p uses a flexible addressing system that can work in many different networks and interact with many different addressing schemes. libp2p uses known as a `multiaddress` (aka `multiaddr`), which is a convention for encoding multiple layers of addressing information into a single "future-proof" path structure.

#### [Security](https://docs.libp2p.io/concepts/security-considerations/)

libp2p makes it simple to establish [encrypted, authenticated communication channels](https://github.com/protocol/launchpad/blob/main/docs/secure-comms/README.md) between two peers, but there are other important security issues to consider when building robust peer-to-peer systems.


**Identity and Trust**

Every libp2p peer is uniquely identified by their [peer id](https://github.com/protocol/launchpad/blob/main/docs/peer-id/README.md), which is derived from a private cryptographic key. Peer ids and their corresponding keys allow us to _authenticate_ remote peers, but it does not provide a authorization out-of-the-box.

#### [Publish/Subscribe](https://docs.libp2p.io/concepts/publish-subscribe/)

Publish/Subscribe is a system where peers congregate around topics they are interested in. Peers interested in a topic are said to be subscribed to that topic

Peers can send messages to topics. Each message gets delivered to all peers subscribed to the topic:

![peer messaging](https://docs.libp2p.io/concepts/publish-subscribe/types_of_peering.png)


#### [Stream Multiplexing](https://docs.libp2p.io/concepts/stream-multiplexing/)

Stream Multiplexing (_stream muxing_) is a way of sending multiple streams of data over one communication link. It combines multiple signals into one unified signal so it can be transported 'over the wires', then it is demulitiplexed (_demuxed_) so it can be output and used by separate applications.

This is done to share the transmission bandwidth available between multiple sources to make transmission more efficient.


**Where it Fits In**

libp2p's multiplexing happens at the application layer, meaning it's not provided by the operating system's network stack.

**[Multiplex Implementations](https://docs.libp2p.io/concepts/stream-multiplexing/#implementations)**

Implementations of the multiplexing module include mplex protocol developer for libp2p, yamux by Hashicorp, quic transport protocol which includes a multiplexer, SPDY by Google, and more.

#### [The Modular p2p Networking Stack | ResNetLabs On Tour – Alfonso de la Rocha](https://research.protocol.ai/tutorials/resnetlab-on-tour/modular-p2p-stack/)

libp2p is the Web 3.0 framework of choice for decentralised process addressing. In this module, you will hear about libp2p’s modular and composable building blocks for P2P networking applications and innovation, which include:

* Transport and pubsub protocols
* Multiplexers
* Secure channels and NAT Traversal
* Peer discovery, content routing, and peer routing

{% embed url="https://www.youtube.com/watch?v=bWY0op7FmJ8" %}

### Other Resources

Use [Crate libp2p](https://docs.rs/libp2p/0.40.0/libp2p/) to understand the modules, macros, structs, enums, traits, and functions used for the libp2p implementations

#### Rust libp2p Tutorial (Optional)

_Find the_ [_full tutorial here_](https://docs.rs/libp2p/0.40.0/libp2p/tutorial/index.html)

This tutorial aims to give newcomers a hands-on overview on how to use the Rust libp2p implementation.

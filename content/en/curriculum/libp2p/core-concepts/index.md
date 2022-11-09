---
title: "Core Concepts"
description: "The Building Blocks of libp2p"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 300
category: lecture
level:
- shallow
- deep
---

## Concepts

_This is an annotated version of_ [_this libp2p doc_](https://docs.libp2p.io/concepts/)

libp2p covers a lot of ground, and may involve unfamiliar terminology and concepts. This section defines some basic vocabulary and links to to the core information about these concepts.
libp2p allows you to create peer to peer networks in a modular way by choosing the protocols that you application needs.

### [Transport](https://docs.libp2p.io/concepts/transports/)

A key part of a network is the transport layer (consider the TCP/IP or OSI model). Most communications in the Internet happen by using the TCP transport protocol, although UDP is also widely used.
libp2p allows you to choose the transport protocol that best fits your application.

At the transport network level, libp2p offers TCP or QUIC (a new transport protocol built on top of UDP). When we open a connection with other peers in the network, we use a transport protocol.

### [Stream Multiplexing](https://docs.libp2p.io/concepts/multiplex/)

Once we have opened a connection by using a transport protocol, libp2p offers multiplexing out the box.
Opening new connections is _expensive_ from a resources point of view, so libp2p uses stream multiplexing to exchange different types of data within the same connection.
Basically, libp2p splits the connection into several logical _streams_. Every stream holds a different type of data.

### [NAT Traversal](https://docs.libp2p.io/concepts/nat/)

Consider the Internet router that you have at home. You probably have several devices connected to it (laptops, mobile phones, or even the fridge).
When you join the Internet, you are given an address identifier, which is called IP.
However, the number of IPs in the Internet is limited, so every device does not get a public IP address.
Instead, your router creates a private network in your home and assigns a private IP to every device. Then, the router is responsible for managing the incoming and outgoing connection from the Internet.
This is called NAT (Network Address Traversal). For example, consider the following diagram:

// image

The router is connected to the Internet, and is assigned a public IP address. Three devices are connected to the route, which manages the incoming and outgoing data.

Although this a great way of avoiding the waste of IP address, it brings a problem, especially in peer to peer network.
The only part of our network is the router, so what happens if a computer from the Internet wants to connect a specific device in our private network?
libp2p offers several NAT traversal methods to avoid this issue, such as hole-punching or circuit relays.

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

![peer messaging](peering.png)


**Where it Fits In**

libp2p's multiplexing happens at the application layer, meaning it's not provided by the operating system's network stack.

**[Multiplex Implementations](https://docs.libp2p.io/concepts/stream-multiplexing/#implementations)**

Implementations of the multiplexing module include mplex protocol developer for libp2p, yamux by Hashicorp, quic transport protocol which includes a multiplexer, SPDY by Google, and more.


### Other Resources

Use [Crate libp2p](https://docs.rs/libp2p/0.40.0/libp2p/) to understand the modules, macros, structs, enums, traits, and functions used for the libp2p implementations

#### Rust libp2p Tutorial (Optional)

_Find the_ [_full tutorial here_](https://docs.rs/libp2p/0.40.0/libp2p/tutorial/index.html)

This tutorial aims to give newcomers a hands-on overview on how to use the Rust libp2p implementation.

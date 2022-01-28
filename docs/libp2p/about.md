---
description: Add the subtitle here
---

# Libp2p

Libp2p is a modularized and extensible network stack to overcome the networking challenges faced when doing peer-to-peer applications. libp2p is used by IPFS as its networking library.

![](<../.gitbook/assets/image (7).png>)

Building large scale peer-to-peer systems has been complex and difficult over the last 15 years, and libp2p is a way to fix that. It is a “network stack,” a protocol suite that cleanly separates concerns, and enables sophisticated applications to only use the protocols they absolutely need, without giving up interoperability and upgradeability. libp2p grew out of IPFS, but it is built so that lots of people can use it for lots of different projects.

### Introduction to Libp2p | David Dias

{% embed url="https://www.youtube.com/watch?v=CRe_oDtfRLw" %}

## Why Libp2p?

_This is an annotated version of the_ [_blog by Pierre Kreiger on parity.io_](https://www.parity.io/blog/why-libp2p)

Libp2p is a network framework that allows you to write decentralized peer-to-peer applications. Originally the networking protocol of IPFS, it has since been extracted to become its own first-class project.

As part of the development process of Polkadot, we created [our own implementation of libp2p](https://github.com/libp2p/rust-libp2p) written in Rust, with the intent of using it in Polkadot and Substrate. While not completely mature, it is already quite robust and successfully powering the current testnets.

So what is libp2p and why did we choose it as the networking layer of Polkadot and Substrate?

### Objectives

All distributed peer-to-peer networks have a set of challenges that are distinct from traditional networks. Libp2p is a generalized toolkit so that developers can use plug-and-play networking with their distributed application.

A fundamental shift in distributed computing is that the “client/server” paradigm no longer holds up. Let’s take a look at what your home router does. Every device in your home network has a **private** IP address. When you request data from a server, your router replaces your device’s private address with your home’s **public** IP address, and remembers which device to send the response to.

That works fine if all your devices are clients, but what about when a request from the outside world shows up at your router? It’s not a response to a request, it is a request, so the requestor thinks that you are a server. One of your devices is acting as a server, but your router doesn’t know which one. This is a problem called NAT traversal, and libp2p provides tools to help handle it.

Libp2p also handles peer discovery and handshake protocols. In a world where clients act as servers too, there will inevitably be a variety of hardware, operating systems, and communication protocols between nodes. Encryption and security underpin Web3 design, and libp2p supports both unencrypted (e.g. TCP, UDP) and encrypted protocols (e.g. TLS, Noise) out of the box.

Many web protocols are stuck in the 90’s, and as security holes are breached, more and more patches are added. That’s where libp2p’s modularity comes in. Libp2p is designed so that you can upgrade any element you want, all while remaining backwards compatible.

Modularity Libp2p has been designed from the start to be very modular, so that it can be implemented in many different peer-to-peer projects. While nodes in traditional peer-to-peer applications are referred to by an IP address and port combination, libp2p uses the concept of a multiaddress instead. Some examples:

* `/ip4/90.46.231.22/udp/25000` indicates the node whose IP address is `90.46.231.22` and listening on UDP port 25000.
* `_/ip6/fe80::0202:b3ff:fe1e:8329/udp/1567/_quic` means that we should use [the QUIC protocol](https://en.wikipedia.org/wiki/QUIC) on top of UDP port 1567 with an IPv6 address. \*`/dnsaddr/example.com/tcp/80/ws` means that we should use the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket) on top of TCP port 80, using DNS to resolve the hostname example.com.

Not all projects that use libp2p need to support all protocols. In fact, the concept of a multiaddress exists in order to make it possible to extend libp2p with new protocols (as was done for example with QUIC in the past). In the future we may, for example, add Bluetooth as a transport protocol.

The second main aspect of libp2p’s modularity is its protocol negotiation process. Once a connection between two peers has been established, the only thing that libp2p handles is negotiating the protocols that are used on that connection.

While nodes are encouraged to support a specific set of common protocols, none of them are technically mandatory. This makes it possible to easily experiment with new protocols or new ideas, and to deploy new versions of protocols while still supporting old versions without adding technical debt.

### The Main Libp2p Protocols

While there is no mandatory protocol, in practice nodes are encouraged to support the most commonly-supported protocols. This includes:

* _secio_, which is responsible for encrypting communications.
* _mplex_ or _yamux_, which are protocols on top of secio that are responsible for multiplexing.

[Multiplexing](https://en.wikipedia.org/wiki/Multiplexing) is the process in which multiple individual streams of data are grouped together into a single connection. As in, you probably have one coax or fiber cable coming into your apartment, but you and your roommate both want to stream different movies on Netflix. The data must be multiplexed to travel to your home, and demultiplexed to arrive at the correct device.

Once we have the ability to do this, we can, almost for free, open as many substreams as we want using as many different protocols as we want. These protocols include:

* _identify_, which makes it possible to obtain information about a node, including the multiaddresses it’s listening on and the multiaddress it sees us as, similar to what [the STUN protocol](https://en.wikipedia.org/wiki/STUN) does.
* _ping_, which enables pinging the remote to determine whether it’s still alive.
* [_kademlia_](https://en.wikipedia.org/wiki/Kademlia), for peer discovery and distributed records storage.
* _floodsub_ and _gossipsub_, two \[pub-sub]\(https://en.wikipedia.org/wiki/

In the context of Substrate, each project is able to define its own networking protocol. For example, the protocol used by the BBQ Birch testnet is named bbq while the protocol used by Polkadot is named dot.

### The Global Vision of Libp2p

Another reason to use libp2p is its involvement in decentralized projects. It has been powering IPFS from the very beginning, and is going to be powering several emerging projects such as Filecoin, probably Ethereum 2.0, Agoric, and of course Substrate and Polkadot.

Having multiple projects share the same network protocol has a big advantage: it makes it possible for nodes to share their capability across multiple networks. To give you an example, let’s take the relay protocol.

In a decentralized environment, you often want nodes to be directly connected to one another. However, in practice, many nodes are not reachable, as they are behind NATs or use platforms that don’t allow incoming connections.

To solve this problem, libp2p provides a protocol named relay which allows a node to act as a proxy between two other nodes. All communication is encrypted and the identity of the remote is verified, so the proxy cannot act as a man-in-the-middle.

By having multiple projects use libp2p as their networking stack, they will all be able to benefit from the same relay nodes, and therefore share resources.

Libp2p has been designed to be the network protocol powering the future of decentralization. When companies launch traditional applications, they only focus on the application experience and logic—they don’t need to reinvent TCP/IP. That is the ultimate goal of libp2p: allow application developers to develop applications knowing that their service will be reachable and available. With implementations in Rust, JavaScript, and Go and development in Java, Haskell, and Python, libp2p is growing fast.

You can find the Rust code here: [libp2p/rust-libp2p](https://github.com/libp2p/rust-libp2p)

If you want to contribute, start by checking out the [contribution guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md).

## More on Libp2p Basics (Optional)

### Intro to Libp2p | Encode Filecoin Club - Max Inden

In this talk by Steven & Dietrich, they review some of the customs and best practices involved when becoming a part of an open source community.

{% embed url="https://www.youtube.com/watch?v=7OZLImVRvro" %}

### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **Libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

---
description: Add the subtitle here
---

# Libp2p

Libp2p is a modularized and extensible network stack to overcome the networking challenges faced when doing peer-to-peer applications. libp2p is used by IPFS as its networking library.

![](<../../.gitbook/assets/image (10).png>)

Building large scale peer-to-peer systems has been complex and difficult over the last 15 years, and libp2p is a way to fix that. It is a “network stack,” a protocol suite that cleanly separates concerns, and enables sophisticated applications to only use the protocols they absolutely need, without giving up interoperability and upgradeability. libp2p grew out of IPFS, but it is built so that lots of people can use it for lots of different projects.

### The Libp2p Roadmap

**[Our long term roadmap](https://github.com/libp2p/specs/blob/master/ROADMAP.md)**

This is the stuff that moves libp2p from "a networking toolbox to build P2P applications" to the thing that fundamentally reshapes the architecture of the Internet; our dreams and aspirations, the North star we should always keep in sight; this is what motivates us and it's speaks intimately to our mission statement; the libp2p analogy of IPFS working on Mars.

[Node data dashboard](https://kademlia-exporter.max-inden.de/d/-avwMhsik/kademlia-exporter?orgId=1)

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


### The Global Vision of Libp2p

Another reason to use libp2p is its involvement in decentralized projects. It has been powering IPFS from the very beginning, and is going to be powering several emerging projects such as Filecoin, probably Ethereum 2.0, Agoric, and of course Substrate and Polkadot.

You can find the Rust code here: [libp2p/rust-libp2p](https://github.com/libp2p/rust-libp2p)

If you want to contribute, start by checking out the [contribution guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md).

### Intro to Libp2p | Encode Filecoin Club - Max Inden

In this talk by Steven & Dietrich, they review some of the customs and best practices involved when becoming a part of an open source community.

{% embed url="https://www.youtube.com/watch?v=7OZLImVRvro" %}

### Tutorials
For those who are newer to the world of Filecoin, Web3, and storage verification, check out the [Protoschool tutorials](https://proto.school/tutorials). Tutorials you should complete include:

* [Introduction to Libp2p](https://proto.school/introduction-to-libp2p)
* [Blogging on the Decentralized Web](https://proto.school/blog)

### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **Libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

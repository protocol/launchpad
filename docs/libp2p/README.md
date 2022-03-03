---
description: The Networking Layer
---

# Libp2p
**libp2p is the networking & communicationg layer** for IPFS.

Moving from a location-addressed system to a peer-to-peer, content addressed system presents a lot of challenges. The internet as it is, with firewalls and NATs, was designed to provide data (securely) for the traditional Web2 systems. 

Libp2p is a modular system of *protocols*, *specifications* and *libraries* that enable the development of peer-to-peer network applications. Because of the way libp2p is architected, a lot of the needs and considerations that the web2 network was built on no longer apply.

![](<../../.gitbook/assets/image (10).png>)

Building large scale peer-to-peer systems has presented many complex difficulties, and libp2p is a way to fix that. The libp2p projects makes it possible for a [peer-to-peer](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-to-peer-basics) applications to operate in an [interface that supports many Internet protocols](https://docs.libp2p.io/introduction/what-is-libp2p/#transport), with [secure identities](https://docs.libp2p.io/introduction/what-is-libp2p/#identity), [peer routing](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-routing), and content discovery](https://docs.libp2p.io/introduction/what-is-libp2p/#content-discovery).

### The Libp2p Roadmap

**[Our long term roadmap](https://github.com/libp2p/specs/blob/master/ROADMAP.md)**

This is the stuff that moves libp2p from "a networking toolbox to build P2P applications" to the thing that fundamentally reshapes the architecture of the Internet; our dreams and aspirations, the North star we should always keep in sight; this is what motivates us and it's speaks intimately to our mission statement; the libp2p analogy of IPFS working on Mars.

[Node data dashboard](https://kademlia-exporter.max-inden.de/d/-avwMhsik/kademlia-exporter?orgId=1)

### Introduction to Libp2p | David Dias

{% embed url="https://www.youtube.com/watch?v=CRe_oDtfRLw" %}

## Why Libp2p?

_Read more about why libp2p in this [_blog by Pierre Kreiger on parity.io_](https://www.parity.io/blog/why-libp2p)

Libp2p is a network framework that allows you to write decentralized peer-to-peer applications. Originally the networking protocol of IPFS, it has since been extracted to become its own first-class project.

### Objectives

All distributed peer-to-peer networks have a set of challenges that are distinct from traditional networks. Libp2p is a generalized toolkit so that developers can use plug-and-play networking with their distributed application.

A fundamental shift in distributed computing is that the “client/server” paradigm no longer holds up. Let’s take a look at what your home router does.

Every device in your home network has a **private** IP address. When you request data from a server, your router replaces your device’s private address with your home’s **public** IP address, and remembers which device to send the response to.

That works fine if all your devices are clients, but what about when a request from the outside world shows up at your router? It’s not a response to a request, it is a request, so the requestor thinks that you are a server. One of your devices is acting as a server, but your router doesn’t know which one. This is a problem called NAT traversal, and libp2p provides tools to help handle it.

Libp2p also handles peer discovery and handshake protocols. In a world where clients act as servers too, there will inevitably be a variety of hardware, operating systems, and communication protocols between nodes. Encryption and security underpin Web3 design, and libp2p supports both unencrypted (e.g. TCP, UDP) and encrypted protocols (e.g. TLS, Noise) out of the box.

### Intro to Libp2p | Encode Filecoin Club - Max Inden

In this talk by Steven & Dietrich, they review some of the customs and best practices involved when becoming a part of an open source community. [Learn more about contributing](https://docs.libp2p.io/contributing/) and check out the [community repo](https://github.com/libp2p/community).

{% embed url="https://www.youtube.com/watch?v=7OZLImVRvro" %}

### Tutorials
For those who are newer to the world of Filecoin, Web3, and storage verification, check out the [Protoschool tutorials](https://proto.school/tutorials). Tutorials you should complete include:

* [Introduction to Libp2p](https://proto.school/introduction-to-libp2p)
* [Blogging on the Decentralized Web](https://proto.school/blog)

### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **Libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

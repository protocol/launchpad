---
title: "Introduction to libp2p"
description: "The Networking Layer"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 290
category: lecture
level:
- shallow
- deep
objectives:
  show: true
  goals:
  - 1.1
  subgoals:
  - 1.11
  - 1.12
  - 1.13
---
## Why libp2p?

The libp2p project was created out of IPFS to provide solutions to the many problems that are presented when we try and break free from the client-server model. Typical web2 applications rely on sending messages to and from a central server. This means, when you send e-mails, post on social media sites, and make purchases online, you are relying on a centralized server run by Amazon, Google, or Facebook (to name a few). Relying on the client-server model means that these companies not only have control over what is served, and to whom, but also the data that goes along with it. The article on [breaking free from the client-server model](https://hackernoon.com/the-client-server-model-breaking-free-with-ipfs) explains this more in-depth.

libp2p is a networking framework that allows you to write decentralized peer-to-peer applications. Originally the networking protocol of IPFS, it has since been extracted to become its own first-class project, used by applications outside of IPFS.

The libp2p project works on solving many of the networking and communications problems presented in building a distributed network.  Building large scale peer-to-peer systems has presented many complex difficulties, and libp2p is a way to fix that. The libp2p projects makes it possible for a peer-to-peer applications to operate in an interface that supports many Internet protocols, with secure identities, content discovery, and other building blocks.

Read more about libp2p in this [blog by Pierre Kreiger on parity.io](https://www.parity.io/blog/why-libp2p)

### The libp2p Roadmap & Dashboard

See **[the libp2p long term roadmap](https://github.com/libp2p/specs/blob/master/ROADMAP.md)** to understand the plan of how this project will move the libp2p project from a networking toolbox to build P2P applications to the thing that fundamentally reshapes the architecture of the Internet.

You can also explore the **[node data dashboard](https://kademlia-exporter.max-inden.de/d/-avwMhsik/kademlia-exporter?orgId=1)** to see data about the libp2p nodes that are running today.

### Introduction to libp2p | David Dias

{{< youtube CRe_oDtfRLw >}}

### Objective

All distributed peer-to-peer networks have a set of challenges that are distinct from traditional networks. libp2p is a generalized toolkit so that developers can use plug-and-play networking with their distributed application.

A fundamental shift in distributed computing is that the “client/server” paradigm no longer holds up.

#### Routing
Every device in your home network has a **private** IP address. When you request data from a server, the router on your home network replaces your device’s private address with your home’s **public** IP address, and remembers which device to send the response to.

That works fine if all your devices are clients, but what about when a request from the outside world shows up at your router? It’s not a response to a request, it is a request, so the requestor thinks that you are a server. One of your devices is acting as a server, but your router doesn’t know which one. This is a problem called NAT traversal, and libp2p provides tools to help handle it.

#### Peer Discovery
libp2p also handles peer discovery and handshake protocols. In a world where clients act as servers too, there will inevitably be a variety of hardware, operating systems, and communication protocols between nodes. Encryption and security underpin Web3 design, and libp2p supports both unencrypted (e.g. TCP, UDP) and encrypted protocols (e.g. TLS, Noise) out of the box.

### Intro to libp2p | Encode Filecoin Club - Max Inden

In this talk by Max Inden, learn about the purpose of libp2p, which networking protocols it supports, and some of the interesting projects being built with it.

{{< youtube 7OZLImVRvro >}}


### libp2p Users

The users of the libp2p protocol suite include, and is a list that is always being added to:

* [Prysmaticlabs.com](http://prysmaticlabs.com)
* [onflow.org](http://onflow.org)
* [minaprotocol.com](http://minaprotocol.com)
* [polygon.technology](http://polygon.technology)
* [celestia.org](http://celestia.org)
* [elrond.com](http://elrond.com)
* [0x.org](http://0x.org)
* [filecoin.io](http://filecoin.io)
* [ipfs.io](http://ipfs.io)
* [ethereum.org](https://ethereum.org/en/eth2/)
* [polkadot.network](https://polkadot.network)

**Resources:**
* [Blog with Pubsub instructions](https://bitly.protocol.ai/pubsub-blog)
* [Other Pubsub Options](https://bitly.protocol.ai/pusub-flags)
* [lipbp2p Docs – Publish/Subscribe](https://docs.libp2p.io/concepts/publish-subscribe/)

### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

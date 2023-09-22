---
title: "Introduction to libp2p"
description: "The Networking Layer"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 20
category: lecture
level:
- shallow
- deep
objectives:
  show: true
  goals:
  - "1.0"
  subgoals:
  - 1.01
  - 1.02
  - 1.03
---

Building large scale peer-to-peer systems has presented many complex difficulties, and libp2p is a way to fix that. The libp2p projects makes it possible for a [peer-to-peer](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-to-peer-basics) applications to operate in an [interface that supports many Internet protocols](https://docs.libp2p.io/introduction/what-is-libp2p/#transport), with [secure identities](https://docs.libp2p.io/introduction/what-is-libp2p/#identity), [peer routing](https://docs.libp2p.io/introduction/what-is-libp2p/#peer-routing), and [content discovery](https://docs.libp2p.io/introduction/what-is-libp2p/#content-discovery).

### The libp2p Roadmap

**[Our long term roadmap](https://github.com/libp2p/specs/blob/master/ROADMAP.md)**

This is the stuff that moves libp2p from "a networking toolbox to build P2P applications" to the thing that fundamentally reshapes the architecture of the Internet; our dreams and aspirations, the North star we should always keep in sight; this is what motivates us and it's speaks intimately to our mission statement; the libp2p analogy of IPFS working on Mars.

[Node data dashboard](https://kademlia-exporter.max-inden.de/d/-avwMhsik/kademlia-exporter?orgId=1)

## libp2p Introduction

This recording and deck is intended to provide a high-level overview of the fundamental concepts of libp2p.

{{< youtube Xw-5cRSs85M>}}

{{< embed src="https://docs.google.com/presentation/d/e/2PACX-1vSBFLQibkm_YWUi0sIaY7CLLd4PMpPk0kjgE1nt5XPBuHwhTU0owdCP44nv5OzBmoDAOIwcy4Ngx0AV/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" >}}
Introduction to libp2p (3/9/23)

### Introduction to libp2p | David Dias

{{< youtube CRe_oDtfRLw >}}

## Why libp2p?

Read more about _why libp2p in this [blog by Pierre Kreiger on parity.io](https://www.parity.io/blog/why-libp2p)_

libp2p is a network framework that allows you to write decentralized peer-to-peer applications. Originally the networking protocol of IPFS, it has since been extracted to become its own first-class project.

### Objectives

All distributed peer-to-peer networks have a set of challenges that are distinct from traditional networks. libp2p is a generalized toolkit so that developers can use plug-and-play networking with their distributed application.

A fundamental shift in distributed computing is that the “client/server” paradigm no longer holds up. Let’s take a look at what your home router does.

Every device in your home network has a **private** IP address. When you request data from a server, your router replaces your device’s private address with your home’s **public** IP address, and remembers which device to send the response to.

That works fine if all your devices are clients, but what about when a request from the outside world shows up at your router? It’s not a response to a request, it is a request, so the requestor thinks that you are a server. One of your devices is acting as a server, but your router doesn’t know which one. This is a problem called NAT traversal, and libp2p provides tools to help handle it.

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
* [libp2p Docs – Publish/Subscribe](https://docs.libp2p.io/concepts/publish-subscribe/)

### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

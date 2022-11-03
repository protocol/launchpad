---
title: "Data Discovery & Connections"
description: "Mutable Content, CIDs, the DHT, Nodes, Peers, and Kademlia"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 90
category: lecture
level:
- shallow
- deep
---
### Objectives

**IPFS 1.2 – Be able to explain how content is shared on IPFS**
* **IPFS 1.21 –** Be able to describe what content identifiers and mutable data are
* **IPFS 1.22 –** Understand the challenges posed in a decentralized content sharing system
* **IPFS 1.23 –** Be able to explain what a peer, node, and swarm are in the context of IPFS
* **IPFS 1.24 –** Understand the basics of the public DHT
<!-- * **IPFS 1.25 –** Understand garbage collection process on an IPFS node and how to keep data discoverable on IPFS -->
<!-- This ^ is probably too deep for a shallow dive-- they don't know what garbage collection is -->

## Content Identifiers
with IPFS, instead of using a **URL** (**U**niform **R**esource **L**ocator) that the current world wide web uses to locate content, where it is located, stored in a server, and router to using the DNS (Domain Name Service), all content on the network is given a **C**ontent **ID**entifier (**CID**) that is able to locate any given unique piece of content according to _what_ it is instead of _where_ it is. This enables content to not only be universally identifiable, but also hosted by 1, 10, 100, or thousands of peers, and seeded from multiple sources.

## Mutable Content
One of the most powerful things about IPFS is that any piece of data or content you store on the network cannot be modified without changing the [Content Identifier (CID)](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipld/content-addressing-and-cids) for that data, since the CID is created (in part) by hashing the content. There are various ways to create mutable data on top of IPFS and in this lesson we will learn what just a few of them are.

### Mutable Content | ResNetLabs on Tour – David Dias
_See the full set of resources [on the ResNetLab Tutorials page](https://research.protocol.ai/tutorials/resnetlab-on-tour)_

{{< youtube 57guoGS53Bo >}}

## The InterPlanetary Name System (IPNS)

### Pinning and Immutability

By default, content on IPFS is not _pinned_. That means when you add a file to IPFS, if you don't keep your node up an running at all times (assuming someone else doesn't pin and make the content available), it isn't permanentl discoverable on the network. To mitigate this problem you must _pin_ your content to your [node](https://docs.ipfs.tech/concepts/nodes/#nodes) to ensure it persists on IPFS.

Your options for pinning content are:
1. You pin it locally to your own node. Note that if the content is only pinned to your local node, it must be online for peers to get that content.
2. You use a [pinning service](https://docs.ipfs.io/concepts/persistence/#pinning-services). Some pinning services require payment for their services, others offer a [free storage allowance for new users](https://docs.ipfs.tech/concepts/persistence/#ipfs-filecoin-solutions).


![Pinning IPFS](pinning.png)


####

Since IPFS uses CIDs, if you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content, because every change would result in a new CID.

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating a link that can be updated. IPNS addresses help bridge the unfamiliarity gap to a new internet for users who are used to location-based addresses like URLs for locating content.

This "link" in IPNS is called a _name_, this _name_ is the hash of a public key. The name is associated with a record containing information about the hash that it points to and is signed by the public key’s corresponding private key.
<!-- This allows new records to be signed and published at any time. Using IPNS means that when someone searches for your website using your _name_, they will receive the most up-to-date content as expected in today's internet. You can learn more about IPNS and [how to use it here](https://docs.ipfs.tech/concepts/ipns/#example-ipns-setup-with-cli).

When looking up an IPNS _name_ via an IPFS gateway, use the `/ipns/` prefix: -->

```
/ipns/k2k4r8jl0yz8qjgqbmc2cdu5hkqek5rj6flgnlkyywynci20j0iuyfuj
```


### Pubsub + IPNS

[**Publish/Subsribe (PubSub)**](https://docs.libp2p.io/concepts/publish-subscribe/) is a messaging protocol to quickly communicate with other peers. Whenever a peer Publishes a message, Subscribing peers will receive it almost instantly. This protocol is not specific to IPFS or IPNS, but to [Libp2p](https://docs.ipfs.tech/concepts/libp2p/); paired with IPNS it allows for quick delivery of records over the network. With PubSub enabled on IPNS, updates to a record can be shared virtually instantly with subscribers.

IPNS allows you to sign content and make a mutable version of your content available for users who want to access, say, an updated website according to a given name, much in the same way that you can access the most updated version of a website with the URL. Publishers sign the content on IPNS with their public key, enabling users to know that the particular, updated version of the content they want is from a trusted source.

#### Subscribe to Content with IPNS  

 To accomplish IPNS with PubSub, a [persistence layer is added](https://github.com/ipfs/specs/blob/main/naming/pubsub.md#layering-persistence-onto-libp2p-pubsub). Now when you ask for a name, you are subcribing to a PubSub topic based on that name, you create a connection with a peer that is following the same name, then they send you the latest version of the record. The key differentiating factor between IPNS-over-PubSub and IPNS-over-the-DHT (the default behavior) is opening a streaming connection between peers. This way, peers are sending the latest record directly from their local node, as opposed to the default behavior of searching the DHT for the peer with latest version of a record. This means records shared over Pubsub are not available on the DHT and vise versa, unless the publisher opts-in to publish records to both routing options. If you would like to activate IPNS over Pubsub on your Kubo node, you can check out the [`Ipns.UsePubsub` option](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipns) in the config file.


Source: _We highly recommend watching the [video above](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipfs/mutable-content#the-inter-planetary-name-system-ipns) to learn more about IPNS over PubSub_



## The DHT

The public Distributed Hash Table is the record of content that is used, along with Kademlia, to discover content-addressed data in a peer-to-peer network. The DHT is the mechanism that allows a peer-to-peer network to work without the old [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) that the web2 internet runs on.

### Nodes, Peers, and the Swarm

A **[Peer](https://docs.ipfs.io/concepts/glossary/#peer)** is any connected node on IPFS that relays and/or stores information on the network. You can either search peers using the DHT and Kademlia, or be directly connected to a peer. The set of peers that you (as a peer) are connected to directly is called a **[Swarm](https://docs.ipfs.io/concepts/glossary/#swarm)**.

![Peers and Swarms](peer-swarm.png)

**[IPFS Nodes](https://docs.ipfs.io/concepts/nodes/)** are programs that run on a computer that can exchange data with other IPFS nodes. **[Bootstrap nodes](https://docs.ipfs.io/concepts/nodes/#bootstrap)** are used when a new node initially enters the IPFS network.

### What does the DHT do for IPFS?
The [DHT is a distributed system](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system. It maps what the user is looking for (a CID) to the peer that is actually storing the matching content. There are 3 types of key-value pairings that are mapped using the DHT:

* Provider Records – These map a data identifier (i.e., a multihash) to a peer that has advertised that they have, and are willing, to provide you with that content. This is used by IPFS to find content, and IPNS to find pubsub peers

* IPNS Records – These map an IPNS key (i.e., hash of a public key) to an IPNS record (i.e., a signed and versioned pointer to some path like `/ipfs/bafyXYZ`)

* Peer Records – These map a peerID to a set of multiaddresses at which the peer may be reached. This is used by IPFS when we know of a peer with content, but do not know its address, and used for manual connections

![DHT and Peers](dht-peers.png)

[Read More in the docs](https://docs.ipfs.io/concepts/dht)

## Kademlia

[Kademlia](https://en.wikipedia.org/wiki/Kademlia) is a distributed hash table for decentralized peer-to-peer computer networks designed by Petar Maymounkov and David Mazières in 2002. It specifies the structure of the network and the exchange of information through node lookups.

Kademlia makes it easier and quicker to find peers with content by, essentially, comparing how similar two nodes' content is and rank it by how similar or 'close' it is. [Read the paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) to learn about Kademlia more in-depth.

## Bitswap
Along with Kademlia and the DHT, [Bitswap](https://docs.ipfs.io/concepts/bitswap/#bitswap) is a message-based protocol that enables peers to exchange data. Bitswap enables a peer to create a want-list of content, then query connected peers (and the peers they are connected to) for that information.

#### The Public DHT | LabWeek 2021 <!-- Who Presented?  -->
<!-- Add a context paragraph-- The DHT keeps the IPFS Network of Peers Connected... -->

{{< youtube _3ee1_2rgKg >}}

Learn more in [this presentation](https://docs.google.com/presentation/d/e/2PACX-1vRFnTRDresIb6g-mAv2dLxrYpUmbtfQFsX48OVxOzgiVs7JN6bBD7LDz0n36_rIUPb7W_I4t5l1gvTJ/pub?start=false&loop=true&delayms=3000)

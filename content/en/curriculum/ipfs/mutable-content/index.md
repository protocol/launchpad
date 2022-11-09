---
title: "Data Discovery & Connections"
description: "Mutable Content in IPFS"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 90
category: lecture
level:
- shallow
- deep
goal: 1.2
subgoals:
- 1.21
- 1.22
- 1.23
- 1.24
- 1.25
---


<!-- ## Content Identifiers
with IPFS, instead of using a **URL** (**U**niform **R**esource **L**ocator) that the current world wide web uses to locate content, where it is located, stored in a server, and router to using the DNS (Domain Name Service), all content on the network is given a **C**ontent **ID**entifier (**CID**) that is able to locate any given unique piece of content according to _what_ it is instead of _where_ it is. This enables content to not only be universally identifiable, but also hosted by 1, 10, 100, or thousands of peers, and seeded from multiple sources. -->

## Mutable Content
One of the most powerful things about IPFS is that any piece of data or content you store on the network cannot be modified without changing the [Content Identifier (CID)](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipld/content-addressing-and-cids) for that data, since the CID is created (in part) by hashing the content. There are various ways to create mutable data on top of IPFS and in this lesson we will learn what just a few of them are.

### Mutable Content | ResNetLabs on Tour – David Dias
_See the full set of resources [on the ResNetLab Tutorials page](https://research.protocol.ai/tutorials/resnetlab-on-tour)_

{{< youtube 57guoGS53Bo >}}

## Nodes, Peers, and the Swarm

A **[Peer](https://docs.ipfs.io/concepts/glossary/#peer)** is any connected node on IPFS that relays and/or stores information on the network. You can either search peers using the DHT and Kademlia, or be directly connected to a peer. The set of peers that you (as a peer) are connected to directly is called a **[Swarm](https://docs.ipfs.io/concepts/glossary/#swarm)**.

![Peers and Swarms](peer-swarm.png)

**[IPFS Nodes](https://docs.ipfs.io/concepts/nodes/)** are programs that run on a computer that can exchange data with other IPFS nodes. **[Bootstrap nodes](https://docs.ipfs.io/concepts/nodes/#bootstrap)** are used when a new node initially enters the IPFS network.

## The DHT

The public **D**istributed **H**ash **T**able is the record of content that is used, along with Kademlia, to discover content-addressed data in a peer-to-peer network. The DHT is the mechanism that allows a peer-to-peer network to work without the old [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) that the web2 internet runs on.

### IPFS and the DHT
The [DHT is a distributed system](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system. It maps what the user is looking for (a CID) to the peer that is actually storing the matching content. There are 3 types of key-value pairings that are mapped using the DHT:

* **Provider Records –** These map a data identifier (i.e., a multihash) to a peer that has advertised that they have, and are willing, to provide you with that content. This is used by IPFS to find content, and IPNS to find pubsub peers

* **IPNS Records –** These map an IPNS key (i.e., hash of a public key) to an IPNS record (i.e., a signed and versioned pointer to some path like `/ipfs/bafyXYZ`)

* **Peer Records –** These map a peerID to a set of multiaddresses at which the peer may be reached. This is used by IPFS when we know of a peer with content, but do not know its address, and used for manual connections

![DHT and Peers](dht-peers.png)

[Read More in the docs](https://docs.ipfs.io/concepts/dht)

### Kademlia

[Kademlia](https://en.wikipedia.org/wiki/Kademlia) is a distributed hash table for decentralized peer-to-peer computer networks designed by Petar Maymounkov and David Mazières in 2002. It specifies the structure of the network and the exchange of information through node lookups.

Kademlia makes it easier and quicker to find peers with content by, essentially, comparing how similar two nodes' content is and rank it by how similar or 'close' it is. [Read the paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) to learn about Kademlia more in-depth.


## The InterPlanetary Name System (IPNS)

Since IPFS uses CIDs, if you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content, because every change would result in a new CID.

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating a link that can be updated. IPNS addresses a very important point, to help bridge the unfamiliarity gap to a new internet. For example, when you go to a users' website, you expect to find that same website with the same link or URL in the future. If that website is updated, you will see those updates as well.


This "link" in IPNS is called a _name_, this _name_ is the hash of a public key. The name is associated with a record containing information about the hash that it points to and is signed by the public key’s corresponding private key. This allows new records to be signed and published at any time. Using IPNS means that when someone searches for your website using your _name_, they will receive the most up-to-date content as expected in today's internet. You can learn more about IPNS and [how to use it here](https://docs.ipfs.tech/concepts/ipns/#example-ipns-setup-with-cli).

### Pubsub + IPNS

[**Publish/Subsribe (PubSub)**](https://docs.libp2p.io/concepts/publish-subscribe/) is a messaging protocol to quickly communicate with other peers. Whenever a peer Publishes a message, Subscribing peers will receive it almost instantly. This protocol is not specific to IPFS or IPNS, but to [Libp2p](https://docs.ipfs.tech/concepts/libp2p/); paired with IPNS it allows for quick delivery of records over the network. With PubSub enabled on IPNS, updates to a record can be shared virtually instantly with subscribers.

IPNS is a self-certifying mutable pointer. Meaning any name that gets published is signed by a private key and anyone else can verify that it was signed by that peer with just the _name_.

#### How it Works

* **Publishing -** When you first publish an IPNS name, you create a brand new record containing the CID to point to,a timestamp, and a cryptographic signature of the record created with the private key to establish you are the owner and certify the name.

* **Searching -** [Kubo](https://github.com/ipfs/kubo) uses the DHT to find peers that will have the queried record. This method has gotten faster over the years, but is still limited by the speed of DHT resolution itself. Alternative transports can be used to improve resolution speed (see [PubSub](#pubsub--ipns)).

* **Validity -** A record is valid for 24 hours by default, but you can change its `validity` to be longer. When someone has your record, but it is expired, they will have to go to DHT to find a new, valid version of your record.

* **Keys -** A _name_ is a hash of a public key in a key pair. By default, the first public key used by Kubo is the same as the one for identifying your peer ([PeerID](https://docs.ipfs.tech/concepts/glossary/#peer-id)). You can [generate new key pairs with Kubo](https://docs.ipfs.tech/reference/kubo/cli/#ipfs-key-gen) and use them to create additional IPNS records.

### Subscribe to Content with IPNS  

 To accomplish IPNS with PubSub, a [persistence layer is added](https://github.com/ipfs/specs/blob/main/naming/pubsub.md#layering-persistence-onto-libp2p-pubsub). Now when you ask for a name, you are subscribing to a PubSub topic based on that name, you create a connection with a peer that is following the same name, then they send you the latest version of the record.

_Watch the Mutable Content video above to learn more about IPNS over PubSub_

#### The Public DHT | LabWeek 2021 <!-- Who Presented?  -->
<!-- Add a context paragraph-- The DHT keeps the IPFS Network of Peers Connected... -->

{{< youtube _3ee1_2rgKg >}}

<!--
#### Common Pitfalls
* Resolving IPNS over DHT may be slow. If there are multiple versions of a name, then you want to make sure that you have the latest version. And you do this by searching the DHT for peers that hold your records and Kubo will spend up to a minute to try to find at least 16 peers to form a quorum.
* Safe Vs. Old problem. This is a question around practicality on IPNS content. If I accidentally let my record expire, do I want my users to fetch and resolve the data anyways (aka serve **old** data) or not at all (**safe**). Currently, the default is to be safe, and not serve any data. This is an ongoing and situational conversation, you can [read about it on GitHub](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606)

Sources: [Overview of IPNS by Adin](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff#0963fe6b470a4c55b1929146c360dc95), [IPNS Spec](https://github.com/ipfs/specs/blob/main/IPNS.md), [Discuss forum for IPFS](https://discuss.ipfs.tech/t/how-do-i-make-my-ipns-records-live-longer/14768/17?u=lidel)


### DNSLink

[DNSLink](https://docs.ipfs.tech/concepts/glossary/#dnslink) is a standard for a mutable pointer system that stores its links in DNS TXT records corresponding to a given domain name. With DNSLink you can use a mutable pointer like a DNS domain name to point to content-addressed data in IPFS.

The benefits of DNSLink include:
- Human-readable mutable pointers, e.g. `/ipns/libp2p.io`.
- DNSLink is that it leverages the distributed architecture of DNS to enable internet-scale mutable names or pointers which interoperate with IPFS.
- In many cases, resolving a DNSLink pointer is faster than IPNS.

To create a mutable pointer with DNSLink, you need:
- a DNS domain name you control
- A CID or an IPNS name to link to

> Note that while using DNSLink to link to an IPNS name is possible, it's often counterintuitive, because you are using a mutable pointer (DNS record) to point to another mutable pointer (IPNS name).

For example, `libp2p.io` has a TXT DNS record `_dnslink.libp2p.io` with the value `dnslink=/ipfs/bafybeibwlrl7olq5sggibzucp5s6y5n22numfpyjlzntnuvgs5zt2umjuu`. This DNS record can be _mutated_ at any point to point to a new CID.

Finally, there are several common ways to resolve DNSLink names:
- With an IPFS gateway using the `/ipns/[DNSLink]` resolution scheme, e.g. https://ipfs.io/ipns/libp2p.io or https://cloudflare-ipfs.com/ipns/libp2p.io. Note that the `/ipns` is misleading – and should probably be prefixed with `/dnslink`, given that you are not resolving an IPNS name.
- Directly via the domain, but this requires some additional DNS configuration as explained in the [DNSLink docs](https://dnslink.dev/#example-ipfs-gateway).


**You can follow tutorials and read more at [https://dnslink.dev](https://dnslink.dev/)**


### Pubsub + IPNS

[**Publish/Subsribe (PubSub)**](https://docs.libp2p.io/concepts/publish-subscribe/) is a messaging protocol to quickly communicate with other peers. Whenever a peer Publishes a message, Subscribing peers will receive it almost instantly. This protocol is not specific to IPFS or IPNS, but to [Libp2p](https://docs.ipfs.tech/concepts/libp2p/); paired with IPNS, it allows for quick delivery of records over the network. With PubSub enabled on IPNS, updates to a record can be shared virtually instantly with subscribers.

To accomplish IPNS over PubSub, a [persistence layer had to be added](https://github.com/ipfs/specs/blob/main/naming/pubsub.md#layering-persistence-onto-libp2p-pubsub). Now when you ask for a name, you are subcribing to a PubSub topic based on that name, you create a connection with a peer that is following the same name, then they send you the latest version of the record. The key differentiating factor between IPNS-over-PubSub and IPNS-over-the-DHT (the default behavior) is opening a streaming connection between peers. This way, peers are sending the latest record directly from their local node, as opposed to the default behavior of searching the DHT for the peer with latest version of a record. This means records shared over Pubsub are not available on the DHT and vise versa, unless the publisher opts-in to publish records to both routing options. If you would like to activate IPNS over Pubsub on your Kubo node, you can check out the [`Ipns.UsePubsub` option](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipns) in the config file.


Source: _We highly recommend watching the [video above](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipfs/mutable-content#the-inter-planetary-name-system-ipns) to learn more about IPNS over PubSub_ -->

---
title: "IPFS Architecture"
description: "A Technical Guide to the IPFS architecture"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 140
category: lecture
level:
- deep
goal: 1.5
subgoals:
- 1.51
- 1.52
- 1.53
- 1.54
---
## Architecture

This lesson provides a digestible, top-level description of the IPFS protocol stack, the subsytems, and how they fit together. It delegates non-interface details to other specs as much as possible. 

The oldest implementation of IPFS is Kubo (formerly go-ipfs), and in this lesson we lean into processes primarily related to Kubo.

## Subsystems diagram
_WIP: This is a high-level architecture diagram of the various sub-systems of Kubo. To be updated with how they interact._

![ipfs subsystem 1](go-ipfs-subsystems.png)

## Introduction to IPFS Subsystems 
* [**CoreAPI**](#coreapi)
* [**UnixFS**](#unixfs)
    * Chunker
    * MFS
* [DAG Service & Block Service](#dag-service--block-service)
* [Datastore](#datastore)
* [FlatFS](#flatfs)
* [Peer Routing](#dht)
* [IPNS](#ipns)

<!-- Give short primer of what happens when a file gets added to IPFS wrt Kubo -->

#### CoreAPI
The CoreAPI is how we interact with IPFS. It contains common methods to interact with files on IPFS like adding and getting files. Additionally, this API contains methods to interact with the datastore, keystore, remote pinning services, along with many other features you can read more about on the docs page: [Kubo command line API](https://docs.ipfs.tech/reference/kubo/cli/).

#### UnixFS
<!-- Talk about chunker, importer, mfs, unixfs -->
I'm baby pickled mukbang gastropub meh kale chips umami. PBR&B williamsburg everyday carry venmo DSA drinking vinegar distillery master cleanse man braid mlkshk biodiesel hoodie hell of. Umami pitchfork disrupt health goth 3 wolf moon asymmetrical woke gastropub cornhole knausgaard shaman. Neutra viral tattooed mumblecore butcher sartorial hell of praxis, lo-fi lumbersexual chartreuse hexagon microdosing fit. Art party air plant kogi ennui artisan hell of, fingerstache mukbang unicorn succulents everyday carry PBR&B leggings pop-up.

#### DAG Service & Block Service
<!-- Talk about  -->
Banh mi ugh thundercats forage organic prism you probably haven't heard of them keytar sriracha poke kale chips meditation gastropub portland taxidermy. Brooklyn ramps crucifix hammock sustainable, unicorn cray tbh. Intelligentsia 3 wolf moon iceland authentic narwhal hashtag, synth banjo banh mi. Chartreuse slow-carb gochujang, jianbing DIY la croix meh occupy. Messenger bag celiac snackwave, ascot post-ironic selvage stumptown hoodie.

#### Datastore
<!-- Talk about FlatFS -->
Waistcoat edison bulb poutine roof party ugh actually. Lyft austin vegan hell of. Gatekeep cloud bread bitters wolf praxis chartreuse pop-up DSA 8-bit forage mixtape man braid cray DIY. Cray master cleanse bitters chia YOLO. PBR&B food truck YOLO venmo plaid adaptogen tumblr. Intelligentsia activated charcoal actually paleo you probably haven't heard of them.

#### Peer Routing
<!-- Talk about DHT and bitswap -->
Banjo keytar DSA, four dollar toast vibecession tacos jean shorts. Migas art party affogato food truck. Portland pug fingerstache readymade kitsch PBR&B, hella knausgaard lomo cliche fit bushwick blue bottle schlitz messenger bag. Mustache unicorn wolf hammock live-edge chia. Fingerstache umami chambray, lyft put a bird on it godard master cleanse seitan DIY offal.

Along with Kademlia and the DHT, [Bitswap](https://docs.ipfs.io/concepts/bitswap/#bitswap) is a message-based protocol that enables peers to exchange data. Bitswap enables a peer to create a want-list of content, then query connected peers (and the peers they are connected to) for that information.

#### IPNS

IPNS is a self-certifying mutable pointer. Meaning any _name_ that gets published is signed by a private key and anyone else can verify that it was signed by that peer with just the _name_. This self-certifying nature gives IPNS a number of super-powers not present in consensus systems (DNS, blockchain identifiers, etc.) like: mutable link information can come from anywhere, not just a particular service/system, and it is very fast and easy to confirm a link is authentic.

IPNS _names_ are encapsulated by a data structure called an _IPNS Record_ which contains the CID you are pointing to, the [expiration date](https://discuss.ipfs.tech/t/how-do-i-make-my-ipns-records-live-longer/14768/17?u=lidel) of a name and the sequence number which is incremented whenever the record is updated.

##### Issues with IPNS
* [**Resolving IPNS over DHT is slow**](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff) - There may potentially be multiple versions of a record, so Kubo will spend up to a minute to try to find at least 16 peers to form a quorum.
* [**Safe Vs. Old problem**](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606) - If a record expires, do I want my users to fetch and resolve the data anyways (serve **old** data) or not at all (**safe**). This is an ongoing and situational conversation.
* [**JS-IPFS in browsers**](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md) - Users trying to use JS-IPNS in browsers run into a variety of issues. A workaround is using [public gateways](https://docs.ipfs.tech/concepts/ipfs-gateway/#public-gateways) for resolving [IPNS records and CIDs](/curriculum/ipfs/ipfs-gateways).


Check out the [IPNS spec](https://github.com/ipfs/specs/tree/main/ipns) to gain a deeper understanding about IPNS records and how to use them.

#### IPFS and the Merkle DAG
At the heart of IPFS is the MerkleDAG, a directed acyclic graph whose links are hashes. This gives all objects in IPFS useful properties:

- Authenticated: content can be hashed and verified against the link
- Permanent: once fetched, objects can be cached forever
- Universal: any data structure can be represented as a merkledag
- Decentralized: objects can be created by anyone, without centralized writers

In turn, these yield properties for the system as a whole:

- Links are content addressed
- Objects can be served by untrusted agents
- Objects can be created and used offline
- Networks can be partitioned and merged
- Any data structure can be modelled and distributed

<!-- Move this to Dev-tools. This is on a similar level to web3.storage & esturary 

#### IPFS Cluster

[IPFS Cluster](https://ipfscluster.io/) is a distributed application that works as a sidecar to IPFS peers, maintaining a global cluster pinset and intelligently allocating its items to the IPFS peers. IPFS Cluster is used by large IPFS storage services like nft.storage along with other storage services like [Filecoin](/curriculum/filecoin/introduction) and [R2](https://developers.cloudflare.com/r2/get-started/).

IPFS Cluster:
* Runs independent from the rest of the IPFS Swarm
* Performs actions that make it simple to add pins at scale, utilizing a set of 'cluster peers'
* The cluster peers take care of asking IPFS to pin things at a sustainable rate and retry pinning in case of failures -->

## Futher Reading
* [**Kubo Readme**](https://github.com/ipfs/go-ipfs/#map-of-go-ipfs-subsystems)
* [**Architecture readme from the specs repo**](https://github.com/ipfs/specs/blob/master/ARCHITECTURE.md)
* [**IPNS in the docs**](https://docs.ipfs.tech/concepts/ipns/#how-ipns-works)
* [**IPNS specification**](https://github.com/ipfs/specs/blob/main/ipns/IPNS.md)
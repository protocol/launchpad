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

This lesson provides a digestible, top-level description of the IPFS protocol stack, the subsystems, and how they fit together. It delegates non-interface details to other specs as much as possible. 

IPFS is not just one piece of software. It is a modular set of libraries and specifications that are designed to be used in various contexts. Not all [implementations of IPFS](https://docs.ipfs.tech/basics/ipfs-implementations/) will have the same diagram flow charts. Implementations are created for different use cases, so the different components they use will also vary.

## Subsystems diagram
_WIP: This is a high-level architecture diagram of the various sub-systems of **Kubo (go-ipfs)**. To be updated with how they interact._

![ipfs subsystem 1](go-ipfs-subsystems.png)

## Introduction to IPFS Subsystems 
* [**CoreAPI**](#coreapi)
* [**UnixFS**](#unixfs)
* [**Linked Data**](#linked-data)
* [**Data Store**](#data-store)
* [**Peer Routing**](#peer-routing)
* [**Content Routing**](#content-routing)
* [**IPNS**](#ipns)

<!-- Give short primer of what happens when a file gets added to IPFS wrt Kubo -->
When a file gets added to IPFS, it goes through many stages. Before a file can be shareable with other peers, it has to get broken down into smaller block sizes, links have to be created to tie all the blocks together, and the blocks themselves have to be written to storage. You can learn more about this process in our earlier lesson: [Introduction to IPFS](/curriculum/ipfs/introduction#how-ipfs-works--steve-allen).

The oldest implementation of IPFS is Kubo (formerly go-ipfs), and in this lesson we lean into processes primarily related to Kubo. 

### CoreAPI
The CoreAPI is how we interact with IPFS. It contains common methods like `add` and `get` files. Additionally, it contains methods to interact with the datastore, merkle DAGs, keystore, remote pinning services, and many other components. With respect to Kubo, you can read more in the [Kubo Command Line API](https://docs.ipfs.tech/reference/kubo/cli/) docs page.

### UnixFS
<!-- Talk about chunker, importer, mfs, UnixFS -->
[UnixFS](https://docs.ipfs.tech/concepts/file-systems/#unix-file-system-unixfs) is a data format for creating directory & file hierarchies. UnixFS is also responsible for breaking down a file into smaller pieces of data through a process called [_chunking_](https://docs.ipfs.tech/concepts/file-systems/#chunking). Then, UnixFS will add metadata to link those _chunks_ together. This allows users to navigate the hierarchy that gets created like a file system on an everyday computer. The navigation tooling is called [_Mutable File System(MFS)_](https://docs.ipfs.tech/concepts/file-systems/#mutable-file-system-mfs). Finally, every chunk in the hierarchy gets assigned a unique content identifier, thus creating a [_Merkle DAG_](/curriculum/ipld/merkle-dags). 

![meme-to-cidv1](meme-to-cid1.png)

### Linked Data
<!-- Talk about  -->
At the heart of IPFS is the Merkle DAG, a directed acyclic graph whose links are _hashes_. Hashes are the unique identifiers IPFS assigns every piece of data through a process called [_hashing_](https://docs.ipfs.tech/concepts/hashing/). This is what lets IPFS objects to be served by untrusted agents, data to be cached permanently, and have any data structure to be represented as a Merkle DAG. 

The [InterPlanetary Linked Data](/curriculum/ipld/objectives) (IPLD) project does not concern itself with files or directories; rather the blocks themselves that get created out of these files. As part of the **Dag Service** component of Kubo, it can interpret and navigate the resulting Merkle DAGs for [**any** kind of content addressed system](https://ipld.io/). With any file type that's added to IPFS, IPLD will be able to grab every subsequent chunk of data to return the final product. 

![root](root-cid.png)


### Data Store
<!-- Talk about FlatFS -->
[Every implementation of IPFS](https://docs.ipfs.tech/basics/ipfs-implementations/) will have different constraints or needs. But they will always need a place to store the blocks of data that IPLD references. The default storing mechanism in Kubo is called **FlatFS**. This [Flat File System](https://www.techtarget.com/searchdatamanagement/definition/flat-file), will make every block its own file and distribute them into various subdirectories, through a process called [sharding](https://docs.ipfs.tech/concepts/glossary/#sharding), to create a manageable level of organization on disk.

## ResNetLab: Content Routing
{{< youtube KMmiAnMJU-c >}}

### Peer Routing
<!-- Talk about libp2p transport protocol: This is HOW we find peers to share data-->


### Content Routing
<!-- talk about common ways to get information from IPFS network: gateways, ipfs node, bitswap, dht. This is WHAT we do to send data-->



Along with Kademlia and the DHT, [Bitswap](https://docs.ipfs.io/concepts/bitswap/#bitswap) is a message-based protocol that enables peers to exchange data. Bitswap enables a peer to create a want-list of content, then query connected peers (and the peers they are connected to) for that information.

## IPNS

IPNS is a self-certifying mutable pointer. Meaning any _name_ that gets published is signed by a private key and anyone else can verify that it was signed by that peer with just the _name_. This self-certifying nature gives IPNS a number of super-powers not present in consensus systems (DNS, blockchain identifiers, etc.) like: mutable link information can come from anywhere, not just a particular service/system, and it is very fast and easy to confirm a link is authentic.

IPNS _names_ are encapsulated by a data structure called an _IPNS Record_ which contains the CID you are pointing to, the [expiration date](https://discuss.ipfs.tech/t/how-do-i-make-my-ipns-records-live-longer/14768/17?u=lidel) of a name and the sequence number which is incremented whenever the record is updated.

##### Issues with IPNS
* [**Resolving IPNS over DHT is slow**](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff) - There may potentially be multiple versions of a record, so Kubo will spend up to a minute to try to find at least 16 peers to form a quorum.
* [**Safe Vs. Old problem**](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606) - If a record expires, do I want my users to fetch and resolve the data anyways (serve **old** data) or not at all (**safe**). This is an ongoing and situational conversation.
* [**JS-IPFS in browsers**](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md) - Users trying to use JS-IPNS in browsers run into a variety of issues. A workaround is using [public gateways](https://docs.ipfs.tech/concepts/ipfs-gateway/#public-gateways) for resolving [IPNS records and CIDs](/curriculum/ipfs/ipfs-gateways).

Check out the [IPNS spec](https://github.com/ipfs/specs/tree/main/ipns) to gain a deeper understanding about IPNS records and how to use them.


<!-- Move this to Dev-tools. This is on a similar level to web3.storage & Esturary 

#### IPFS Cluster

[IPFS Cluster](https://ipfscluster.io/) is a distributed application that works as a sidecar to IPFS peers, maintaining a global cluster pinset and intelligently allocating its items to the IPFS peers. IPFS Cluster is used by large IPFS storage services like nft.storage along with other storage services like [Filecoin](/curriculum/filecoin/introduction) and [R2](https://developers.cloudflare.com/r2/get-started/).

IPFS Cluster:
* Runs independent from the rest of the IPFS Swarm
* Performs actions that make it simple to add pins at scale, utilizing a set of 'cluster peers'
* The cluster peers take care of asking IPFS to pin things at a sustainable rate and retry pinning in case of failures -->

## Further Reading
* [**Implementations of IPFS**](https://docs.ipfs.tech/basics/ipfs-implementations/)
* [**Architecture Readme**](https://github.com/ipfs/specs/blob/master/ARCHITECTURE.md)
* [**IPNS Docs**](https://docs.ipfs.tech/concepts/ipns/#how-ipns-works)
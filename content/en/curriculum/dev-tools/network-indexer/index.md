---
title: "Network Indexer (IPNI)"
description: "Indexing and enabling Faster retrieval for IPFS and Filecoin"
draft: false
menu:
  curriculum:
    parent: "curriculum-devtools"
weight: 80
category: lecture
level:
- shallow
- deep
---

## <Dev Tool> Introduction
The [IPNI network indexer](https://github.com/ipni) is a project created and maintained by Protocol Labs that is designed to index the data on the Filecoin and IPFS networks, and work alongside the Distributed Hash Table (DHT) employed by both the IPFS and Filecoin networks to enable the fast and efficient retrieval of content-addressed data.


## Why Use Index Content Routing?
Protocol Labs' Network Indexer (IPNI) enables any user or developer to query both the IPFS and Filecoin public nodes to find content-addresses data using the [CID](../ipfs/content-addressing/#content-addressing).

Since IPFS and Filecoin use different protocols to retrieve data (IPFS uses Bitswap, and Filecion uses Graphsync), there is a need for a solution that makes it possible for anyone who would want to retrieve and use that data to locate and understand which protocol they can use to retrieve that data and use it in other applications.

With versions of kubo 16 and above, a feature was implemented that makes it possible to use HTTP to send and receive information about IP addresses of peers that have certain content (CIDs) and publish IPNS records.

The Indexer also makes it possible, in a way not achieved before, for people to retrieve data from the Filecoin network, as there is a lot of data stored across Filecoin nodes, but  no way to search and retrieve that data

Though the DHT is an amazing, distributed way to advertise and discover content, the IPFS indexer adds another layer that can leverage the speed and <why else?> , with an open protocol that anyone can use, as seen here in the [go-delgated-routing](https://github.com/ipfs/go-delegated-routing) library on their server.
to enable faster discovery and routing, along with load balancing and <what else?>


### State of Content Routing| IPFS Camp Lisbon 2022
{{< youtube DLCTEXbF1Es >}}

### Reframe
[Reframe](https://github.com/ipfs/go-delegated-routing) is a Request-response Protocol (RPC) that kicks off a procedure or subroutine to execute on the IPFS network that stores the data in an index, and allows others to retrieve information related to that CID.
With versions of kubo 16+, the Refame RPC is integrated as a feature
* Reframe adds an additional way to discover peers, content, and IPNS records
* With Reframe, you can configure your IPFS kubo node to publish a snapshot of all of the CIDs on your node at whatever frequency you would like
* Reframe uses HTTP transport to store this information on an indexer node
* Reframe is an alternative to the DHT
* Content can be published to both the IPFS DHT and Reframe with a tool called parallel
Reframe was created from a [kubo spec](https://github.com/ipfs/specs/blob/main/reframe/REFRAME_PROTOCOL.md) (the IPFS go implementation) that allows IPFS nodes to advertise their content to other systems besides the DHT.

### Indexer Implementations

#### Filecoin Indexers
IPNI

#### IPFS Indexers

## Tutorial: Search the Index
In this simple tutorial, we are going to configure and run an IPFS node to communicate data to the indexer and take a look at what that data looks like.


### Prerequisites
In order to participate in this activity you will need:
* [Go Version 1.18 or later](https://go.dev/doc/install) installed
* kubo (IPFS go) version 16 or above installed
  * [Tutorial](https://curriculum.pl-launchpad.io/tutorials/ipfs-intro/setup/)
  * [Docs Instructions](http://docs.ipfs.tech.ipns.localhost:8080/install/command-line/#install-official-binary-distributions)
  * [Distributions](https://dist.ipfs.tech/#kubo)

### Tutorial Instructions
You can see the Video of the workshop called **[Indexed Content Routing](https://www.youtube.com/watch?v=aN7fGturjzA&t=121s)** from IPFS Camp Lisbon 2022
> You will probably want to create (`ipfs init`) a new IPFS node for this tutorial, so either make a backup copy of the `with cp ~/.ipfs ~/..ipfs` config file, or initialize a new node in a sandboxed vm or container.

Follow the instructions at [https://github.com/ischasny/ipfs-camp-routing](https://github.com/ischasny/ipfs-camp-routing)


#### Resources
* [Blog: Introducing the Network Indexer](https://filecoin.io/blog/posts/introducing-the-network-indexer/)
* [Blog: Introducing Reframe](https://blog.ipfs.tech/2022-09-02-introducing-reframe/)
* [CID Contact](https://cid.contact/) a web user interface (webUI) you can use to access data.
* [Github ipni/storetheindex](https://github.com/ipni/storetheindex)
* [Github ipfs/go-delegated-routing](https://github.com/ipfs/go-delegated-routing)
* [Filecoin Slack Channel #storetheindex](https://cid.contact/)
* [Weekly Status Report](https://www.notion.so/pl-strflt/Weekly-Status-Report-30699cbe5a99473ea98b4ea4f9a3619b)

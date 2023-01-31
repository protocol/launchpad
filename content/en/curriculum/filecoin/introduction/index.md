---
title: "Introduction to Filecoin"
description: "Incentivizing Decentralized Storage"
draft: false
menu:
  curriculum:
    parent: "curriculum-filecoin"
weight: 380
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
  - 1.04
---

[Filecoin](https://docs.filecoin.io/) is a peer-to-peer network that stores files, with built-in economic incentives and cryptography to ensure files are stored reliably over time. Filecoin includes a blockchain and native cryptocurrency (FIL) to create a network and a market that both provides services to users who want to store data on the Filecoin network, and for storage providers who can participate in mining block rewards, while providing the data storage and (soon to come) compute capabilities over that data.


## Filecoin Technology

Filecoin is an independent organization that collaborates with the Protocol Labs Network, and is the token for decentralized storage. Filecoin uses IPFS to power a peer-to-peer network, libp2p as the networking layer to enable things like peer discovery and secure connections, IPLD to work with data models and schemas that can operate with any systems, and many other technologies to create protocols, tools, and services to help radically improve the network and drive breakthroughs in computing.

It is important to note that IPFS and Filecoin are separate networks, though under the hood, Filecoin uses the same basic technology as IPFS. Filecoin expands upon IPFS in that it incentivizes those on the network to keep content-addressed data available on the network, in a more permanent way.


#### IPFS & Filecoin: The Building Blocks of an Open, Decentralized Web | Ally Haire

In this talk by DeveloperAlly from July of 2002, get a quick overview of the technological basics of IPFS and Filecoin, an intro about why Filecoin exists, how it’s connected to IPFS, and the basics of how it works to provide a decentralized and reliable storage system.

{{< youtube XZqhfE1mJ_k >}}

### A New Storage Model

The internet that we are all familiar with, we rely on large, centralized companies to store our data and make it available to the websites, online stores, email servers, and other services that make up the internet. With the Filecoin economy, you have a network of smaller storage providers you can leverage to make storage deals, and back up data on several different servers.

Because data on Filecion is content addresses with CIDs, instead of location-addressed with URLs, it is possible for anyone to be able to host that data. With the Filecoin network, those who are storing data have the ability to control the permanence of your data, along with flexibility to choose who will store that data.

This model solves many problems that come along with a single entity owning content, such as censorship and single ownership of data that is intended to be freely available, overall making a network that is more resilient.


#### Introduction to IPFS and Filecoin | Discordian

In this video from March of 2022, Discordian gives an overview of the key features and differences between the IPFS and Filecoin networks, and explains the special value the Filecoin adds, and reviews some of the technology and tools you can use to build on the Filecoin and IPFS networks.

{{< youtube 5-0_DqXGY-M >}}

## The Filecoin Economy

Filecoin facilitates open markets for storing and retrieving files that anyone can participate in. On the Filecoin network, users pay in Filecoin tokens to store their files with storage providers. Storage providers earn units of Filecoin (FIL) for storing files, and they are responsible for storing files and proving they have stored the files correctly over time.

Available storage and the price of that storage is not controlled by any single entity. Instead, the Filecoin network facilitates open markets for storing and retrieving files (by making storage deals between clients and providers) that anyone can participate in. At any time, users can verify that their files are being stored correctly by looking at proofs on Filecoin’s blockchain.

Storage providers are able to leverage the Filecoin technology to store content-addressed data using the APIs and data onboarding solutions such as [Boost](https://boost.filecoin.io/) for the [Lotus](https://lotus.filecoin.io/) Filecoin implementation, and new functionality that will expands the potential for earning Filecoin such as:

* [Saturn CDN](https://strn.network/) where participants can earn Filecoin caching and serving content
* [Bacalhau ](https://strn.network/)compute, building services to compute over data that are stored using IPFS technology
* [FVM](https://fvm.filecoin.io/) smart contracts, adding programmability to the Filecoin blockchain

There are also data onboarding services for those who don’t want to run their own Filecoin node, but want to upload data onto Filecoin. Because formatting & uploading the data can be a a complex process, there are several other services that can do this, either using a simpler interface, or working closely with those who have large amounts of data to store.

* [Estuary](https://estuary.tech/) works with large, public sets of data, created by the Outercore team at Protocol Labs
* [Web3.Storage](https://web3.storage/) provides an easy to use web interface where anyone can drag-and-drop to upload files of any type to IPFS
* [NFT.Storage](https://nft.storage/) is similar to web3.storage, but specially designed for NFTs
* [Lighthouse.Storage](https://www.lighthouse.storage/) Provides storage for a one-time price on the IPFS and Filecoin networks


## Filecoin Features

* **Verifiable Storage** – Rather than needing to trust a cloud storage provider or rely on legal recourse, the Filecoin Protocol cryptographically verifies data storage
* **Open Participation** – Anyone with sufficient hardware and an internet connection can be a storage provider (Filecoin miner) for the Filecoin Network
* **Empowers Local Optimization** – Driven by open participation, market forces will enable more efficient and distributed data storage and communication than centralized storage platforms, which allows for a more local and resilient architecture and data availability
* **Flexible Storage Options** – As an open platform, the network has the flexibility for the creation & disseminations of tools and services provided by the community of developers improving and building on the protocol
* **A Community Network** – Filecoin provides participants the opportunity to have stake in the networkʼs success. Participants in the network benefit by working together to improve the Filecoin network as a whole


### Filecoin Implementations

There are different languages and supported versions of the Filecoin blockchain, maintained by different entities. These different implementations all have the same core capabilities and features, and run on the same network, but because they are different programming languages and maintained by different entities.

* [Lotus](https://lotus.filecoin.io/) is maintained by Protocol Labs and written in Go
* [Venus](https://github.com/filecoin-project/venus) is an open source project also written in the Go programming language, with slightly different architecture and features
* [Forest](https://github.com/ChainSafe/forest) is maintained by Chainsafe and is written in the Rust programming language

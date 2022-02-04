---
description: The Basics of How IPFS Works
---

## How IPFS Works

#### How IPFS Works | Steve Allen
In this video, Steve Allen describes how IPFS **Imports, Names, Finds** and **Fetches** content.

{% embed url="https://www.youtube.com/watch?v=0IGzEYixJHk" %}

At a high level, the talk covered the following concepts:

#### Import
* [Chunking](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) – When an object is added to IPFS, it is chunked up into smaller parts, each part is hashed, and a CID is created for each chunk. This DAG building process has two main parameters, the leaf format and the chunking strategy.
* [UnixFS](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) – When you add a file to IPFS, it might be too big to fit in a single block, so it needs metadata to link all its blocks together. UnixFS is a protocol-buffers-based format for describing files, directories, and symlinks in IPFS. This data format is used to represent files and all their links and metadata in IPFS. UnixFS creates a block (or a tree of blocks) of linked objects.
* [IPLD](https://docs.ipfs.io/project/related-projects/#ipld) – A meta-format for understanding, encoding, and decoding Merkle-linked data. IPLD works to make it possible to define a data model and make it possible to link together different types of Merkle-linked data.

#### Name
* [Content IDentifiers (CIDs)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) – These are self-describing hashes used to describe eerything stored in IPFS, essentially a hash with some metadata
* Paths – Paths are recursive unlike URLs and can refer to previous blocks.
* [IPNS](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) – Public keys are mapped to a path, and you use your private key to sign it- as you modify this content, you can use IPNS to point to a new version of a previous piece of content that is signed by your private key.

#### Find
* [Routing & DHT](https://docs.ipfs.io/concepts/dht/#learn-more) – Content on IPFS uses a combination of a CID and routing systems that help identify the set of peers you can get the content from with a distributed routing table (or Distributed Hash Table).
* [Kademlia](https://docs.ipfs.io/concepts/dht/#kademlia) – Kademlia is a distance metric + query algorithm that helps users find the peers with the most accessible pieces of data.

#### Fetch
* [Bitswap](https://docs.ipfs.io/concepts/bitswap/#how-bitswap-works) – Using wantlists of data, or CIDs, that specific users are looking for, and checks peers that a node is connected to first for those CIDs before querying the rest of the DHT.

## More IPFS Concepts
_You can also [find this content in IPFS Docs](https://docs.ipfs.io/concepts/)_

Because IPFS is a system that hopes to change how we use the Internet, it comes with many new concepts:

<!-- Which should we mark as optional? -->

#### How IPFS Deals with Files | IPFS Camp 2019
{% embed url="https://www.youtube.com/watch?v=Z5zNPwMDYGg" %}

#### The Lifecycle of Data in DWeb | IPFS Camp 2019
{% embed url="https://www.youtube.com/watch?v=fLUq0RkiTBA" %}

#### Whiteboard Series with NEAR | Ep: 42 Adin Schmahmann
{% embed url="https://www.youtube.com/watch?v=J-drqD2UebM" %}

## Tutorials
Follow along with the video tutorial using the following resources:

* [Command-Line Quick Start](https://docs.ipfs.io/how-to/command-line-quick-start/#prerequisites)
* [Command Line installation instructions](https://docs.ipfs.io/install/command-line/#system-requirements)
* [IPFS Distributions](https://dist.ipfs.io/#go-ipfs)

#### Getting Started with IPFS
{% embed url="https://youtu.be/t1JaBTBESq8" %}


## IPFS Basics & Toolkits (Optional)

#### IPFS Basics + Tools | ETHGlobal & Juan Benet

<!-- Add Description -->

{% embed url="https://www.youtube.com/watch?v=ldEDa6_CT7k" %}

#### Interplanetary File Storage! | Simply Explained

<!-- Add Description -->

{% embed url="https://www.youtube.com/watch?v=5Uj6uR3fp-U" %}

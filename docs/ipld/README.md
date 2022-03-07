---
description: The What and Why of IPLD
---

# IPLD

IPLD (InterPlanetary Linked Data) is **The Data Layer for content-addressed systems**

![](<../../.gitbook/assets/ipld.png>)

## Why IPLD?

IPLD answers the question: Can we extract a re-usable data layer from IPFS that can be used to build other types of content-addressed data systems?

Every content addressed system reinvents the data layer, typically in non-reusable ways. But we think that **building the next Git should take hours, not days!** so IPLD aims to be an off-the-shelf content addressed data layer, with associated libraries, documentation and tooling.

## Background Information (Optional)
In order to understand the pieces that make up a CID and the IPLD model, you will need to understand the following fundamental concepts:
* [Base Encoding](https://skorks.com/2009/08/different-types-of-encoding-schemes-a-primer/) – This is the basically the way that binary data is converted in to a compressed set of characters. for example, Base 10 encoding says that 0001 1010 = 26, but in base64 0001 1010 == MDAwMSAxMDEw. [Play around with different encoding here](https://cryptii.com/pipes/binary-to-base64)
* [Hashing](https://www.sentinelone.com/cybersecurity-101/hashing/) – A hash is a function that converts one value to another. In cryptography, the function that converts data from one form to another is an unknown process that is so complex it is impossible(?) to reverse, that produces a unique, fixed length output.
* [Codecs](https://www.analogictips.com/what-is-a-codec/) – Codecs are encoder/ decoder tools that translate to and from binary formats, in different ways.
* [Varints](https://carlmastrangelo.com/blog/lets-make-a-varint) – Variable length integers, or Varints, are a way of compressing down integers into a smaller space than is normally needed. Since smaller numbers don't neet as many bytes to represent them (0000 0010 == 2) vs (1110 0011 == 27), you can add a byte at the beginning to indicate how many bits are needed, to save on bit usage.
* [CIDs (Content Identifiers)](https://mikeal.notion.site/what-is-web3-994f2d4cf1944e99a898643cb704d9a6#e34e81fc76b0404ab20f55f0940dfbcd) – A CID is a binary address format that prepend a bunch of [varints](https://carlmastrangelo.com/blog/lets-make-a-varint) to **self-describe** the inner structure. a CID includes: cid has a few parts; the hash, a description of the hash, a description of the encoding format, and a single int (1) to represent “CIDv1”

## IPLD as Leverage

Treating the data layer as a discrete system provides leverage to content addressed developers:

1. How can we scale the size and complexity of the data that we share peer to peer?
2. Can we unify disparate content addressed formats and link between them? Git, blockchains, IPFS, etc.
3. Can we build distributed data structures that we can interact with like we do with hosted databases, while taking advantage of the benefits of content addressing?

## How is IPLD related to IPFS?

IPLD is the data layer of IPFS. But the reverse is also true because IPFS is _a_ block store for IPLD.

IPLD deals with data consistency, data addressing, data relationships (graphs), content addressed data structures, data navigation and more.

IPLD is generally not concerned about data storage or transports (with some caveats).

IPLD does not limit itself to peer to peer systems (Amazon S3 can be a perfectly reasonable IPLD block storage system!), but in general we think peer to peer is preferable!

### IPLD and File Data

At its most fundamental, **IPFS** is a collection of:

1. Binary blobs of data - "blocks";
2. Their associated content identifiers - CIDs

These are both the core concerns of IPLD. IPFS builds on these primitives to provide a sophsticated peer to peer content addressing data stack, with a mature suite of tooling to deal with files.

Only the smallest files in IPFS are stored as a single blob ("block"): to keep block size practical, files are split up into chunks and spread across multiple blocks and linked together into a single graph.

Directories are graphs of named links pointing to files, forming graphs that address other graphs

## Recommended Introductiory Resources

[**ResNetLab: Course Module - Content Addressing**](https://research.protocol.ai/tutorials/resnetlab-on-tour/content-addressing/):

{% embed url="https://www.youtube.com/watch?v=dN9EvujJ9cM" %}

[**ResNetLab: Course Module - InterPlanetary Linked Data (IPLD)**](https://research.protocol.ai/tutorials/resnetlab-on-tour/ipld/)

{% embed url="https://www.youtube.com/watch?v=Sgf6j_mCdjI" %}

### Further Introductory Reading:

* [**A Terse, Quick IPLD Primer for the Engineer**](https://ipld.io/docs/intro/primer/)
* [**IPLD in the InterPlanetary Ecosystem**](https://ipld.io/docs/intro/ecosystem/)

### Tutorials
For those who are newer to the world of Filecoin, Web3, and storage verification, check out the [Protoschool tutorials](https://proto.school/course/ipld). Tutorials you should complete include:

* [Merkle DAGs: Structuring Data for the Distributed Web](https://proto.school/merkle-dags)
* [Anatomy of a CID](https://proto.school/anatomy-of-a-cid)
* [P2P Data Links with Content Addressing](https://proto.school/basics)

#### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

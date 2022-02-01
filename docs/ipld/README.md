---
description: The What and Why of IPLD
---

# IPLD

IPLD (InterPlanetary Linked Data) is **The Data Layer for content-addressed systems**

![](<../../.gitbook/assets/ipld.png>)

## Why IPLD?

IPLD answers the qeustion: Can we extract a re-usable data layer from IPFS that can be used to build other types of content-addressed data systems?

Every content addressed system reinvents the data layer, typically in non-reusable ways. But we think that **building the next Git should take hours, not days!** so IPLD aims to be an off-the-shelf content addressed data layer, with associated libraries, documentation and tooling.

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

1. binary blobs of data - "blocks";
2. their associated content identifiers - CIDs

These are both the core concerns of IPLD. IPFS builds on these primitives to provide a sophsticated peer to peer content addressing data stack, with a mature suite of tooling to deal with files.

Only the smallest files in IPFS are stored as a single blob ("block"): to keep block size practical, files are split up into chunks and spread across multiple blocks and linked together into a single graph.

Directories are graphs of named links pointing to files, forming graphs that address other graphs

## Sections | IPLD

* [IPLD](README.md)
  * [Content Addressing & CIDs](content-addressing-and-cids.md)
  * [Graphs: Merkle DAGs](graphs-merkle-dags.md)
  * [The IPLD Data Model](the-ipld-data-model.md)
  * [Codecs](codecs.md)
  * [IPLD & IPFS](ipld-and-ipfs.md)
  * [IPLD Schemas](ipld-schemas.md)
  * [Paths & Selectors](paths-and-selectors.md)
  * [Distributed Data Structures](distributed-data-structures.md)
  * [The CAR Format](the-car-format.md)
  * [IPLD Resources](ipld-resources.md)

#### Links

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **Libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

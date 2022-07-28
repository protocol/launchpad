---
title: "IPLD & IPFS"
description: "Understand the IPLD data model"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 220
---

At its core, IPFS is best viewed as a suite of standards for storing, sharing, navigating and manipulating IPLD data. IPFS is particularly skilled at leading with structured file data, and is particularly good at performing peer to peer data sharing.

### Files and Data with IPFS & IPLD

#### How IPFS Deals With Files | IPFS Camp 2019 Workshop – Alan Shaw & Mikeal Rogers

In the following talk, Alan Shaw goes over a useful introduction to IPFS and file-based DAGs.

{{< youtube ia_Rmusva4g >}}

At a high level, the talk covered the following concepts:

**The Importance of Immutabilty**

IPFS allows us to verify the content we received is the content we asked for using hashes.
* Hashes are deterministic, meaning given an input, it will always have the same output. If the input data changes in any way, then the output generated hash will also change.
* They are cryptographically secure, and can’t be predicted or reverse-engineered.
* With secure hashes, you can be confident that the content hasn’t been tampered with.
* Since files are immutable, they can never change without generating a brand new hash and, by extension, CID.
* IPFS enables fast caching and deduplication, this means changes don’t have to be transmitted in their entirety, you can just communicate changes of an existing CID.
* IPFS allows you to fetch the data you want from anyone, using the immutable CIDs.

**Anatomy of a Content Identifier (CID)**

CIDs are unique strings. There must be a way to future proof the seemingly infinite amount of data that will be added on to the network.
* The “core” of a CID, is the string encoded output (a hash) of a cryptographic hash function.
* Metadata about the root (aka a prefix) + the root itself = CID
* The collection of “metadata prefixes” (called protocols) used in CIDs are bundled into a library called [Multiformats](https://multiformats.io/)
* Currently, there are 2 different versions of CIDs in IPFS, CIDv0 & CIDv1, the currently widely accepted one being v1 CIDs. The version is also prefixed in the CID itself.
* The Multicodec tells us what algorithm was used to convert our binary data into the string hash.
* The Multibase tells us how we got the final CID (by converting the hash + the prefixes into the string CID we see). 
* The IPLD-Format tells us about the structure of the data. Examples include it being in JSON encoding, CBOR, protocol buffer, and more. 

**Importing files to IPFS**

Files are broken down into smaller pieces. These chunks of data and how they link up, are how we get self-describing and data verification properties of CIDs. 
* Chunks of a file are strung together into DAGs by IPFS; oftentimes the links create a “parent-children” tree structure.
* Directed Acyclic Graphs (DAGs) structures are customizable. The default in IPFS is DAG-PB, which is also identified in the CID under “IPLD-Format”.
* The highest (top) level parent (grandparent/great-grandparent, etc…) is also known as the “root node” or root CID. This is the CID returned to you when you add a file to IPFS!
* Customizing the DAG in any way, shape, or form, can yield a different “parent-children” relation and, as such, a different CID.
* Customizing the Chunk sizing also yields a different DAG, but has many tradeoffs. Generally, bigger chunks = faster to create DAG, bad for chunk verification, bad deduplication. Smaller blocks = inverse effect. There is ongoing development for finding the sweet spot or tailoring chunking algorithms for specific use cases.
* There are two main DAG layouts, Balanced & Trickle-Down. The first is the default in IPFS and good for most use cases, while the latter can be better for streaming content. 
* Every chunk is wrapped in UnixFS metadata. This helps IPFS distinguish directories from files. As well as, help link chunks together.


## A Brief DAG-PB Primer

The majority of data that passes through go-ipfs, js-ipfs, the IPFS gateways and various other IPFS nodes in existence, will be file data. This data uses the [**DAG-PB**](https://ipld.io/specs/codecs/dag-pb/) codec and **raw** block encoding to form graphs of IPLD blocks to represent the file data.

DAG-PB is a protobuf based format that can only contain two things: a Byte array, and a list of named and sized links to other blocks. Those links are almost always to other DAG-PB blocks or raw leaf blocks.

A typical DAG-PB block, represented as JSON, might look something like this:

```
{
    "Data": "... binary data",
    "Links": [
        {
            "Name": "link name",
            "Tsize": X,
            "Hash": CID
        },
        {
            ...
        }
    ]
}
```

Both the `"Data"` and `"Links"` fields are optional, as are `"Name"` and `"Tsize"` fields in each of the `"Links"` elements, but they are generally all present. Each `"Links"` element contains:

* A `"Name"` field which is typically the name of the file or directory data being linked to
* A `"Tsize"` field which provides a _hint_ at the size of the graph from this link down to its leaves. We don't have assurances of this value so we treat it as _hint_.
* A `"Hash"` field which contains a CID for this link.

The `"Name"` field is particularly important because it is used for a special form of pathing. When you request file data as a `<CID>/<path>` pair from an IPFS node or gateway, the path is usually interpreted by looking for that name in the `"Name"` fields of the `"Links"` list.

The `"Data"` field can be used to store arbirary bytes, _but_ it's typically used for **UnixFS** metadata. This is how we layer some additional features to the storage, retrieval and navigation of file-based data.

Read more about the DAG-PB codec in the [**specification**](https://ipld.io/specs/codecs/dag-pb/).

## UnixFS

UnixFS is an additional encoding layer _above_ the DAG-PB codec that is applied to serialize filesystem metadata. Metadata can include file timestamps, permissions, mime types and whether this object is a file, directory or even a symlink. This data is all encoded in a second protobuf format within the `"Data"` field of a DAG-PB block. This means that a single block may incur a double Protobuf decode to retrieve complete information about the filesystem.

UnixFS data also includes additional information about the form that the graph takes as it maps to filesystem data. For particularly large numbers of files, (or a large number of chunks if the files are too big), the graphs must be organised in a way that scales. This introduces the need for a "sharding" system to ensure that we don't bloat single blocks. Too many links will make the blocks themselves unmanageably large (there is also a practical limit to block size, we prefer to try and keep them below 1Mb).


More information about UnixFS can be found in the [**IPFS docs**](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) or in the UnixFS [**specification**](https://github.com/ipfs/specs/blob/master/UNIXFS.md).

### Sharding

Sharding of IPFS file graphs is an important concept because we use similar approaches in different ways to scale our various data structures, including the Filecoin blockchain (which is _not_ file data and uses DAG-CBOR codec).

UnixFS uses a sharding technique called a HAMT, or [Hash Array Mapped Trie](https://en.wikipedia.org/wiki/Hash_array_mapped_trie). This is a common algorithm used in many programming languages to provide efficient associative arrays (maps), and it turns out to be particularly useful in the content addressed world due to its stability and balanced nature. With a HAMT, we can build an arbitrarily large data structure from linked IPLD blocks that store `Name:Link` mappings. Consider the challenge of storing Wikipedia on IPFS, where almost all pages are under a single root&mdash;Wikipedia is like a single directory with millions of HTML files. A single DAG-PB block with a `"Links"` list that large would produce a block far too large to store and transfer efficiently. So we use a HAMT to spread it over many blocks, where their `"Links"` lists are made up of links whose names are part of a hash digest of each name of the file.

For an in-depth description on a generalized HAMT as it applies to IPLD, read the [**specification**](https://ipld.io/specs/advanced-data-layouts/hamt/), which also has links to various implementations. (Note that this specification is not *exactly* the same as the implementation used in UnixFS sharding; although it is used heavily throughout the Filecoin chain for its various scalable associative arrays).

More discussion on using IPLD to build distributed data structures can be found in the [Data Structures](distributed-data-structures.md) section.

## Limitations of File Data

Files are a great abstraction that have served us well; the success of IPFS to date with its file-focus is testament to the strength of the _file_ abstraction. But it can have limitations. It is common for users to store structured file data with IPFS, such that they must first retrieve their complete file(s) before being able to access and make use of their data. JSON files are a common form of this, but YAML, XML, Excel and other formats are also common. This doesn't scale very well, and it also prevents you from using IPLD's sophisticated graph tooling from working on the data itself since it can only know about the file abstraction used to store the data. It also relies on smart file chunking algorithms to de-duplicate files as they are modified and re-stored over time, which can be a hit-or-miss process.

IPLD-native codecs that support the full IPLD Data Model, in particular [**DAG-CBOR**](https://ipld.io/specs/codecs/dag-cbor/), allow for the storage of structured data within IPLD blocks in a way that the data itself forms nodes within the full graph. The Filecoin chain is probably the most sophisticated example of DAG-CBOR IPLD blocks used to represent a very large and scalable graph of structured data. Instead of having to load complete files, decode their contents and find individual pieces of data, an IPLD graph like the Filecoin chain can be navigated, transferred and reasoned about using IPLD [paths or selectors](paths-selectors.md). De-duplication takes place on a very granular level since each block takes a predictable and stable form. Mutating the Filecoin chain from each tipset to the next requires changing a relatively small number of blocks within the entire graph of blocks that make up a single tipset, since many of them will be unmodified from previous tipsets.

Many developers in the IPFS ecosystem are developing sophisticated applications that use IPLD blocks as a kind of scalable and distributed *database* by leaning on the complete IPLD Data Model and codecs that allow them to encode that data.
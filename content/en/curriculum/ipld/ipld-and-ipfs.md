---
title: "IPLD & IPFS"
description: "Understand the IPLD data model"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 210
category: lecture
level:
- shallow
- deep
objectives:
  show: true
  goals:
  - "1.3"
  subgoals:
  - 1.31
  - 1.32
  - 1.33
  - 1.34
  - 1.35
---
## Background Information
In order to understand the pieces that tie IPFS and IPLD together, you will need to understand the following fundamental concepts:
* [**JSON**](https://www.w3schools.com/whatis/whatis_json.asp) - An acronym for "JavaScript Object Notation". This is an industry standard for formatting different types of data in a human-readable way.
* [**Protobuf**](https://developers.google.com/protocol-buffers/docs/overview) - Is an industry standard for declaring just one way on how to format data that will be streamed over the internet for storage or processing. This uses a JSON formatting.
* [**Merkle DAGs**](/curriculum/ipld/merkle-dags) - Built from the bottom up, impossible to have circular references, and parents’ hashes are built from the hashes of its children nodes.

### The Core of IPFS
At its core, IPFS is best viewed as a suite of standards for storing, sharing, navigating and manipulating IPLD data. IPFS is particularly skilled at leading with structured file data, and is particularly good at performing peer to peer data sharing.

#### How IPFS Deals With Files | IPFS Camp 2019 Workshop – Alan Shaw

In the following talk, Alan Shaw goes over theory and live examples of what happens with files added to IPFS. He highlights different variations to the underlying data structure created with a file added to IPFS and how it affects the CID. 

{{< youtube SP1qMZA3UG8 >}}

At a high level, the talk covered the following concepts:

* Files are broken down into smaller blobs (chunks) of data
* Chunks of a file are strung together into DAGs by UnixFS processes
* Customizing the DAG in any way, shape, or form, yields a different CID
* Every chunk is wrapped in UnixFS metadata. This helps IPFS distinguish directories from files. As well as, help link chunks together.


## A Brief DAG-PB Primer

The majority of data that passes through kubo (go-ipfs), js-ipfs, the IPFS gateways and various other IPFS nodes in existence, will be file data. This data uses the [**DAG-PB**](https://ipld.io/specs/codecs/dag-pb/) codec and **raw** block encoding to form graphs of IPLD blocks to represent the file data.

DAG-PB is a protobuf based format that can only contain two things: a Byte array, and a list of named and sized links to other blocks. Those links are almost always to other DAG-PB blocks or raw leaf blocks.

A typical DAG-PB block, represented as JSON, might look something like this:

```
{
    "Data": "... binary data",
    "Links": [
        {
            "Name": "named link of file or directory",
            "Tsize": <number>, "(size of graph from this link, down to leaves)"
            "Hash": CID
        },
        {
            ...
        }
    ]
}
```
Things to note:
* Both the `"Data"` and `"Links"` fields are optional, as are `"Name"` and `"Tsize"`, but they are generally all present.
* `"Tsize"` - We don't have assurances of this value so we treat it as _hint_.
* The `"Name"` field is particularly important because when you request file data from IPFS, the path is usually interpreted by looking for that name in the `"Name"` field.
* The `"Data"` field can be used to store arbitrary bytes, _but_ it's typically used for **UnixFS** metadata.

Read more about the DAG-PB codec in the [**specification**](https://ipld.io/specs/codecs/dag-pb/).

## UnixFS

[UnixFS](https://docs.ipfs.tech/concepts/file-systems/#unix-file-system-unixfs) is a data format for creating directory & file hierarchies and Merkle DAGs. UnixFS is an additional encoding layer _above_ the DAG-PB codec that is applied to serialize filesystem metadata. Metadata can include file timestamps, file permissions, mime (file) types and whether this object is a file, directory or even a symlink. This data is all encoded in a second protobuf format within the `"Data"` field of a DAG-PB block. This means that a single block may incur a double Protobuf decode to retrieve complete information about the filesystem.

UnixFS data also includes additional information about the form that the graph takes as it maps to filesystem data. For particularly large numbers of files, (or a large number of chunks if the files are too big), the graphs must be organized in a way that scales. This introduces the need for a "sharding" system to ensure that we don't bloat single blocks. Too many links will make the blocks themselves unmanageably large (there is also a practical limit to block size, we prefer to try and keep them below 1Mb).


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
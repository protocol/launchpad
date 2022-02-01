---
description: The CAR Format
---

## The CAR Format

**CAR**, or Content Addressable aRchives, is a format for bundling IPLD blocks into a large bundle. These bundles can be stored as files, typically with a `.car` extension, or transferred over the wire. We categorise CAR as a "transport" for IPLD.

![](<../../.gitbook/assets/image (4).png>)

### CARv1

The CARv1 format comprises a sequence of length-prefixed IPLD block data, where the first block in the CAR is the **Header** encoded as DAG-CBOR, and the remaining blocks form the **Data** component of the CAR and are each additionally prefixed with their CIDs. The length prefix of each block in a CAR is encoded as a "varint"—an unsigned LEB128 integer. This integer specifies the number of remaining bytes for that block entry—excluding the bytes used to encode the integer, but including the CID for non-header blocks.

```
|--------- Header --------| |---------------------------------- Data -----------------------------------|

[ varint | DAG-CBOR block ] [ varint | CID | block ] [ varint | CID | block ] [ varint | CID | block ] …
```

There is no strict limits on the number of blocks a CAR may contain, nor how large they can be. It is also not strictly required that the blocks in a CAR be related. However, a typical CAR contains a single, complete DAG of blocks, whose root block's CID is recorded in the Header of the CAR.

### Example Use-cases

An example use-case: **[Web3.storage](https://web3.storage)** allows users to upload IPLD data in bundles (instead of block-by-block) using the CAR format via [an HTTP API end-point](https://docs.web3.storage/how-tos/work-with-car-files/). Web3.storage has fairly relaxed restrictions on the layout or contents of a CAR that a user supplies.

Another example use-case: **Filecoin** deals are typically performed using the CAR format to package a DAG as specified by an IPLD Selector (typically a selector that defines a complete DAG). These CARs have a single root, and the DAG's blocks are deterministically ordered according to the depth-first walk that a selector traversal performs.

### CARv2

<<<<<<< HEAD
CARv2 is an incremental upgrade to CARv2. It _wraps_ a CARv1 in an outer layer of data that provides some extra descriptive elements about the data in the CAR and a means for attaching an **index** of blocks within the CAR to the end of the archive. These improvements allow CARv2 to be used as an efficient IPLD block store (efficient on read operations, write operations are a little more complex due to the trailing index).
=======
CARv2 is an incremental upgrade to CARv2 in that it _wraps_ a CARv1 in an outer layer of data that provides some extra descriptive elements about the data in the CAR and a means for attaching an **index** of blocks within the CAR to the end of the archive. These improvements allow CARv2 to be used as an efficient IPLD block store (efficient on read operations, write operations are a little more complex due to the trailing index).
>>>>>>> main

```
| 11-byte fixed pragma | 40-byte header | optional padding | CARv1 data payload | optional padding | optional index payload |
```

CARv2 has a flexible approach to index formats. The header provides details about where the various pieces of data are located: offsets and padding. The CARv1 format data payload being the most important component to identify (a CARv2 implementation can provide a CARv1 format reader that reads strictly from the bytes within this section).

The index at the end of the format provides information about what blocks are stored within the CARv1 data payload and _where_ they exist within the archive. A CARv2 reader implementation can load the index and then use its CID->offset mapping information to seek directly to the requested block and not have to hunt for it. The index *format* is flexible, in that the first byte of the index identifies the format (which a given CARv2 implementation may or may not understand how to read) and the rest of the bytes conform to that format. There are currently two well-specified index formats, but there are a number of additional experimental index formats. Index formats may be selected depending on the suitability for a particular application or set of data - generation speed, usage performance, size, etc. Indexes typically only store the *Multihash* of a block, rather than the entire CID, for efficiency reasons (but there are other interesting characteristics enabled by being able to look up a block by multihash rather than the entire CID, even if the *Multicodec* is useful for decoding the block once it's found).

### Further Reading

The CARv1 and CARv2 specifications, including specifications for CARv2 index formats, can be found on the IPLD specifications site: https://ipld.io/specs/transport/car/

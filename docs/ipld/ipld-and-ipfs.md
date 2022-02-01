# IPLD & IPFS

### IPLD & IPFS

At its core, IPFS is best viewed as a suite of standards for storing, sharing, navigating and manipulating IPLD data. IPFS is particularly skilled at leading with structured file data, and is particularly good at performing peer to peer data sharing.

**How IPFS Deals With Files - IPFS Camp 2019 Workshop** is a useful introduction to IPFS and file-based DAGs:

{% embed url="https://www.youtube.com/watch?v=Y_-TWTmF_1I" %}

#### A Brief DAG-PB Primer

The majority of data that passes through go-ipfs, js-ipfs, the IPFS gateways and various other IPFS nodes in existence, will be file data. This data uses the [**DAG-PB**](https://ipld.io/specs/codecs/dag-pb/) codec and **raw** block encoding to form graphs of IPLD blocks to represent the file data.

DAG-PB is a protobuf based format that can only contain two things: a Byte array, and a list of named and sized links to other blocks. Those links area almost always to either other DAG-PB blocks or raw leaf blocks.

A typical DAG-PB block, represented as JSON, might look something like this:

```json
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

The `"Data"` field can be used to store arbirary bytes, _but_ is typically used to **UnixFS** metadata. This is how we layer some additional features to the storage, retrieval and navigation of file-based data.

Read more about the DAG-PB codec in the [**specification**](https://ipld.io/specs/codecs/dag-pb/).

#### UnixFS

UnixFS is an additional encoding layer _above_ the DAG-PB codec that is applied to serialize filesystem metadata. Metadata can include file timestamps, permissions, mime types and whether this object is a file, directory or even a symlink. This data is all encoded in a second protobuf format within the `"Data"` field of a DAG-PB block. This means that a single block may incur a double Protobuf decode to retrieve complete information about the filesystem

UnixFS data also includes additional information to about the form that the graph takes as it maps to filesystem data. For particularly large numbers of files, (or large numbers of chunks if the files are large), the graphs must be organised in a way that scales. This introduces the need for a "sharding" system for ensuring that we don't bload single blocks with too many links and make the blocks themselves unmanageably large (there is also a practical limit to block size, we prefer to try and keep them below 1Mb).

More information about UnixFS can be found in the [**IPFS docs**](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) or in the UnixFS [**specification**](https://github.com/ipfs/specs/blob/master/UNIXFS.md).

**Sharding**

Sharding of IPFS file graphs is an important concept because we use similar approaches in different ways to scale our various data structures, including the Filecoin blockchain (which is _not_ file data and uses DAG-CBOR codec).

UnixFS uses a sharding technique called a HAMT, or [Hash Array Mapped Trie](https://en.wikipedia.org/wiki/Hash\_array\_mapped\_trie). This is a common algorithm used in many programming languages to provide efficient associative arrays (maps), and it turns out to be particularly useful in the content addressed world due to its stability and balanced nature. With a HAMT, we can build an arbitrarily large data structure from linked IPLD blocks that stores `Name:Link` mappings. Consider the challenge of storing Wikipedia on IPFS, where almost all pages are under a single root—Wikipedia is like a single directory with millions of HTML files. A single DAG-PB block with a `"Links"` list that large would produce a block far too large to store and transfer efficiently. So we use a HAMT to spread it over many blocks, where their `"Links"` lists are made up of links whose names are part of a hash digest of each name of the file.

For an in-depth description on a generalized HAMT as it applies to IPLD, read the [**specification**](https://ipld.io/specs/advanced-data-layouts/hamt/), which also has links to various implementations. (Note that this specification is not _exactly_ the same as the implementation used in UnixFS sharding; although it is used heavily throughout the Filecoin chain for its various scaleable associative arrays.)

More discussion on using IPLD to build distributed data structures can be found in the Data Structures section.

#### Limitations of File Data

Files are a great abstraction that have served us well; the success of IPFS to date with its file-focus is testament to the strength of the _file_ abstraction. But it can have limitations. It is common for users to store structured file data with IPFS, such that they must first retrieve their complete file(s) before being able to access and make use of their data. JSON files are a common form of this, but YAML, XML, Excel and other formats are also common. This doesn't scale very well, and it also prevents you from using IPLD's sophisticated graph tooling from working on the data itself since it can only know about the file abstraction used to store the data. It also relies on smart file chunking algorithms to de-duplicate files as they are modified and re-stored over time, which can be a hit-and-miss process.

IPLD-native codecs that support the fill IPLD Data Model, in particular [**DAG-CBOR**](https://ipld.io/specs/codecs/dag-cbor/), allow for the storage of structured data within IPLD blocks in a way that the data itself forms nodes within the full graph. The Filecoin chain is probably the most sophisticated example of DAG-CBOR IPLD blocks used to represent a very large and scaleable graph of structured data. Instead of having to load complete files, decode their contents and find individual pieces of data, an IPLD graph like the Filecoin chain can be navigated, transferred and reasoned about using IPLD paths or selectors. De-duplication takes place on a very granular level since each block takes a predictable and stable form. Mutating the Filecoin chain from each tipset to the next requires changing a relatively small number of blocks within the entire graph of blocks that make up a single tipset, since many of them will be unmodified from previous tipsets.

Many developers in the IPFS ecosystem are developing sophisticated applications that use IPLD blocks as a kind of scaleable and distributed _database_ by leaning on the complete IPLD Data Model and codecs that allow them to encode that data.

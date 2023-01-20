---
title: "The Data Model & Codecs"
description: "Understand what are IPLD codecs and what are they used for"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 230
aliases:
- /curriculum/ipld/codecs/
- /curriculum/ipld/data-model
category: lecture
level:
- deep
objectives:
  show: true
  goals:
  - "1.4"
  subgoals:
  - 1.41
  - 1.42
  - 1.43
---
## What is the Data Model?
The Data Model is how we reason about data moving through the various states. We can know how the data is structured through memory, programmatic access and manipulation, and serialization to and from bytes for storage or transfers.

Like the JSON data model, the IPLD Data Model includes data **[Kinds](https://ipld.io/docs/schemas/using/authoring-guide/#schema-kinds)** which include **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Lists** and **Maps**, but also adds **[Bytes](https://ipld.io/docs/schemas/using/authoring-guide/#bytesprefix-unions-for-bytes)** and **[Links](https://ipld.io/docs/schemas/using/authoring-guide/#links)** (CIDs). 

The data model defines a common representation of basic types that **are easily representable by common programming languages** and **found in the most common and successful serialization formats**.

```js
const data = {
 string: "☺️  we can do strings!",
 ints: 1337,
 floats: 13.37,
 booleans: true,
 lists: [1, 2, 3],
 bytes: new Uint8Array([0x01, 0x03, 0x03, 0x07]),
 links: CID(bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae)
}
```

Read more about the Data Model at [**ipld.io/docs/data-model**](https://ipld.io/docs/data-model/)

### What are Kinds?

We refer to the different kinds of representable data in the Data Model as "kinds": **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Bytes**, **Lists**, **Maps** and **Links**. The 'recursive kinds' are **Maps** and **Lists** (since they can contain other kinds). We use the term "kinds" here to disambiguate this from "types", which is a term we use at the Schemas level.

Read more about IPLD Kinds and specifics of what we expect regarding their bounds and representation at [ipld.io/docs/data-model/kinds](https://ipld.io/docs/data-model/kinds/)

## What are Codecs?
Codecs are how IPLD moves data between the raw byte representation and their equivalent **Data Model** form. IPLD is ambitious in its aims to be able to represent many, varied types of content addressed data (not just file data for IPFS). To do this, it must be able to _encode and decode_ those data formats. Empowering it to be able to represent, manipulate and navigate data in memory; codecs make it possible to turn at-rest binary data into meaningful data structures.

### IPLD-native Codecs

Codecs for both **JSON** (multicodec code `0x0200`) and **CBOR** (multicodec code `0x51`) data are bundled with IPFS and may be used within most IPLD systems. However, both of these formats lack the key **Link** kind, so they cannot form coherent, linked DAGs and can therefore only be terminal blocks within IPLD graphs.

The **raw** codec (multicodec code `0x55`) is essentially a pass-through, from stored bytes, to Data Model **Bytes**. It also can only be a terminal within an IPLD graph but is used within IPFS file graphs to represent raw file data—usually as chunks of a complete file, connected by a parent **DAG-PB** block.

The [**DAG-PB**](https://ipld.io/specs/codecs/dag-pb/) codec is the original IPFS file data codec. It uses a fixed Protobuf format to represent just enough data to describe connected graphs of named links pointing to file data. DAG-PB is limited in that it can only represent Data Model **Bytes** and named **Links**. It is difficult to use DAG-PB for [data other than standard file data](/curriculum/ipld/ipld-and-ipfs/#limitations-of-file-data). 

[**DAG-CBOR**](https://ipld.io/specs/codecs/dag-cbor/) is the most flexible (and arguably) useful native format of IPLD and IPFS. Built on CBOR, it enables the representation of all Data Model kinds, only needing to add **Links** to what CBOR can currently support (this is done via CBORs tag system). DAG-CBOR is the native format of the Filecoin chain, and is recommended for users building applications on IPLD (and IPFS) that are not focused on files.

[**DAG-JSON**](https://ipld.io/specs/codecs/dag-json/) is similar to DAG-CBOR in that it can represent the entire IPLD Data Model. It uses special forms within the data to denote **Links** (including the encoding of CIDs as their string form) and **Bytes** (including the encoding of raw bytes as base64). DAG-JSON is less space efficient but can be human-readable. For this reason it is the default output format of the `ipfs dag get` command which can be used to inspect IPLD blocks and nodes.

### Examples

Given some arbitrary data, [as shown above](/curriculum/ipld/codecs/#what-is-the-data-model), that is compatible with the IPLD Data Model, what does it look like in encoded form?

###### DAG-JSON:

```json
{
 "arrays": [1, 2, 3],
 "booleans": true,
 "bytes": { "/": { "bytes": "AQMDBw" } },
 "floats": 13.37,
 "ints": 1337,
 "links": { "/": "bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae" },
 "string": "☺️  we can do strings!"
}
```

Note that DAG-JSON strips extraneous whitespace, the above example is pretty-printed for ease of reading.

###### DAG-CBOR:

DAG-CBOR is difficult to illustrate as it's a purely binary format. Our example data encodes to the following binary data represented in hexadecimal:

```
a764696e74731905396562797465734401030307656c696e6b73d82a58250001711220785197229dc8bb115294
5da58e2348f7e279eeded06cc2ca736d0e879858b501666172726179738301020366666c6f617473fb402abd70
a3d70a3d66737472696e67781ae298baefb88f202077652063616e20646f20737472696e67732168626f6f6c65
616e73f5
```

But _you can use [cbor.me](https://cbor.me) via the web, or install [github.com/rvagg/cborg](https://github.com/rvagg/cborg) on the command line to replace this output with a human-readable one if you have raw CBOR to inspect._

### Codecs for Non-IPFS Systems
Every content addressed data system (CAS) defines at least one data storage format. Some formats are common between systems like JSON or CBOR. [CBOR is a binary format](https://cbor.io/) that is similar to JSON but more compact and able to represent more data types.

Popular content addressed systems (CAS) such as Git, Bitcoin and Ethereum have their own unique and custom formats, specifically engineered to their own use-cases.

IPLD has had codecs written for many different content addressed systems:

* Git (multicodec code `0x78`)
* Bittorrent (multicodec code `0x7b` and `0x7c`)
* Bitcoin (multicodec codes `0xb0`, `0xb1`, `0xb2`)
* Ethereum (multicodec codes `0x90` to `0x9a`)
* ... and more

*Caveat: as these are not core to IPFS or IPLD, most of these codecs are usually not as actively maintained as the IPLD-native codecs and may need some love!*

Knowing these codecs and how data is formatted underneath, would enable IPLD developers to traverse their respective content addressed systems (CAS). Codecs, along with the Data Model, allows developers to make sense of the custom formats of other CASs.
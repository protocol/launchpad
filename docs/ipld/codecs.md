---
description: Codecs
---

## Codecs

IPLD is ambitious in its aims to be able to represent many, varied types of content addressed data. To do this, it must be able to decode and encode those data formats. Being able to represent, manipulate and navigate data in memory is only possible if we can turn at-rest binary data into meaningful data structures.

Every content addressed data system defines at leats one data storage format. Some formats are common between systems—JSON is a common format since it is supported across almost every programming language and is easy to read! Binary formats are common for their compactness when storing or transferring large amounts of data. CBOR is a binary format that is similar to JSON but more compact and able to represent more data types.

Popular content addressed systems such as Git, Bitcoin and Ethereum have their own unique and custom formats, specifically engineered to their own use-cases.

Similarly, IPFS began life with its own data encoding format, specifically designed around the needs of file storage and addressing. Over time, the native IPFS data format was defined as "DAG-PB" (because it is a Protobuf based format for building DAGs), with an additional layer on top of it called UnixFS for encoding file and directory metadata.

But IPLD gives IPFS superpowers to store, transfer, address and manipulate many other data formats, and the self-describing nature of CIDs give us the tools to link between them.

**Codecs are how IPLD moves data between the raw byte representation and their equivalent Data Model form.**

### Codecs for Non-IPFS Systems

IPLD has had codecs written for many different content addressed systems:

* Git (multicodec code `0x78`)
* Bitcoin (multicodec codes `0xb0`, `0xb1`, `0xb2`)
* Ethereum (multicodec codes `0x90` to `0x9a`)
* Zcash (multicodec codes `0xc0` and `0xc1`)
* Dash (multicodec code `0xf0` and `0xf1`)
* Bittorrent (multicodec code `0x7b` and `0x7c`)
* ... and more

*Caveat emptor: as these are not core to IPFS or IPLD, most of these codecs are usually not as actively maintained as the IPLD-native codecs and may need some love!*

### IPLD-native Codecs

Codecs for both **JSON** (multicodec code `0x0200`) and **CBOR** (multicodec code `0x51`) data are bundled with IPFS and may be used within most IPLD systems. However, both of these formats lack the key **Link** kind, so cannot form coherent, linked DAGs and can therefore only be terminal blocks within IPLD graphs.

The **raw** codec (multicodec code `0x55`) is essentially a pass-through, from stored bytes, to Data Model **Bytes**. It also can only be a terminal within an IPLD graph but is used within IPFS file graphs to represent raw file data—usually as chunks of a complete file, connected by a parent **DAG-PB** block.

The [**DAG-PB**](https://ipld.io/specs/codecs/dag-pb/) codec is the original IPFS file data codec. It uses a fixed Protobuf format to represent just enough data to describe connected graphs of named links pointinf to file data. DAG-PB is limited in that it can only represent Data Model **Bytes** and named **Links**. It is difficult to use DAG-PB for more than standard file data but because it is the native IPFS data format, it is common for IPFS users to translate their data structures into file form. Useful data is often stored within JSON files which are then encoded using DAG-PB and addressed by their file name. Unfortunately, this means that IPLD (and IPFS by extension) can't help users navigate at the level of their useful data, it can only present them with the files for them to decode. Which is why IPLD introduces two new flexible formats.

[**DAG-CBOR**](https://ipld.io/specs/codecs/dag-cbor/) is the most flexible (and arguably) useful native format of IPLD and IPFS. Built on CBOR, it enables the representation of all Data Model kinds, only needing to add **Links** to what CBOR can currently support (this is done via CBORs tag system). DAG-CBOR is the native format of the Filecoin chain, and is recommended for users building applications on IPLD (and IPFS) that are not focused on files.

[**DAG-JSON**](https://ipld.io/specs/codecs/dag-json/) is similar to DAG-CBOR in that it can represent the entire IPLD Data Model. It uses special forms within the data to denote **Links** (including the encoding of CIDs as their string form) and **Bytes** (including the encoding of raw bytes as base64). DAG-JSON is less space efficient but can be human-readable. For this reason it is the default output format of the `ipfs dag get` command which can be used to inspect IPLD blocks and nodes.

```
$ ipfs dag get /ipld/bafybeibxm2nsadl3fnxv2sxcxmxaco2jl53wpeorjdzidjwf5aqdg7wa6u/Links/1
{"Hash":{"/":"QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y"},"Name":"contact","Tsize":200}
```

Note in the output above, a Link (CID) is represented using the form `{"/":"<cid>"}`. Similarly, Bytes are represented as `{"/":{"bytes":"<base64 encoded bytes>"}}`.

[**DAG-JOSE**](https://ipld.io/specs/codecs/dag-jose/) is the newest codec able to support the complete Data Model. It combines the [JOSE](https://jose.readthedocs.io/en/latest/) format with CBOR to provide a standards-based signing and encryption format for flexible IPLD data.

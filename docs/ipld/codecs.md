# Codecs

IPLD is ambitious in its aims to be able to represent many, varied types of content addressed data. To do this, it must be able to decode and encode those data formats. Being able to represent, manipulate and navigate data in memory is only possible if we can turn at-rest binary data into meaningful data structures.

Every content addressed data system defines at leats one data storage format. Some formats are common between systems—JSON is a common format since it is supported across almost every programming language and is easy to read! Binary formats are common for their compactness when storing or transferring large amounts of data. [CBOR is a binary format](https://cbor.io/) that is similar to JSON but more compact and able to represent more data types.

Popular content addressed systems such as Git, Bitcoin and Ethereum have their own unique and custom formats, specifically engineered to their own use-cases.

Similarly, IPFS began life with its own data encoding format, specifically designed around the needs of file storage and addressing. Over time, the native IPFS data format was defined as "DAG-PB" (because it is a Protobuf based format for building DAGs), with an additional layer on top of it called UnixFS for encoding file and directory metadata.

But IPLD gives IPFS superpowers to store, transfer, address and manipulate many other data formats, and the self-describing nature of CIDs give us the tools to link between them.

**Codecs are how IPLD moves data between the raw byte representation and their equivalent Data Model form.**

## Codecs for Non-IPFS Systems

IPLD has had codecs written for many different content addressed systems:

* Git (multicodec code `0x78`)
* Bitcoin (multicodec codes `0xb0`, `0xb1`, `0xb2`)
* Ethereum (multicodec codes `0x90` to `0x9a`)
* Zcash (multicodec codes `0xc0` and `0xc1`)
* Dash (multicodec code `0xf0` and `0xf1`)
* Bittorrent (multicodec code `0x7b` and `0x7c`)
* ... and more

*Caveat emptor: as these are not core to IPFS or IPLD, most of these codecs are usually not as actively maintained as the IPLD-native codecs and may need some love!*

## IPLD-native Codecs

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

## Examples

Given some data (represented here as JavaScript) in memory, compatible with the IPLD Data Model, what does it look like in encoded form?

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

**DAG-JSON**:

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

Note that DAG-JSON strips extraneous whitespace, the above example is present pretty-printed for ease of reading:

```json
{"arrays":[1,2,3],"booleans":true,"bytes":{"/":{"bytes":"AQMDBw"}},"floats":13.37,"ints":1337,"links":{"/":"bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae"},"string":"☺️  we can do strings!"}
```

**DAG-CBOR**:

DAG-CBOR is difficult to illustrate as it's a purely binary format. Our example data encodes to the following binary data represented in hexadecimal:

```
a764696e74731905396562797465734401030307656c696e6b73d82a58250001711220785197229dc8bb115294
5da58e2348f7e279eeded06cc2ca736d0e879858b501666172726179738301020366666c6f617473fb402abd70
a3d70a3d66737472696e67781ae298baefb88f202077652063616e20646f20737472696e67732168626f6f6c65
616e73f5
```

CBOR has a standard diagnostic output that is useful for visualizing this data, however:

```
a7                                                # map(7)
  64                                              #   string(4)
    696e7473                                      #     "ints"
  19 0539                                         #   uint(1337)
  65                                              #   string(5)
    6279746573                                    #     "bytes"
  44                                              #   bytes(4)
    01030307                                      #     "\x01\x03\x03\x07"
  65                                              #   string(5)
    6c696e6b73                                    #     "links"
  d8 2a                                           #   tag(42)
    58 25                                         #     bytes(37)
      0001711220785197229dc8bb1152945da58e2348f7  #       "\x00\x01q\x12 xQ"]¥#H÷"
      e279eeded06cc2ca736d0e879858b501            #       "âyîÞÐl Êsm\x0e"
  66                                              #   string(6)
    617272617973                                  #     "arrays"
  83                                              #   array(3)
    01                                            #     uint(1)
    02                                            #     uint(2)
    03                                            #     uint(3)
  66                                              #   string(6)
    666c6f617473                                  #     "floats"
  fb 402abd70a3d70a3d                             #   float(13.37)
  66                                              #   string(6)
    737472696e67                                  #     "string"
  78 1ae298baef                                   #   string(22)
    e298baefb88f202077652063616e20646f2073747269  #     "☺️  we can do stri"
    6e677321                                      #     "ngs!"
  68                                              #   string(8)
    626f6f6c65616e73                              #     "booleans"
  f5                                              #   true
```

_(You can use [cbor.me](https://cbor.me) via the web, or install [github.com/rvagg/cborg](https://github.com/rvagg/cborg) on the command line to replicate this output if you have raw CBOR to inspect)._

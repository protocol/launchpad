# Content Addressing & CIDs



### Content Addressing

#### Why location addressing fails us

* A URL only points to a single copy, stored in a single location.
* If that copy disappears, there is no way to know where other copies are.
* It is not possible for a user to validate the integrity of the content:
  * A malicious actor can poison DNS, or change the copy’s location, without the end user noticing.
  * HTTPS is an improvement, but only secures the transport, not the content.
* No request aggregation, resulting in duplication of effort and bandwidth waste (i.e. no options for multicast in the wild).

#### Location- vs content-addressing

Location addressing asks exactly one remote host for content by name (which may or may not be related to the content). Content addressing can ask any how for content by the fingerprint (hash) of that content since the relationship between the fingerprint and the content is immutable. Since we can verify the content we receive matches the fingerprint, it doesn't matter who we receive the content from.

_**GRAPHIC FROM https://docs.google.com/presentation/d/1OnqLcAsY8j\_ysSzMKDtXeEkcJV2NKNoEecgHTDXjPqQ/edit#slide=id.g100b1e739cd\_0\_22 slide 22?**_

Further

### Content Identifiers (CIDs)

CIDs are:

* _the most fundamental ingredient of the IPFS architecture_
* used for **content addressing**
* a **hash** digest with some metadata
* **self describing**
* used to name every piece of data in IPFS Example: CIDv0: [**`Qm`**`S4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv`](https://ipfs.io/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv) CIDv1: [**`bafybei`**`bxm2nsadl3fnxv2sxcxmxaco2jl53wpeorjdzidjwf5aqdg7wa6u`](https://ipfs.io/ipfs/bafybeibxm2nsadl3fnxv2sxcxmxaco2jl53wpeorjdzidjwf5aqdg7wa6u) _(These point to the same content but use two different versions of the CID specification, more on this later)._ CIDs are self-describing content addresses: hash digests with descriptions of what & how. They tell you the hash function used as well as the codec that can be used to interpret the binary data being linked to. A hash digest is a fine content address, but a CID makes it self-describing and able to jump across systems. A Git commit hash is just a hash digest and you know it's a SHA1 output because _it's Git_ and that's all Git has been using. But now that Git wants to start using SHA2-256 hashes, the assumptions built in about SHA1 are quire painful and they need a way to distinguish. If Git was built using CIDs instead, it wouldn't matter what hash function was used and upgrading would be trivial. Similarly, you know that a Git commit hash addresses a Git commit because you use it within the Git context. But what if you wanted to address a Git commit from an Ethereum block and point to that Ethereum block from a reproducible build system? When using these digests you also need to say _what_ system those digests live within (i.e. where you might find them and what you might do when you locate the data). CIDs give us a complete self-describing package:
* What hash function was used
* How many bytes of output we have
* What kind of data is being addressed and how we might interpret it when we find it

#### CIDs are immutable links

Because of the wonders of content addressing, CIDs give us:

* **Self-certification / Integrity**: Content is authenticated by its address, not by a Certificate Authority -> Decentralisation
* **Deduplication**: Identical data can be verified by its address -> Caching -> saves resources and provides faster access to content
* **Immutability**: If the content changes, its address also changes -> Integrity Checking Also: Change Tracking, Cacheability, Efficient Syncability, Scalability, Offline-first Architectures, Resilience, and more!

#### Links as the heart of IPLD

CIDs are the native link format for IPLD that distinguishes it from a simple data representation system. They are how we can connect graphs of data in flexible ways.

* Most data serialization formats, such as JSON and CBOR, don’t have a native way of representing links to content addressed data, so don’t have an in-built way to form graphs of linked data.
* IPLD brings its own formats that represent CIDs natively in the encoded bytes.
* IPLD can also be used as a lens through which to view other content addressed formats, such as Git, or Bitcoin from which we can derive CIDs by assumption.

#### Anatomy of a CID

_**GRAPHIC FROM THE TOP OF https://docs.google.com/presentation/d/1OnqLcAsY8j\_ysSzMKDtXeEkcJV2NKNoEecgHTDXjPqQ/edit#slide=id.g100b1e739cd\_0\_685 slide 30?**_ CIDs build on some basic technologies for self-describing data:

* **Multihash**: A self-describing hash digest, using a pre-set number to identify the hash function used, comprises the main content of a CID.
* **Multicodec**: A pre-set number to uniquely identify a format, or protocol. Used in CIDs for the IPLD format that tells you how to decode the data when you locate it and load its bytes.
* **Multibase**: A self-describing base-encoded string, used for the string form of a CID. Multihash, Multicodec, Multibase and CIDs are part of the "Multiformats" system for self-describing values. A CID can be said to be built as a concatenation of these technologies: `<multibase>(<cid-version><multicodec><multihash>)`

**Multiformats**

A **Multicodec** is a pre-set number to uniquely identify a format, or protocol. A central registry stores the mappings of allocated numbers and is regularly updated: https://github.com/multiformats/multicodec. Generally, multicodec numbers are used as prefixes to the values they identify. When represented in binary, these are typically encoded as "varints", or variable-length integers ([LEB128](https://en.wikipedia.org/wiki/LEB128)) for compactness. A **Multihash** is a self-describing hash digest. The hash digest is prefixed with a number that identifies the hash function, this number is listed in the Multicodec registry. Each hash function that anyone wants to generate multihashes from has an entry in the table. For example, the SHA3-384 hash function has the code `0x15`, while a BLAKE2b hash function with 384-bit output is `0xb230`. After the hash function code prefix, a Multihash also prefixes the length of the hash digest to follow. So a Multihash can be said to be: `<hash-function-code><digest-length><digest-bytes>`. **Multibase** defines a specification for self-describing base encoding for string representation of bytes. Multibase uses a prefix _character_ which describes the base used to encode the bytes that follow. For example:

* `b` - base32
* `z` - base58
* `f` - base16 The full list of bases and their mappings can be found in the Multibase registry at https://github.com/multiformats/multibase Base32 is the most commonly used base encoding for version 1 CIDs, hence the `b` at the begininning. This character says that all the following characters can be passed through a base32 decoder to retrieve the raw bytes. Fun fact: while not the most compact string representation, base32 is the preferred base encoding for CIDv1 because it only uses lower-case ASCII characters so is safe to use in DNS entries.

#### Interpreting a CID

A CID is the concatenation of `<multibase>(<cid-version><multicodec><multihash>)` - that is, when represented as a string, the Multibase character is prefixed but when represented as bytes we don't need Multibase so it's simply `<cid-version><multicodec><multihash>`. **CIDv0 is a special case** because it predates the Multiformats specifications. It's simply the Multihash of the content and as a string is represented using the Bitcoin variant of base58 (there is also a Flickr variant!). CIDv0 exclusively use the SHA2-256 hash function, and because the digest length is 256 bits (32 bytes), we end up with the Multibase prefix being represented as `Qm` in string form. Beyond CIDv0, there is only one currently valid CID version `1`, but a CIDv1 in string form can use any base encoding in the Multibase table and represent the same CID:

* Base32: `bafybeibxm2nsadl3fnxv2sxcxmxaco2jl53wpeorjdzidjwf5aqdg7wa6u`
* Base58 (BTC): `zdj7WZAAFKPvYPPzyJLso2hhxo8a7ZACFQ4DvvfrNXTHidofr`
* Base64: `mAXASIDdmmyANeytvXUriuy4BO0lfd2eR0UjygabF6CAzfsD1`
* Base8: `7002700221003354646620015366255572724534256627001166445373566362164244362403233057202006337540365`
* Base2: `0000000010111000000010010001000000011011101100110100110110010000000001101011110110010101101101111...` (you get the idea...)

#### Further Reading

* [**Content addressing and CIDs**](https://docs.ipfs.io/concepts/content-addressing/) in the IPFS documentation.
* The [**CID Inspector**](https://cid.ipfs.io) is a useful tool for dissecting a CID string.
* [**Anatomy of a CID**](https://proto.school/anatomy-of-a-cid/) on Proto.school, a guided, interactive tutorial.

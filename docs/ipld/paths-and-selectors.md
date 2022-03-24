# Paths & Selectors

## Pathing in IPLD

'Pathing' refers to the use of simple strings called "paths" to describe navigation between nodes in an IPLD data graph.

You can think of "pathing" in IPLD as being comparable to how you use "paths" in a filesystem: paths are composed of a series of segments, and each segment is an instruction on how to navigate deeper into the filesystem. With filesystems, each step is over a "directory" and leads you to either a "file" or another "directory"; for IPLD, each step is over a "node" and leads you to another "node"!

The most common form of pathing can be found in the IPFS gateway, or IPFS on the CLI where a CID postfixed with a `/` followed by a string (perhaps containing further `/` path segment separators).

For example, the IPFS "address" [ipfs://QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html](ipfs://QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html) (which some browsers support natively, or you can use via the IPFS gateway: [https://ipfs.io/ipfs/QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html](https://ipfs.io/ipfs/QmUaUmRWCfnyAdYFqckr4ArtmhAuzJSM6216SHb2emfz2B/0927/index.html)), includes a CID and a path. The CID addresses a single block, but the path (`/0927/index.html`) takes further. In this example, the path is navigating through a series of linked blocks to find a leaf block containg the content for the `index.html` file. _(Note that there is more than meets the eye to this example, since the underlying IPLD data is transformed through a UnixFS lens to provide directory-like pathing, but we'll ignore that for the purpose of a discussion on pathing!)._

Another example, which you can try on the commandline with go-ipfs, is inspecting the contents of the Filecoin genesis block, which is a DAG-CBOR block and has the CID `bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi`. Running the command: `ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi` we can fetch this block and _see_ it by having it translated using the DAG-JSON codec for nice human-readable printing (use `ipfs block get` if you want the raw, untranslated bytes):

```
$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi
{"Datetime":"2017-05-05 01:27:51","Message":"This is the Genesis Block of the Filecoin Decentralized Storage Network.","Network":"Filecoin","Token":"Filecoin","TokenAmounts":{"Miners":"1,400,000,000","ProtocolLabs":{"Development":"300,000,000","Foundation":"100,000,000","Fundraising":"200,000,000"},"TotalSupply":"2,000,000,000"}}
```

IPLD paths let us get to specific nodes within this block:

```
$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi/Message
"This is the Genesis Block of the Filecoin Decentralized Storage Network."

$ ipfs dag get bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi/TokenAmounts/ProtocolLabs/Foundation
"100,000,000"
```

Paths will also resolve across block boundaries transparently, where a path segment encounters a Link (CID), the block being linked to is loaded and interpreted in place of the link.

More information about pathing can be found at https://ipld.io/docs/data-model/pathing/

## Selectors

IPLD Selectors are expressions that describe a traversal over an IPLD DAG, and mark ("select") a subset of nodes during that walk. Paths and selectors are related, in that a path can be expressed as a selector and it traverses to a single, specific node in a graph. Selectors allow for the traversal and "selection" of multiple parts of an IPLD graph.

You can think of Selectors as roughly like regexps, but made for IPLD graphs.

Selectors are expressed as IPLD data, we typically document them as a DAG-JSON form; although their terseness do not exactly lend readability. A DSL for expressing them in a more readable form is a work in progress.

A very common selector is the "Explore All Recursively": `{"R":{"l":{"none":{}},":>":{"a":{">":{"@":{}}}}}}`.

This selector instructs a traversal to: **Explore all nodes of a graph recursively, **_**without limit**_. This selector is primarily useful if you are interested in watching which _blocks_ a traversal will load during its exploration—those blocks and their load order provide a stable sequence of all blocks in the entire DAG starting from the root where the traversal began. This exhaustive walk, with deterministic block ordering has many useful applications, including storage deal-making in Filecoin.

A close relative of the "Explore All Recursively" is the "Match All Recursively": `{"R":{"l":{"none":{}},":>":{"|":[{".":{}},{"a":{">":{"@":{}}}}]}}}`.

This selector adds a **Match** to the previous selector, such that the traversal engine will identify every single node (point) in the graph. This will not only load all the connected blocks in the graph, but emit every single decoded value it can find, in a deterministic order. This exhaustive matching selector can be very noisy and may not be useful for very large graphs, but the concept of "matching" is important to finding and extracting specific elements of data in a graph.

Paths, when translated to selectors, _explore_ along named edges of a graph and then _match_ the end point (which may or may not be a terminal in the graph).

Selectors are a relatively new technology, but are becoming an increasingly important tool in the IPFS and Filecoin stack; particularly for establishing a deterministic method for multiple parties to describe part, or all of a graph of data.

* [Graphsync](https://ipld.io/specs/transport/graphsync/) uses selectors to synchronize part, or all of an IPLD graph of blocks between two peers.
* Filecoin uses selectors for storage deal-making, with clients describing the extent of their DAG within a storage deal. It also uses selectors for retrieval; with clients able to request a specific sub-graph of IPLD blocks from a root within a deal.

Selectors are described in detail in the [specification](https://ipld.io/specs/selectors/).

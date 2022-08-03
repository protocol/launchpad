---
description: Mutable content in IPFS
---

## Mutable Content
One of the most powerful things about IPFS is that any piece of data or content you store on the network cannot be modified with changing the [Content Identifier (CID)](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipld/content-addressing-and-cids) for that data, since the CID is created (in part) by hashing the content.

The fact that the history of the data are preserved on the blockchain - that is, the content in one block contains, as a part of the data that makes it up, the id of the parent of that block - also contributes to the immutability of that piece of data.

### Pinning and Immutability
Data on IPFS will not by default remain on that network unless it is pinned. In order to make a piece of data a persistent piece of data, you need to make sure that data is pinned on a node that is active on the IPFS network.

Your options for persistent data are:
1. You pin it yourself, and keep that node active on the network
2. You make an agreement with a [pinning service](https://docs.ipfs.io/concepts/persistence/#pinning-services) and pay them to make sure your data persists in long-term storage.

![Pinning IPFS](<../../.gitbook/assets/pinning.png>)

#### Mutable Content | ResNetLabs on Tour – David Dias
_See the full set of resources [on the ResNetLab Tutorials page](https://research.protocol.ai/tutorials/resnetlab-on-tour)_

{% embed url="https://www.youtube.com/watch?v=57guoGS53Bo&t=12s" %}

## The Inter Planetary Name System (IPNS)

Since IPFS uses CIDs, if you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content.

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating an address that can be updated. IPNS addresses a very important point; to help bridge the unfamiliarity gap to a new internet. For example, when you go to a users' profile on a social media site today, you expect to find it with the same link or URL in the future. And if there are any updates, then you expect to see those updates as well. IPNS builds on top of IPFS, by giving you a "username"; when someone asks for your username, they'll receive the most up-to-date content you published on IPFS. If you change your username, you are generating a brand new CID and by extension you are creating a brand new online profile.

In IPNS, these user identifiers are not called usernames, rather, they are called _name_'s. A _name_ is the [hash](https://docs.ipfs.io/concepts/hashing/) of a public key. It is associated with a _record_ containing information about the CID it links to that is signed by the corresponding private key. New records can be signed and published at any time.

When looking up an IPNS address, use the `/ipns/` prefix:

```
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```

### Deep: Into IPNS

IPNS is a self-certifying mutable pointer. Meaning any name that gets published is signed by a private key and anyone else can verify that it was signed by that peer with just the _name_. This self-certifying nature gives IPNS a number of super-powers not present in consensus systems (DNS, blockchain identifiers, etc.), some notable ones include: mutable link information can come from anywhere, not just a particular service/system, and it is to confirm a link is authentic. IPNS introduces a new data structure to IPFS called a _Record_. This gives you added functionality of controlling expiration of some CID content and version numbering. This is what an IPNS object contains:

- 1. **Value** (bytes)
  - It can be any path, such as a path to another IPNS record, a `dnslink` path (eg. `/ipns/example.com`) or an IPFS path (eg. `/ipfs/Qm...`)
- 2. **Validity** (bytes)
  - Expiration date of the record using [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) with nanoseconds precision.
  - Note: Currently, the expiration date is the only available type of validity.
- 3. **Validity Type** (uint64)
   - Allows us to define the conditions under which the record is valid.
   - Only supports expiration date with `validityType = 0` for now.
- 4. **Signature** (bytes)
  - Concatenate value, validity field and validity type
  - Sign the concatenation result with the provided private key
  - Note: Once we add new validity types, the signature must be changed. More information on [ipfs/notes#249](https://github.com/ipfs/notes/issues/249)
- 5. **Sequence** (uint64)
  - Represents the current version of the record (starts at 0)
- 6. **Public Key** (bytes)
  - Public key used to sign this record
  - Note: The public key **must** be included if it cannot be extracted from the peer ID (reference [libp2p/specs#100](https://github.com/libp2p/specs/pull/100/files)).
- 7. **ttl** (uint64)
  - A hint for how long the record should be cached before going back to, for instance the DHT, in order to check if it has been updated.

These records are stored locally, as well as spread across the network, in order to be accessible to everyone. For storing this structured data, we use [Protocol Buffers](https://github.com/google/protobuf), which is a language-neutral, platform neutral extensible mechanism for serializing structured data.

```
message IpnsEntry {
	enum ValidityType {
		// setting an EOL says "this record is valid until..."
		EOL = 0;
	}
	required bytes value = 1;
	required bytes signature = 2;
	optional ValidityType validityType = 3;
	optional bytes validity = 4;
	optional uint64 sequence = 5;
	optional uint64 ttl = 6;
	optional bytes pubKey = 7;
}
```

#### How it works

* Publishing - When you first publish something with IPNS. You are creating a brand new record, you are entering a CID to point to, and signing the record to establish you are the owner and certify the results. This gets publish to your local datastore, then the DHT.
* Republishing - On each update to a record, you have to first find the record you are updating, then create a brand new record based off that information. You update the `sequence` number (add 1), update the `value` (with new CID), re-sign the `signature` field, and refill the other options.
* Searching - Kubo uses the DHT to find peers that will have the queried record. This method has gotten faster over the years, but is still generally slow to reslove a name.
* Validity - A record is only valid for 24 hrs, but you can change its `validity` to be longer. When someone has your record, but it is expired, they will have to go to their DHT to find your address and grab the latest valid version of your record. Issues with validity don't arise if you're the original publisher of a record. Kubo will automatically republish your record on your local node to keep it alive if you are online.
* Keys - A _name_ is the hash of a public key pair. This key pair is the libp2p-key used in Kubo for identifying a peer (peerID). So in actuality, when you're searching for a name, you are searching for a shortened and case-insensitive version of a specific peerID. This is possible because names are in [base 36 (k)](https://github.com/multiformats/multibase/blob/master/rfcs/Base36.md) and this base encoding enables support for querying content through browser gateways like [ipfs.io/ipns/k51...](https://ipfs.io)

#### Common Pitfalls
* IPNS on DHT is slow. This is due to having the `sequence` number in a record. If there are multiple versions of a name, then you want to make sure that you have the latest version. And you do this by searching through the DHT for peers that hold your record and checking the version number for the latest one.
* Another issue with the DHT is that after so much content has been added to it, it will take longer and longer to resolve your record over time. Assuming the garbage collector hasn't already removed it. It is not uncommon for IPNS to return you nothing when fetching a record.
* Users trying to use IPNS from JavaScript in web browsers run into a variety of issues here related to how web browsers are isolated from the p2p network due to transport restrictions. To get around this problem, you would delegate the work out to a local or remote node.
* Currently, there is no way to keep someone elses record alive/valid. This is unfortunate because you may want to keep the original record alive on your node. That way others can also come to you for a valid record and thus expand longterm record discovery.
* If third party republishing was possible, the issue of "sequence number collision" would occur. This would be when two people updating a record have the same `sequence` number, but different CIDs. How would anyone know which one is correct?
* To authorize third party republishing, you would share your private key with someone else. They would `ipfs key import` it into their node and could start keeping your record alive aswell. But now they also have full permissions to impersonate you and act maliciously.
* Safe Vs. Old problem. This is a question around practicality on IPNS content. If I accidentally let my record expire, do I want my users to fetch and resolve the data anyways (aka serve **old** data) or not at all (**safe**). Currently, the default is to be safe, and not serve any data. This is an ongoing and situational conversation you can [read up on it on github](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606)


Sources: [Overview of IPNS by Adin](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff#0963fe6b470a4c55b1929146c360dc95), [IPNS Spec](https://github.com/ipfs/specs/blob/main/IPNS.md)

### Pubsub + IPNS

IPNS [solves the issue of creating constant links to content](https://blog.fleek.co/posts/immutable-ipfs) that may be updated, and provides the 'new' link to content that you want to share with others. IPNS uses public-link cryptography to assign a link to the content you created on IPFS.

There are a couple of ways you can link to the content you are sharing, either using DNSLink to link using the DNS addressing system, or a truly decentralized solution such as ENS that will help maintain a constant link to the most updated version of a piece of content.

**Pubsub** Makes it possible for users to share the content with the peers that wish to subscribe to it & delivers messages throughout a decentralized network. Read more in the [libp2p docs](https://docs.libp2p.io/concepts/publish-subscribe/).
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

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating an address that can be updated.

A _name_ in IPNS is the [hash](https://docs.ipfs.io/concepts/hashing/) of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

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
* Keys - A _name_ is the hash of a public key pair. This key pair is the libp2p-key used in Kubo for identifying a peer (peerID). So in actuality, when you're searching for a name, you are searching for a shortened and case-insensitive version of a specific peerID. This is possible because names are in base k... and this base encoding enables support for searching for content through gateways like ipfs.io/

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

<!--
## Tutorial: Example IPNS Setup with CLI

1. Start your IPFS daemon, if it isn't already running:

   ```
   ipfs daemon
   ```

1. Create the file that you want to set up with IPNS. For the tutorial, we're just going to create a simple _hello world_ file:

   ```
   echo "Hello IPFS" > hello.txt
   ```

1. Add your file to IPFS:

   ```
   ipfs add hello.txt

   > added QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG hello.txt
   > 11 B / 11 B [=====================================================] 100.00%
   ```

   Take note of the `Qm` hash output by IPFS.

1. Use `cat` and the `Qm` hash you just got from IPFS to view the file again:

   ```
   ipfs cat QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

   > Hello IPFS
   ```

1. Publish your `Qm` hash to IPNS:

   ```
   ipfs name publish /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG
   ```

   `k51...` is the key of your IPFS installation.

1. You can view your file by going to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew`:

   ```
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello IPFS
   ```

1. Make a change to your file, add it to IPFS, and update your IPNS:

   ```
   echo "Hello again IPFS" > hello.txt
   ipfs add hello.txt

   > added QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW hello.txt
   > 17 B / 17 B [=====================================================] 100.00%

   ipfs name publish QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW

   > Published to k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew: /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
   ```

1. You can now go back to `https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew` to view your updated file using the same address:

   ```
   curl https://gateway.ipfs.io/ipns/k51qzi5uqu5dkkciu33khkzbcmxtyhn376i1e83tya8kuy7z9euedzyr5nhoew

   > Hello again IPFS
   ```

You can view the `Qm` hash of the file associated with your `k5` key by using `name resolve`:

```
ipfs name resolve

> /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
```

To use a different `k5` key, first create one using `key gen test`, and use the `--key` flag when calling `name publish`:

```
ipfs key gen SecondKey

> k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl

ipfs name publish --key=SecondKey /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW

> Published to k51qzi5uqu5dh5kbbff1ucw3ksphpy3vxx4en4dbtfh90pvw4mzd8nfm5r5fnl: /ipfs/QmaVfeg2GM17RLjBs9C4fhpku6uDgrEGUYCTC183VrZaVW
```

### Example IPNS Setup with JS SDK API

Imagine you want to publish your website under IPFS. You can use the [Files API](file-systems.md#mutable-file-system-mfs) to publish your static website, and then you'll get a CID you can link to. But when you need to make a change, a problem arises: you get a new CID because you now have different content. And it is not possible for you to be always giving others a new address.

Here's where the Name API comes in handy. With it, you can create a single, stable IPNS address that points to the CID for the latest version of your website.

```javascript
// The address of your files.
const addr = '/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp'

ipfs.name.publish(addr).then(function (res) {
  // You now receive a res which contains two fields:
  //   - name: the name under which the content was published.
  //   - value: the "real" address to which Name points.
  console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
})
```

In the same way, you can republish a new version of your website under the same address. By default, `ipfs.name.publish` will use the Peer ID.

### Alternatives to IPNS

IPNS is not the only way to create mutable addresses on IPFS. You can also use [DNSLink](dnslink.md), which is currently much faster than IPNS and also uses human-readable names. Other community members are exploring ways to use blockchains to store common name records.

## DNS Link
_This is an [annotated version of this doc](https://docs.ipfs.io/concepts/dnslink/)_

DNSLink uses [DNS `TXT` records](https://en.wikipedia.org/wiki/TXT_record) to map a DNS name, like [`ipfs.io`](https://ipfs.io), to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS. Since DNSLink uses DNS records, you can assign names, paths, and sub-domains that are easy to type, read, and remember.

A DNSLink address looks like an [IPNS](ipns.md) address, but it uses a DNS name in place of a hashed public key:

```
/ipns/example.org
```

Just like normal IPFS addresses, they can include links to other files — or other types of resources that IPFS supports, like directories and symlinks:

```
/ipns/example.org/media/
```

### Publish Content Path

Publish the mapping as DNS `TXT` record using your hostname prefixed with `_dnslink`.

This not only makes DNSLink lookup more efficient by only returning relevant `TXT` records but enables you to improve the security of an automated setup or delegate control over your DNSLink records to a third party without giving away complete control over the original DNS zone.

For example, [`docs.ipfs.io`](https://docs.ipfs.io) loads because a `TXT` record exists for `_dnslink.docs.ipfs.io`. If you look up the DNS records for `_dnslink.docs.ipfs.io`, you'll see the DNSLink entry:

```
dig +noall +answer TXT \_dnslink.docs.ipfs.io
> \_dnslink.docs.ipfs.io. 30 IN TXT "dnslink=/ipfs/bafybeieenxnjdjm7vbr5zdwemaun4sw4iy7h4imlvvl433q6gzjg6awdpq"

```

### Resolve DNSLink name

When an IPFS client or node attempts to resolve an address, it looks for a `TXT` record that is prefixed with `dnslink=`. The rest can be an `/ipfs/` link (as in the example below), or `/ipns/`, or even a link to another DNSLink.

```

dnslink=/ipfs/<CID for your content here>

```

For example, let's go back to when we looked up the DNS records for `_dnslink.docs.ipfs.io` and saw its DNSLink entry:

```sh
$ dig +noall +answer TXT _dnslink.docs.ipfs.io
_dnslink.docs.ipfs.io.  34  IN  TXT "dnslink=/ipfs/QmVMxjouRQCA2QykL5Rc77DvjfaX6m8NL6RyHXRTaZ9iya"
```

Based on that, this address:

```
/ipns/docs.ipfs.io/introduction/
```

Will get you this block:

```
/ipfs/QmVMxjouRQCA2QykL5Rc77DvjfaX6m8NL6RyHXRTaZ9iya/introduction/
``` -->

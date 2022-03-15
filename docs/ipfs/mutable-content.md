---
description: Mutable content in IPFS
---

## Mutable Content
One of the most powerful things about IPFS is that any piece of data or content you store on the network cannot be modified with changing the [Content Identifier (CID)](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipld/content-addressing-and-cids) of that piece of content, because the content identifier is created in part by hashing the content.

The fact that data is also created on the blockchain - that is, the content in one block contains, as a part of the data that makes it up, the id of the block of content that is the parent of that block - also contributes to the immutability of that piece of data.

### Pinning and Immutability
Data on IPFS will not by default remain on that network unless it is pinned. In order to make a piece of data a persistent piece of data, you either need to make sure that data is pinned on a node that is active on the IPFS network.

Your options for persistent data are:
1. You pin it yourself, and keep that node active on the network
2. You make an agreement with a [pinning service](https://docs.ipfs.io/concepts/persistence/#pinning-services) and pay them to make sure your data persists in long-term storage.

#### Mutable Content | ResNetLabs on Tour – David Dias

{% embed url="https://www.youtube.com/watch?v=57guoGS53Bo&t=12s" %}

_This is an [copy of the tutorial on ResNetLab Tutorials](https://research.protocol.ai/tutorials/resnetlab-on-tour/mutable-content/)_

## The InterPlanetary Name System
_This is an [annotated version of this doc](https://docs.ipfs.io/concepts/ipns/)_

<!-- What can be kept in? Removed? -->

Since IPFS uses [content-based addressing](content-addressing.md), if you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content.

The InterPlanetary Name System (IPNS) solves this issue by creating an address that can be updated.

A _name_ in IPNS is the [hash](hashing.md) of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.

When looking up an IPNS address, use the `/ipns/` prefix:

```
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```
### Pubsub + IPNS
<!-- Add a paragraph  -->
<!-- Check with Lidel if this content moved from the dht.md page is a good enough summary -->

This is a [summarized version of the description here by Fleek](https://blog.fleek.co/posts/immutable-ipfs)

With IPFS, when you change even the slightest bit of content in a given file, say, a webpage, there is a new hash or CID generated. Once you change it, it's impossible to point to the updated bit of content.

IPNS solves the issue of creating constant links to content that may be updated, and provides the 'new' link to content that you want to share with others. IPNS uses public-link cryptography to assign a link to the content you created on IPFS.

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

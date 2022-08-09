---
description: Mutable content in IPFS
---

## Mutable Content
One of the most powerful things about IPFS is that any piece of data or content you store on the network cannot be modified without changing the [Content Identifier (CID)](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipld/content-addressing-and-cids) for that data, since the CID is created (in part) by hashing the content. There are various ways to create mutable data on top of IPFS and in this lesson we will learn what just a few of them are.

### Pinning and Immutability

By default, content on IPFS is not _pinned_. That means when you add a file to IPFS, it will eventually stop being discoverable on the network. To mitigate this problem you must _pin_ your content to your [node](https://docs.ipfs.tech/concepts/nodes/#nodes) to ensure it persistents on IPFS. 

Your options for pinning content are:
1. You pin it locally to your own node. Note that if the content is only pinned to your local node, it must be online for peers to get that content.
2. You use a [pinning service](https://docs.ipfs.io/concepts/persistence/#pinning-services). Some pinning services require payment for their services, others offer a [free storage allowance for new users](https://docs.ipfs.tech/concepts/persistence/#ipfs-filecoin-solutions).


![Pinning IPFS](<../../.gitbook/assets/pinning.png>)

### Mutable Content | ResNetLabs on Tour – David Dias
_See the full set of resources [on the ResNetLab Tutorials page](https://research.protocol.ai/tutorials/resnetlab-on-tour)_

{% embed url="https://www.youtube.com/watch?v=57guoGS53Bo" %}

## The InterPlanetary Name System (IPNS)

Since IPFS uses CIDs, if you were to share an IPFS address such as `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp` with someone, you would need to give the person a new link every time you update the content.

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating a link that can be updated. IPNS addresses a very important point, to help bridge the unfamiliarity gap to a new internet. For example, when you go to a users' website, you expect to find that same website with the same link or URL in the future. If that website is updated, you will see those updates as well. This "link" in IPNS is called a _name_, this _name_ is the hash of a public key. The name is associated with a record containing information about the hash that it points to and is signed by the public key’s corresponding private key. This allows new records to be signed and published at any time. Using IPNS means that when someone searches for your website using your _name_, they will receive the most up-to-date content as expected in today's internet. You can learn more about IPNS and [how to use it here](https://docs.ipfs.tech/concepts/ipns/#example-ipns-setup-with-cli). 

When looking up an IPNS _name_, use the `/ipns/` prefix:

```
/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd
```

### Deep Dive into IPNS

IPNS is a self-certifying mutable pointer. Meaning any name that gets published is signed by a private key and anyone else can verify that it was signed by that peer with just the _name_. This self-certifying nature gives IPNS a number of super-powers not present in consensus systems (DNS, blockchain identifiers, etc.), some notable ones include: mutable link information can come from anywhere, not just a particular service/system, and it is very fast and easy to confirm a link is authentic. IPNS introduces a new data structure to IPFS called a _Record_. This gives you added functionality of controlling expiration of some CID content and version numbering. Checkout the [IPNS spec](https://github.com/ipfs/specs/blob/main/IPNS.md#ipns-record) to learn more about records.

#### How it works

* Publishing - When you first publish something with IPNS. You are creating a brand new record, you are entering a CID to point to, and signing the record to establish you are the owner and certify the results. This gets publish to your local datastore, then the DHT.
* Republishing - On each update to a record, you have to first find the record you are updating, then create a brand new record based off that information. You update the `sequence` number (add 1), update the `value` (with new CID), re-sign the `signature` field, and refill the other options.
* Searching - Kubo uses the DHT to find peers that will have the queried record. This method has gotten faster over the years, but is still generally slow to reslove a name.
* Validity - A record is valid for 24 hours by default, but you can change its `validity` to be longer. When someone has your record, but it is expired, they will have to go to their DHT to find your address and grab the latest valid version of your record. Issues with validity don't arise if you're the original publisher of a record. Kubo will automatically republish your record on your local node to keep it alive if you are online.
* Keys - A _name_ is the hash of a public key in a key pair. The public key is used by Kubo for identifying your peer (peerID). You can generate new sets of keys with Kubo and use them create different IPNS records. 

#### Common Pitfalls
* IPNS on DHT is slow. This is due to having the `sequence` number in a record. If there are multiple versions of a name, then you want to make sure that you have the latest version. And you do this by searching through the DHT for peers that hold your record and checking the version number for the latest one.
* Another issue with the DHT is that after so much content has been added to it, it will take longer and longer to resolve your record over time. Assuming the garbage collector hasn't already removed it. It is not uncommon for IPNS to return you nothing when fetching a record.
* Users trying to use IPNS from JavaScript in web browsers run into a variety of issues here related to how web browsers are isolated from the p2p network due to transport restrictions. To get around this problem, you would delegate the work out to a local or remote node.
* Currently, there is no way to revalidate someone elses record to keep it from expiring. You **are** able to re-provide someone elses record, but it will only be valid for as long as the original publisher specified in the `lifetime` field of their record. 
* When users force third party republishing by sharing private keys, the issue of ["sequence number collision"](https://discuss.ipfs.tech/t/ipns-beyond-the-basics-no-ipns-pinning-service-any-docs-on-this/13424/2) would occur (among various others). This would be when two people updating a shared record have the same `sequence` number, but different CIDs. How would a receiver of said record know which one is correct?
* Safe Vs. Old problem. This is a question around practicality on IPNS content. If I accidentally let my record expire, do I want my users to fetch and resolve the data anyways (aka serve **old** data) or not at all (**safe**). Currently, the default is to be safe, and not serve any data. This is an ongoing and situational conversation, you can [read about it on GitHub](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606)

Sources: [Overview of IPNS by Adin](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff#0963fe6b470a4c55b1929146c360dc95), [IPNS Spec](https://github.com/ipfs/specs/blob/main/IPNS.md), [Discuss forum for IPFS](https://discuss.ipfs.tech/t/how-do-i-make-my-ipns-records-live-longer/14768/17?u=lidel)


### DNSLink

DNSLink leverages the powerful distributed architecture of DNS for a variety of systems that require internet scale mutable names or pointers. With DNSLink, you can store an IPNS link using any DNS domain name. This is currently much faster than IPNS and also uses human-readable names. First, put the IPNS name in a TXT record at a specific subdomain. Then, you can resolve the name from any program by looking up the TXT value. Your programs and systems can parse out the record value, and follow the CID wherever it may go. 


**You can follow tutorials and read more at [https://dnslink.dev](https://dnslink.dev/)**


#### Quick explanation of dnslink in IPFS

{% embed url="https://www.youtube.com/watch?v=YxKZFeDvcBs" %}

Source: [Introduction to DNSlink](https://dnslink.dev/#introduction), [IPFS docs on DNSLink](https://docs.ipfs.tech/concepts/dnslink/)


### Pubsub + IPNS

[**Publish/Subsribe (PubSub)**](https://docs.libp2p.io/concepts/publish-subscribe/) is a messaging protocol to quickly communicate with other peers. Whenever one Publishes some content, Subscribing peers will receive it almost instantly. This protocol is not specific to IPFS or IPNS, but to [Libp2p](https://docs.ipfs.tech/concepts/libp2p/); to allow for quick delivery of content over a network of users. For this reason, the two teams got together to bring instant messaging to a system where sharing and receiving content takes too long. With PubSub enabled on IPNS, updates to a record can be shared virtually instantly with subscribers. 

To accomplish IPNS over PubSub, a persistence layer had to be added to the messaging protocol. This was started with the introduction of the [fetch protocol](https://github.com/libp2p/specs/tree/master/fetch). Now when you ask for a name, you are subcribing to that name (called a "topic" in libp2p pubsub), you create a connection with that publisher, then they send you the latest version of the record. The key differentiating factor between IPNS-over-PubSub and IPNS-over-the-DHT (the default behavior) is opening a streaming connection between peers. This way, peers are sending the latest record directly from their local node, as opposed to the default behavior of searching the DHT for the peer with latest version of a record. This means records shared over Pubsub are not available on the DHT and vise versa, unless the publisher opts-in to publish records to both routing options. If you would like to activate IPNS over Pubsub on your Kubo node, you can check out the [UsePubsub option](https://github.com/ipfs/kubo/blob/master/docs/config.md#ipns) in the IPFS config file.


* Source: _We highly recommend watching the [video above](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipfs/mutable-content#the-inter-planetary-name-system-ipns) to learn more about IPNS over PubSub_
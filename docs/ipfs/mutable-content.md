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

The [InterPlanetary Name System (IPNS)](https://docs.ipfs.io/concepts/ipns/#interplanetary-name-system-ipns) solves this issue by creating an link that can be updated. IPNS addresses a very important point, to help bridge the unfamiliarity gap to a new internet. For example, when you go to a users' website, you expect to find that same website with the same link or URL in the future. If that website is updated, you will see those updates as well. IPNS builds on top of IPFS by generating a name, this name is the hash of a public key. The name is associated with a record containing information about the hash that it points to and is signed by the public key’s corresponding private key. This allows new records to be signed and published at any time. Using IPNS means that when someone searches for your website, they will receive the most up-to-date content without the need to share a new link. You can learn more about IPNS and [how to use it here](https://docs.ipfs.tech/concepts/ipns/#example-ipns-setup-with-cli). 

When looking up an IPNS address, use the `/ipns/` prefix:

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
* Currently, there is no way to keep someone elses record alive/valid. This is unfortunate because you may want to keep the original record alive on your node. That way others can also come to you for a valid record and thus expand longterm record discovery.
* If third party republishing was possible, the issue of "sequence number collision" would occur. This would be when two people updating a record have the same `sequence` number, but different CIDs. How would anyone know which one is correct?
* To authorize third party republishing, you would share your private key with someone else. They would `ipfs key import` it into their node and could start keeping your record alive aswell. But now they also have full permissions to impersonate you and act maliciously.
* Safe Vs. Old problem. This is a question around practicality on IPNS content. If I accidentally let my record expire, do I want my users to fetch and resolve the data anyways (aka serve **old** data) or not at all (**safe**). Currently, the default is to be safe, and not serve any data. This is an ongoing and situational conversation, you can [read about it on GitHub](https://github.com/ipfs/kubo/issues/1958#issuecomment-444201606)


Sources: [Overview of IPNS by Adin](https://pl-strflt.notion.site/IPNS-Overview-and-FAQ-071b9b14f12045ea842a7d51cfb47dff#0963fe6b470a4c55b1929146c360dc95), [IPNS Spec](https://github.com/ipfs/specs/blob/main/IPNS.md)

### Pubsub + IPNS

[**Publish/Subsribe (PubSub)**](https://docs.libp2p.io/concepts/publish-subscribe/) is a messaging protocol to quickly communicate with other peers. Whenever one Publishes some content, Subscribing peers will receive it almost instantly. This protocol is not specific to IPNS, but to [Libp2p](https://docs.ipfs.tech/concepts/libp2p/); to allow for quick delivery of content over a network of users. For this reason, the two teams got together to bring instant messaging to a system where sharing and receiving content takes too long. With PubSub enabled on IPNS, updates to a record can be shared virtually instantly with subscribers. 



* _We highly recommend watching the [video above](https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/ipfs/mutable-content#the-inter-planetary-name-system-ipns) if you want to learn more_
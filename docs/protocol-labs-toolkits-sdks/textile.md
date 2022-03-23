---
description: Connecting and Extending PL Projects
---

## Textile
Learn more about textile on the website at [textile.io](https://linktr.ee/textileio) and in the [docs](https://docs.textile.io/)

Textile is designed to connect and extend Libp2p, IPFS, and Filecoin.

Textile’s suite of developer tools, including Powergate, Buckets, and ThreadDB, let developers build meaningful experiences quickly with Web3 protocols like libp2p, IPFS, and Filecoin.

#### Building Web3: Textile and Data Ownership | Filecoin

{% embed url="https://www.youtube.com/watch?v=d1kpID1LSRE" %}

## Powergate

Powergate is an API for deploying hybrid Filecoin and IPFS storage into your stack. Designed for developers who want powerful ways to connect & extend Libp2p, IPFS, and Filecoin. It is a Docker container wrapped around an IPFS node + Filecoin node which allows you to stage, store, and retrieve data, with default configs for miner selection

![Fleek Info](<../../.gitbook/assets/powergate.png>)

### Other Tools

### The Hub
The Hub is your portal to the IPFS network and the fastest way to start building and experimenting with Textile technologies.

[Read More](https://docs.textile.io/hub/)

### Buckets
Buckets are:
* A new way to pin data to IPFS and archive data on Filecoin.
* Dynamic folders published simultaneously over IPFS, IPNS, and HTTP.
* Designed to simplify creating folders of data and pushing that data to remote IPFS peers for backup, persistence, or sharing.

[Read More](https://docs.textile.io/buckets)

### ThreadDB
ThreadDB makes dynamic data on the DWeb easy by providing simple data hosting services and an API familiar to anyone who used MongoDB/Mongoose.

ThreadDB is a secure, decentralized, p2p database built on IPFS and Libp2p.

Spend less time configuring encryption or managing content addresses with ThreadDB.

[Read More](https://docs.textile.io/threads/)


## Other Resources
Join our public Slack, visit our GitHub, follow us on Twitter, and check out the Blog!

[Read More](https://docs.textile.io/powergate/) | [On Github](https://github.com/textileio/powergate/)


## Filecoin Interview with Andrew Hill

**What tools are you building for the Filecoin network?**
Textile started as a tool to focus on how existing systems can plug into Filecoin to use it to store data directly from their systems in the Filecoin network, and then retrieving that data later. That sounds pretty basic, but in reality, we’re building an abstraction to the Filecoin node that does a bunch of management about the data that you are adding to the node, creating yields to store that data, tracking the progress of those yields, and then ensuring that those yields remain online.

Our Filecoin suite of tools lets app developers store data on Filecoin and gives them APIs to plug into the platforms they’ve already built. Our tools package up Filecoin and give you a bunch of standard APIs for managing sort of the whole lifecycle of data in your Filecoin wallet. What we want to do is show how easy it is for application-side developers using our system to jump on and start testing data storage.

**What’s Textile’s vision for the web in the next decade?**

We see ourselves in an exciting position related to Web3. At Textile, our focus is on interoperability, so we believe there is a role to play between the two worlds by bridging Web3 networks and Web2 systems. When Web3 technologies want to make use of valuable resources from the traditional web (e.g., DNS, REST APIs, RSS to name a few), Textile can help. Likewise, when Web2 technologies want to tap into the value of Web3 (e.g., secure storage, censorship resistance, trustless transactions), Textile can help. Filecoin is an amazing example where we can add value by making the network more useful to all the systems that already exist.

[Read more on this blog](https://filecoin.io/blog/posts/meet-andrew-hill/)

#### Getting Started with Filecion (Using Textile & Powergate) | ETHGlobal – Andrew Hill

A workshop for beginners and intermediate developers with Andrew Hill of Textile. This is for anyone who understands the basics and wants to build something now.

{% embed url="https://www.youtube.com/watch?v=SePJrCLUM0g" %}

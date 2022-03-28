---
description: Incentivization and Storage Providers
---

## The Filecoin Economy

The protocol underlying Filecoin pushes network participants toward behavior that is beneficial for the network.

For most blockchain protocols, miners are incentivized to do work that record ledger transactions and do the proof of work required to move the blockchain forward. Filecoin is different in how it requires providers to do both this, as well as provide immutable storage for the network, which is why we call them **Storage Providers** instead of miners.

The Filecoin network will have [multiple types of providers](https://docs.filecoin.io/storage-provider/how-providing-works/#types-of-provider).

### Proofs and Sealing

**Sealing** is the process of formatting and storing data in sectors on Filecoin.

Since Filecoin exists to incentivize storage on the network, there are certain proofs that storage provides must verify to meet the requirements for **[Proof of Storage (PoS)](https://spec.filecoin.io/algorithms/pos/)**, called called **Proof of Replication (PoRep)** at the beginning of the deal, when the data is first stored, and **Proof of Spacetime (PoSt)** continually over the lifetime of a deal to verify that storage space is dedicated to a piece of data.

While that data is being sealed and stored, several content identifiers are produced such as CommR, CommD, and more, which you can read about in the [ProtoSchool tutorial](https://proto.school/verifying-storage-on-filecoin/03).

### [Storage Providers (Miners)](https://docs.filecoin.io/storage-provider/how-providing-works)

* Anyone with the [minimum required hardware](https://docs.filecoin.io/storage-provider/hardware-requirements/) can create a storage miner
* Miners do not earn rewards until they onboard a minimum amount of sealed storage to the network
* Deals are made trustlessly between a client and a provider
* There are incentive structures such as _power_ that allow providers to earn Filecoin through _storage fees_ and _block rewards_. [More on provider rewards](https://docs.filecoin.io/storage-provider/storage-provider-rewards/#storage-fees)

There are several special mechanisms that Filecoin blockchain implements, such as rewarding storage providers with a _power_ value that increases a provider's chance of being a block provider. The network also empowers clients through [Filecoin Plus](https://plus.fil.org/), a community-governed notary program that allows approved clients to make special storage deals that give their providers additional _power_.

#### Filecoin Economy Deep Dive | Filecoin Foundation – ZX Zhang

In this video, Zixuan Zhang explains how filecoin mining is like Airbnb for the data on the internet. Get a better understanding of the industry, the economy, the storage services, power, Filecoin content delivery, and more.

{% embed url="https://www.youtube.com/watch?v=MbLyVt2rISQ" %}

## Blog Posts & Papers
* [Filecoin Network Economics](https://filecoin.io/blog/posts/filecoin-network-economics/)
* [Introducing the Filecoin Economy](https://filecoin.io/blog/posts/introducing-the-filecoin-economy/)
* [Engineering Filecoin's Economy (Paper)](https://filecoin.io/2020-engineering-filecoins-economy-en.pdf)

![Filecon Economy Diagram](<../../.gitbook/assets/Fil_Econ_Digram.png>)


### Cryptoeconomics Deep Dives (Optional)

{% embed url="https://youtu.be/VvUhitKaYWY" %}

{% embed url="https://youtu.be/O0SHgksn1AI" %}

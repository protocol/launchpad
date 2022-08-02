---
description: Add the subtitle here
---

# The Filecoin Protocol

The Filecoin Protocol is a complex and ever evolving technology that involves mining, sealing and proving, consensus, and much more. In this section you will get an overview of the process that occurs to create the Protocol which includes both a _decentralized storage market_ (the storing of data on filecoin storage providers) and a _storage based consensus_, the process of mining Filecoin blocks.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FdJC0yfHL6n4VMktmNXWq%2Fuploads%2F9pAg4DeJpIPYM1f2YYOB%2Fimage.png?alt=media\&token=e8d41405-726d-4712-935d-32772618e21f)

#### Sealing & Proving new Sectors | Filecoin Encode Club
This video is an overview of the general mining process, as well as the data sealing and proving process. This video also touches on aspects of Lotus (the main Filecoin implementation) and the architecture you would set up if you were to set up a simple Filecoin Storage Provider (miner).

{% embed url="https://youtu.be/Nmw66GZyf48" %}

#### Filecoin Specs & Resources

* [Filecoin Docs](https://docs.filecoin.io/)
* [Filecoin Spec](https://spec.filecoin.io/)
* [Lotus Docs](https://lotus.filecoin.io/)
* [Lotus versioning scheme](https://github.com/filecoin-project/lotus/discussions/7053)​
* [Piece logistics](https://spec.filecoin.io/#section-systems.filecoin\_files.piece)​
* [Consensus](https://spec.filecoin.io/#section-algorithms.expected\_consensus)
* [Deal-making](https://spec.filecoin.io/#section-systems.filecoin\_markets.storage\_market.deal-flow)
* [VM & Actors](https://spec.filecoin.io/#section-systems.filecoin\_vm)​
* [System (builtin) actors](https://spec.filecoin.io/#section-systems.filecoin\_vm.sysactors)​
* [Filecoin Virtual Machine](http://fvm.filecoin.io)​
 (WIP for user-defined actors)

## Deep Dive into the Filecoin Protocol
In order to understand the nuances of the Filecoin protocol, there are several concepts you should be familiar with, including:
* [Data structures: Linked lists, hash tables, and trees](https://medium.com/@limichelle21/5-data-structures-in-5-minutes-7f4b34d00b8e)
* [Hash pointers](http://learningspot.altervista.org/hash-pointers-and-data-structures/)
* [Actor-based concurrent computing](https://en.wikipedia.org/wiki/Actor_model)
* [Merkle trees](https://hackernoon.com/merkle-trees-181cb4bc30b4)

#### How Filecoin Actors Work | Zenground0 – Protocol Labs

This talk given in July of 2022 takes a deep dive into the Actors that make up the computational model of the Filecoin protocol. Filecoin actors are hard-coded programs that run concurrently (as opposed to linear, stack based computing) on a blockchain.

Learn about why Filecoin uses actors, the different types of actors and what the current 11 Filecoin actors do, and understand the upgrades that have occured since mainnet launch. As the [Filecoin Virtual Machine (FVM) is developed](https://fvm.filecoin.io/#roadmap-4), the capabilities of Filecoin actors will greatly expand along with the potential for the Filecoin Protocol, by decoupling adding functionality from protocol upgrades and allowing for independent user actors.

{% embed url="https://youtu.be/9JbwbTPonv0" %}

#### How the Filecoin Protocol Works | Part 1 - Nicola

In this talk by led by Nicola or Protocol Labs, he discusses the basics of Filecoin as a storage market & a consensus. This section covers an introduction to the series, the blockchain basics, as well as Filecoin Virtual Machine (FVM) components.

{% embed url="https://youtu.be/tE4q_Vc8OjY" %}

<details>

<summary>How Filecoin Works Part 1</summary>

* Introduction to the Filecoin Products 0:00:31
* The Filecoin Blockchain: Basics of Mining & Messages 0:01:54
  * Filecoin Messages 0:02:05
  * Epochs 0:03:04
  * The Filecoin Virtual Machine 0:05:54
* FVM Components: Actors, Addresses, State, & Execution 0:07:35
  * Actors 0:08:19
  * Addresses 0:09:55
  * Actor Methods 0:12:35
  * The Execution Model 0:14:56

<details>



<!-- #### How Filecoin Actors Work | Zenground0

In this talk, learn about the capabilities of Filecoin Actors. _Note this link is private and you should ping maintainers for access_

{% embed url="https://drive.google.com/file/d/1YhJ7a-BnuPl0OOUxV_2ZV6ayxb7TFyi6/view?usp=sharing" %} -->

<!-- ### Storage Provider Resources (Optional)

{% embed url="https://youtu.be/XlqW3LrN578" %}

Mining Filecoin from a Storage Provider perspective -->

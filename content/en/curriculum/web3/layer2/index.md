---
title: "Layer 2s"
description: "An overview of some basics concepts in Layer 2."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 90
level:
  - shallow
  - deep
---

## Overview

A Layer-1 network refers to a blockchain (ie: Bitcoin, Ethereum), while a
Layer-2 protocol is a third party integration that can be used in conjunction
with a Layer-1 blockchain in order to improve scalability and efficiency.
Layer-2 solutions essentially work by taking transactional burden from Layer-1
networks. By abstracting the majority of processing to an auxiliary
architecture, the main blockchain becomes less congested and more scalable.

Examples of Layer-1 Scaling solutions: -Sharding: Sharding splits the network
into multiple pieces called “shards” to reduce network congestion -Examples of
Layer-2 Scaling solutions: -Rollups: Rollups are solutions that perform
transaction execution outside the main Ethereum chain (layer-1) but post
transaction data on layer-1 (largely the favored layer 2 solution) -Sidechains:
A sidechain is a separate blockchain that is attached to its parent blockchain
using a two-way peg -State Channel: State channels allow two-way communication
between participants of the blockchain to take place (by locking up a part of
the blockchain state)

## Rollups

Rollups are solutions that perform transaction execution outside the main
Ethereum chain (layer 1) but post transaction data on layer 1. As transaction
data is on layer 1, rollups are secured by layer 1. Inheriting the security
properties of layer 1 while performing execution outside of layer 1 is a
defining characteristic of rollups.

There are two types of rollups:

- Optimistic Rollups: assumes transactions are valid by default and only runs
  computation, via a fraud proof, in the event of a challenge
- Zero-knowledge(Zk) Rollups: runs computation off-chain and submits a validity
  proof to the chain

“In general, my own view is that in the short term, optimistic rollups are
likely to win out for general-purpose EVM computation and ZK rollups are likely
to win out for simple payments, exchange and other application-specific use
cases, but in the medium to long term ZK rollups will win out in all use cases
as ZK-SNARK technology improves.”

Vitalik Buterin, An Incomplete Guide to Rollups

### Optimistic Rollups

Optimistic rollups sit in parallel to the main Ethereum chain on layer 2.
Optimistic rollups don't do any computation by default; instead, after a
transaction, they propose the new state to Mainnet or "notarize" the
transaction. As computation is the slow, expensive part of using Ethereum,
Optimistic rollups can offer up to 10-100x improvements in scalability dependent
on the transaction.

How do Optimistic Rollups work?

1. Transactions sent to the rollup contracts are received on layer 2 by
   Sequencers Sequencers respond with a signed receipt pledging to accurately
   execute and order the received transaction, and are rewarded; Sequencers are
   also required to stake funds that will be slashed if they act maliciously.
2. If someone suspects fraud, they can prove it by alerting an adjudicator
   contract on the Ethereum mainnet, which is able to verify the validity of the
   results produced by the Sequencer using the OVM
3. The offending sequencer will be slashed, and some of the slashed funds will
   be rewarded to the whistleblower.
4. Examples of Optimistic Rollups: [Optimism](https://www.optimism.io/),
   [Arbitrum](https://offchainlabs.com/)

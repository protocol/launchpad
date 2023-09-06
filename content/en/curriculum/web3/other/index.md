---
title: "Other Blockchains"
description: "An overview of some other blockchains."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 100
level:
  - shallow
  - deep
---

## Solana

Fast + Low cost

Token: SOL ![Solana](solana.png)

Central to Solana's scaling solution is a decentralized clock titled
Proof-of-History (PoH), built to solve the problem of time in distributed
networks in where there is not a single, trusted, source of time. By using
Verifiable Delay Functions, PoH allows each node to locally generate timestamps
with SHA256 computations. This eliminates the need for the broadcasts of
timestamps across the network, improving overall network efficiency.

Proof of History is one of the [“8 innovations that make Solana the first
web-scale
blockchain,”](https://medium.com/solana-labs/7-innovations-that-make-solana-the-first-web-scale-blockchain-ddc50b1defda)
all eight of which are:

- Proof of History (POH)— a clock before consensus;
- Tower BFT — a PoH-optimized version of PBFT;
- Turbine — a block propagation protocol;
- Gulf Stream— Mempool-less transaction forwarding protocol;
- Sealevel — Parallel smart contracts run-time;
- Pipelining — a Transaction Processing Unit for validation optimization
- Cloudbreak— Horizontally-Scaled Accounts Database; and
- Archivers — Distributed ledger storage

## Avalanche

Low barrier-to-entry and EVM compatible.

Token: AVAX ![Avalanche](avalanche.png)

Avalanche differentiates itself through its creation of a new consensus family
known as “Avalanche consensus.” (More on Avalanche consensus)

A key innovation of Avalanche consensus is that decisions can be made in O(1) of
messages per node vs. O(n²) messages to reach consensus (Classical consensus) –
better speed + scale.

Avalanche also has extremely low hardware requirements to run a node, compared
to other blockchains.

Avalanche is composed of three blockchains:

- Exchange Chain (X-Chain): responsible for creating and transacting Avalanche
  assets
- Contract Chain (C-Chain): runs smart contracts for the Avalanche platform and
  is EVM-compatible
- Platform Chain (P-Chain): allows anyone to create an L1 or L2 blockchain,
  called subnets, with the P-Chain being the default subnet common to all

## Near

Developer friendly

Token: NEAR ![Near](near.png)

## Polkadot

Token: DOT

The Polkadot network allows for the creation of three types of blockchains:

The Relay Chain: central chain of Polkadot. All validators of Polkadot are
staked on the Relay Chain in DOT and validate for the Relay Chain. The main
responsibility is to coordinate the system as a whole, including parachains.
Other specific work is delegated to the parachains, which have different
implementations and features.

Parachains: custom, sovereign blockchains that use the relay chain’s computing
resources to confirm that transactions are accurate. Polkadot has 100 parachain
slots. Parachains in Polkadot operate under a “shared security” model.

Parathreads: similar to parachains but with a pay-as-you-go model

Polkadot’s cousin chain is Kusama, which has nearly the same codebase as
Polkadot. The network is an experimental development environment for teams who
want to move fast and innovate/use as a testnet for Polkadot

![Polkadot anatomy](polkadot.png)

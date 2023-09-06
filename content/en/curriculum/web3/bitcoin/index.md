---
title: "Bitcoin"
description: "An overview of some basics concepts in Bitcoin."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 40
level:
  - shallow
  - deep
---

## Overview

Bitcoin is a peer-to-peer version of electronic cash that allows online payments
to be sent directly from one party to another without going through a financial
institution. bitcoin is the currency used on the Bitcoin network (lowercase b is
intentional).

With Bitcoin, centralized intermediaries (banks) are replaced by a trustless
network of "miners" and uses the proof-of-work consensus mechanism.

## How it works

Mining the process by which a new block is added to the blockchain and how new
bitcoins are minted. Mining involves competing to solve a cryptographic puzzle.

Hashing involves the process of guessing a "nonce" that when entered with the
previous block information into the SHA-256 algorithm, generates an output that
satisfies the output threshold set by the Bitcoin protocol. Whoever finds the
correct nonce that can be verified by other miners will get to add the new block
to the network and earn bitcoin in the process.

If any of the transaction data is altered by even the smallest amount, it will
become increasingly difficult to solve the puzzle. As a result, a majority of
miners will fail to reach consensus around any nonce that solves the puzzle
using tampered transaction data.

---
title: "Blockchains - Bitcoin"
description: "An overview of some basic concepts in blockchains."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 30
level:
  - shallow
  - deep
---

## Overview

Blockchain is just another word for a ledger, or a database, or an accounting
systems. They are special because they can store information in the open, within
a hostile environment, but still in a trustworthy manner.

Bitcoin and its derivatives are called a blockchain because of how they store
information. Transactions are grouped together into blocks that are linked
together like a chain. The chain is what gives the system its strength: once a
block is linked to the chain, it can no longer be changed.

A transaction is the smallest unit of information in a blockchain. A transaction
is a request to send some amount of tokens from one user to another. A
transaction can also be a request to store a piece of data onto the permanent
record.

Anyone can send a transaction to be included in a blockchain. Transactions are
sent to any of the nodes (servers) of the network. Transactions are accepted by
every node into a temporary pool. After a period of time, a selection of the
transactions are sealed together as a group and written into the permanent
memory of the network. This group is called a block.

Blocks are necessary because the sealing action requires a significant amount of
effort. It would slow things down significantly if every transaction were sealed
individually. Each block is linked to the previous, one after another, in one
long unbroken chain. A blockchain.

The blockchain has some unique properties. No one is able to make any changes to
the chain, once it has been committed. Because they are cryptographically
linked, changing even a single bit would disrupted the link and be detectible.
The chain also guarantees that the ordering of transactions remains in tact. No
one is able to grant themselves free tokens, or spend their tokens in two places
at one time. This consistency satisfies our sense of fairness, which makes us
willing to use it as an accounting system for value saving and transfer.

Some properties of blockchains:

- Immutable. A transaction can never be altered or erased once it happens. This
  allows you to see the complete history of an asset.
- Distributed: Transactions on the blockchain is stored by, and updates are
  broadcasted to, everyone.
- Decentralized: Communal consensus, rather than one party’s decision, dictates
  who gets to access or update the blockchain. Smart Contracts: Smart contracts
  are coded agreements. Once the predetermined conditions of the contract are
  met, the transaction is automatically completed and recorded on the
  blockchain, and the contract is immutable.

A visualization of a blockchain:

![Blockchain visualization](blockchain1.png) ![Blockchain
visualization](blockchain2.png)

## Consensus

Consensus is the process whereby nodes that don't know each other can come into
agreement regarding the validity and ordering of transactions. Decentralized
consensus is difficult because it has to work even when there are some number of
hostile actors who are deliberately trying to game the system. In the case of
most blockchains, as long as >50% of the actors are good actors, who play by the
rules, the system will function properly.

How do blockchains ensure they retain a majority of good actors?

There is no guarantee, but there ways to encourage success. Incentivizes are
constructed in such a way that playing by the rules will yield a greater result
than breaking the rules. An actor who assaults the system may be charged a
significant fee taken from their bonded collateral. Ultimately, an actor who
damages the network permanently will end up with a network that is not worth
anything. These kinds of game-theoretic incentives have worked so far. Although
there have been hacks and other minor exploits, the systems have proven to be
stable and trustworthy. The hacks and exploits will reduce in time as these
systems mature.

How does consensus work?

Bitcoin consensus innovation is called Proof of Work. Nodes (also called miners)
in the network compete to solve cryptographic problems in order to earn the
right to add a new block onto the blockchain. The fastest miner adds the newest
block to the blockchain and is awarded with tokens. This practice requires
immense processing power, meant to discourage attackers. As a payment for that
work, the node receives the "block reward" (amount of new tokens minted out of
thin air) as well as the transaction fees that are associated with the
transactions in the block.

In Bitcoin's case, this block reward also served as its initial token
distribution mechanism. Bitcoin started with 0 bitcoins, then after each block
was mined, a new 50 bitcoins were created. These tokens were worth nothing in a
beginning but have quickly gained value. The rate of issuance is slowing down
and will eventually stop. This has produced a stable system with a very small
inflation rate that will eventually go to zero.

Ethereum has recently transitions to a consensus algorithm called proof of
stake. Users "stake" or lock-up tokens to earn the right to become a
block-producer of the blockchain. Users are chosen to become block-producer
pseudo-randomly, depending on a set of factors (size of stake, age of stake).
Users that are chosen are responsible for checking if the transactions in the
block are valid, signing the block, and adding it to the blockchain. The stake
works as a financial motivator for users not to validate or create fraudulent
transactions.

There are many other variants on Proof of Work and Proof of Stake, each of which
is tuned for a specific purpose. We will cover some of those in later sections.

## How does one get blockchain tokens now?

Earning block rewards by participating in consensus is no longer feasible for
average users. It requires a significant investment in capital for hardware or
stake. Instead, users will have to buy tokens from someone else who is willing
to sell. In the early days this meant [going on a message
board](https://localbitcoins.com/) and advertising to meet someone local.
Nowadays there are established exchanges that provide convenient on-ramps into
cryptocurrencies. Here are some of the larger ones:

- [Coinbase]()
- [Kraken]()
- [Binance]()
- [Gemini]()
- [Blockchain.com]()

There have been a few exchanges that have collapsed over the years, like Mt. Gox
and FTX. Some therefore recommend to store ones currencies outside of the
exchanges. Storage and security of digital currencies remains one of the most
challenging and perilous aspects of this space. There are no great solutions,
only tradeoffs. How wallets work to store currencies will be discussed in a
later section. But it is an evolving space, and the user experience and security
guarantees are slowly but steadily making forward progress. Some rightly call
this the new "wild west".

## How much is a cryptocurrency worth?

The glib answer is: whatever someone is willing to pay. In order to answer this
question, many services have arisen to provide data and statistics about various
networks.

There are marketplace data aggregators like
[Coinmarketcap](https://coinmarketcap.com/) and
[CoinGecko](https://www.coingecko.com/). All aggregators draw from differing
sets of resources, and have their own biases. Best practice is triangulate
between numerous sources. These aggregators will typical list:

- exchanges that trade a given currency
- daily trading volumes
- moving averages
- circulating supply figures and other network-specific values

One of the most popular ways to compare networks is by the "Market Cap". This is
the total value of the network if you take the current token price and multiply
it by the circulating supply. Circulating supply is the number of tokens that
are actually available to be traded, but it is a number that can be manipulated
to create the perception of a much higher market cap. For this reason, market
cap should be taken in consideration with many other factors when comparing
networks. Other factors like trade volume can also be manipulated, so the same
caution also applies. Historical value is generally very accurate and will
always paint an interesting story of the history of the network. Because of the
open nature of these networks, there is so much information to consider, but it
requires a measure of caution and balance to approach.

## Additional Materials

[**How does a blockchain work - Simply
Explained**](https://youtu.be/SSo_EIwHSd4)

{{< youtube SSo_EIwHSd4 >}}

{{< youtube aQWflNQuP_o >}}

[**How does bitcoin work?**](https://youtu.be/bBC-nXj3Ng4)

{{< youtube bBC-nXj3Ng4 >}}

[**Understanding Blockchain Consensus
Mechanisms**](https://youtu.be/ojxfbN78WFQ)

{{< youtube ojxfbN78WFQ >}}

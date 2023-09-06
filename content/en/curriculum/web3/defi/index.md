---
title: "DeFi"
description: "An overview of some basics concepts in DeFi."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 60
level:
  - shallow
  - deep
---

## Overview

DeFi is a collective term for financial products and services run on Ethereum,
executed with dapps.

You can think of DeFi in layers:

1. The blockchain – Ethereum contains the transaction history and state of
   accounts
2. The assets – ETH and the other tokens (currencies)
3. The protocols – smart contracts that provide the functionality
4. The applications – the products

![DeFi visualization](defi.png)

## Use Cases

Payments: DeFi makes sending/streaming money around the globe as fast as sending
an email.

Lending and Borrowing: You can earn interest on your crypto through lending.
Decentralized lending works without either party having to identify themselves.
Borrowing money from decentralized providers comes in two main varieties
(peer-to-peer, pool-based). ([Aave](https://aave.com/),
[Compound](https://compound.finance/))

Token Swaps: Decentralized exchanges (DEXs) let you trade different tokens 24/7.
([Uniswap](https://uniswap.org/), [SushiSwap](https://sushi.com/),
[Curve](https://curve.fi/)).

Stable Currencies: Stablecoins are cryptocurrencies without the volatility. [How
stablecoins get their stability](https://ethereum.org/en/stablecoins/#how)
([USDC](https://www.circle.com/en/usdc), [DAI](https://makerdao.com/en/))

## Advanced Use Cases

Advanced Trading and Prediction Markets:

- [Polymarket](https://polymarket.com/) (prediction)
- [Augur](https://augur.net/) (prediction)
- [dYdX](https://dydx.exchange/) (margin trading)

Investments/Asset Management:

- [Yearn](https://yearn.finance/)
- [Set Protocol](https://www.setprotocol.com/)

Crowdfunding: Quadratic funding is the mathematically optimal way to fund public
goods in a democratic community. [Gitcoin](https://www.gitcoin.co/) is one
example. How it works:

1. There is a matching pool of funds
2. A round of public funding starts
3. People can signal their demand for a project by donating some money
4. Once the round is over, the matching pool is distributed to projects; Those
   with the most unique demand get the highest amount from the matching pool

## Terms to know

DeFi is a collective term for financial products and services run on Ethereum,
executed with dapps.

Liquidity Pools are one of the foundational technologies behind the current DeFi
ecosystem. A liquidity pool is a collection of funds locked in a smart contract.
Liquidity pools are used to facilitate decentralized trading, lending, etc.
Liquidity pools are also the backbone of many decentralized exchanges (DEX).
Users called liquidity providers (LP) add an equal value of two tokens in a pool
to create a market. In exchange for providing their funds, they earn trading
fees from the trades that happen in their pool, proportional to their share of
the total liquidity.

Yield Farming is a specific use case of liquidity pools. Yield farming, also
referred to as liquidity mining, is a way to generate rewards with
cryptocurrency holdings by investing and/or lending it.

Total Value Locked (TVL): TVL represents the number of assets that are currently
being staked in a specific protocol, the total amount of underlying supply that
is being secured by a specific application by DeFi completely. Total value
locked is a metric that is used to measure the overall health of the DeFi and
yielding market.

Rug Pull: A rug pull is where crypto developers abandon a project and run away
with investors’ funds, leaving them “rugged.”

Miner Extractable Value (MEV): the measure of the profit a miner can make
through their ability to arbitrarily include, exclude or re-order transactions
within the blocks they produce; miners can exploit and profit from
front-running, back-running and sandwiching transactions in any block they mine.
[(More on
MEV)](https://www.coindesk.com/markets/2021/07/27/how-to-fix-ethereums-mev-problem-and-give-traders-the-best-price/)

## Zero-knowledge Rollups

ZK-rollups bundle hundreds of transfers off-chain and generate a cryptographic
proof, known as a SNARK (succinct non-interactive argument of knowledge). This
is known as a validity proof and is posted on layer 1.

How do ZK-rollups work?

A ZK-rollup consists of two types of users: transactors and relayers.
Transactors create their transfer and broadcast the transfer to the network.
Relayers collect a large amount of transfers to create a rollup. It is the
relayer’s job to generate the SNARK proof. Anyone can become a relayer so long
as they have staked the required bond in the smart contract. This incentivizes
the relayer not to tamper with or withhold a rollup.

SNARK proof: The SNARK proof is a hash that represents the delta of the
blockchain state. It compares a snapshot of the blockchain before the transfers
to a snapshot of the blockchain after the transfers (i.e. wallet values) and
reports only the changes in a verifiable hash to the mainnet.

Examples of ZK-Rollups: [StarkWare](https://starkware.co/),
[Filecoin](https://filecoin.io/)

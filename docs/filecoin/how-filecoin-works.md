---
description: The Peer-to-peer Network for Sharing Files
---

# How Filecoin Works

## Filecoin Basics <a href="#filecoin-basics" id="filecoin-basics"></a>

_[This is an anotated version of content on the Filecoin docs](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#the-network)_

The Filecoin network is a distributed, peer-to-peer network formed by Filecoin peers who participate in different ways.

Peers communicate over secure channels that they use to distribute information to the network (gossiping), to transfer data among themselves, and to discover other peers, maintaining a well-connected swarm in which information like blocks and messages flows swiftly even when many thousands of peers participate.

### Filecoin Nodes

Filecoin Nodes or Filecoin clients are peers that sync the Filecoin blockchain and validate the messages in every block, which, once applied, provide a global state.

Filecoin Nodes can also publish different types of messages to the network by broadcasting them.

[Read More](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#filecoin-nodes)

### Filecoin Storage Providers (Miners)

The storage providers provide services to the network by executing different types of deals and appending new blocks to the chain (every 30 seconds), for which they collect FIL rewards.

[Read More](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#filecoin-storage-providers)

### Deals

There are two main types of deals in Filecoin: storage deals and retrieval deals.

Storage deals are agreements between clients and storage providers to store some data in the network. Once a deal is initiated, and the storage provider has received the data to store, it will repeatedly prove to the chain that it is still storing the data per the agreement so that it can collect rewards. If not, the storage provider will be slashed and lose FIL.

[Read More](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#deals)

### Proofs

As mentioned above, storage providers must prove that they are storing the data per the terms of a deal. That means that:

- They must store all the data submitted by the client
- They must store it during the whole lifetime of the deal

Cryptographic proofs are used to these ends, as explained in this article about the [Filecoin proof system](https://filecoin.io/blog/filecoin-proof-system/).

[Read More](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#proofs)

### Gas

Executing messages, for example by including transactions or proofs in the chain, consumes both computation and storage resources on the network. Gas is a measure of resources consumed by messages. The gas consumed by a message directly affects the cost that the sender has to pay for it to be included in a new block by a storage provider.

Historically in other blockchains, miners specify a GasFee in a unit of native currency and then pay the block producing miners a priority fee based on how much gas is consumed by the message. Filecoin works similarly, except an amount of the fees is burned (sent to an irrecoverable address) to compensate for the network expenditure of resources, since all nodes need to validate the messages. The idea is based on Ethereum's [EIP1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

**Important Gas Concepts**

* **_GasUsage_**: the amount of gas that a message's execution actually consumes. Current protocol does not know how much gas a message will exactly consume ahead of execution, but it can be estimated (see [prices](https://github.com/filecoin-project/lotus/blob/d678fe4bfa5b4c70bcebd46cdc38aafc452b42d1/chain/vm/gas.go#L87)). GasUsage measured in units of _Gas_.
* **_BaseFee_**: the amount of FIL that gets burned _per unit of gas consumed_ for the execution of every message. It is measured in units of attoFIL/Gas.
* **_GasLimit_**: the limit on the amount of gas that a message's execution can consume, estimated and specified by a message sender. It is measured in units of Gas. The sum of _GasLimit_ for all messages included in a block must not exceed the _BlockGasLimit_. Messages will fail to execute if they run out of _Gas_, and any effects of the execution will be reverted.
* **_GasFeeCap_**: the maximum token amount that a sender is willing to pay per GasUnit for including a message in a block. It is measured in units of attoFIL/Gas. A message sender must have a minimum balance of _GasFeeCap \* GasLimit_ when sending a message, even though not all of that will be consumed. _GasFeeCap_ can serve as a safeguard against high, unexpected _BaseFee_ fluctuations.
* **_GasPremium_**: a priority fee that is paid to the block-producing storage provider. This is capped by _GasFeeCap_. The _BaseFee_ has a higher priority. It is measured in units of attoFIL/Gas and can be as low as 1 attoFIL/Gas.
* **_Overestimation burn_**: an additional amount of gas to burn that grows larger when the difference between _GasLimit_ and _GasUsage_ is large. (See [current implementation](https://github.com/filecoin-project/lotus/blob/v0.10.0/chain/vm/burn.go#L38)).


[Read More](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#gas-fees)

### Actors
Actors are a [software design pattern](https://en.wikipedia.org/wiki/Actor_model) for managing state. Accounts, Multisigs, Miners, and anything with a state, such as an account balance, are implemented as an _actor_.

Actors are the Filecoin equivalent of smart contracts in the Ethereum Virtual Machine. As such, Actors are very central components of the system. Any change to the current state of the Filecoin blockchain has to be triggered through an Actor.

[Read More](https://spec.filecoin.io/#section-systems.filecoin_vm)

### Addresses
In Filecoin, addresses are used to identify actors. There are 4 address types:

* `0` - ID Address
* `1` - SECP256K1 Public Key Address
* `2` - Actor Address
* `3` - BLS Public Key Address

[Read More]()

#### Filecoin Storage Basics | Rod Vagg

Learn about mining, sealing, sector types, Collateral, making deals, Filecoin+, offline deals.

{% embed url="https://youtu.be/Sz2OQc2WOdA" %}



### Filecoin for Developers & Builders <a href="#undefined" id="undefined"></a>

{% embed url="https://youtu.be/0EcBTPyfrt4" %}

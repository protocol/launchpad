---
title: "Drand"
description: "Distributed, Unpredictable, Publicly-Verifiable, and Decentralized Randomness Generator"
draft: false
menu:
    curriculum:
        parent: "curriculum-filecoin"
weight: 420
category: lecture
level:
- deep
---

Drand is a distributed, bias-resistant, unpredictable, and publicly verifiable randomness generator that is key to the Filecoin implementation in how it provides unpredictable, decentralized and publicly verifiable random values for the blockchain. [Learn more about how Drand works in the docs](https://drand.love/docs/overview/#how-drand-works)

#### Drand: Distributed, Bias Resistant, Unpredictable and Publicly Verifiable Randomness | Nicolas Gailly
Drand uses [cryptographic methods](https://drand.love/docs/cryptography/#setup-phase), collective public keys, and a private key share of a collective private key to generate randomness in a distributed manner.

{{< youtube ydwW2HFFxNI >}}

#### [Drand - The Distributed Randomness Beacon | ResNetLabs On Tour – Nicolas GAILLY](https://research.protocol.ai/tutorials/resnetlab-on-tour/modular-p2p-stack/)

Drand is a distributed randomness beacon. It provides publicly-verifiable, unpredictable, and bias-resistant random numbers as a public service. In this module, we’ll walk through:

* Threshold Cryptography & Randomness
* Distributed Key Generation in drand
* The Setup and Randomness Generation Phases
* The League of Entropy

{{< youtube NNfaQ__UFCE >}}

### Drand Example
This example goes over how to use the Drand network to retrieve a random value in a key-pair list. 

Imagine you are a full time L5 software engineer and have more important things to think about than what to get for lunch.
You decide to leave it up to randomness to choose your next meal. But you still have preferences.
You assign weights to your preferences such that items you would like to eat most often have heavier weights (chances of being chosen)
And things you don't want to eat as often, have smaller probability of being chosen.

Check out this quick Javascript code:
 <script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fdotnet%2Fcorefx%2Fblob%2Fmaster%2Fsrc%2FSystem.ObjectModel%2Fsrc%2FSystem%2FWindows%2FInput%2FICommand.cs&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on">
 </script>

<br></br>
Things to note:
* Drand mainnet releases a random number every 30 seconds. The problem that arises is if you want to test if the biased randomness works or not, it would take a really long time to test.
* There is work to shorten this time frame to 3 seconds, which is better, but its not as convenient as instant access of psuedo-random numbers like math.random() or crypto.getRandomValues().
* This "biased" algo is not sophisticated, weights are not changing every iteration to adjust for any external factors. 
* Ideally, we have a neural net that adjusts weights in order to control supply ratio.
    Or some other algorithm that handled weights better, instead of just summation of key:pair values.

## Drand Resources

* The [drand website](https://drand.love/)
* [Spec](https://spec.filecoin.io/libraries/drand/)
* [Github Repos](https://github.com/drand)
* Article – [Researchers from Protocol Labs Explain how the Drand or Distributed Randomness Project can Help with Cybersecurity, Election Audits](https://www.crowdfundinsider.com/2020/08/165618-researchers-from-protocol-labs-explain-how-the-drand-or-distributed-randomness-project-can-help-with-cybersecurity-election-audits/)
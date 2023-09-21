---
title: "Cryptography"
description: "An overview of some basics concepts in cryptography."
draft: false
menu:
  curriculum:
    parent: "curriculum-web3"
category: lecture
weight: 20
level:
  - shallow
  - deep
---

## Overview

Communication is the root of user severignity. Communication is how we solve
problems, establish cooperation, and enjoy our precious lives. Cryptography is a
set of mathematical techniques that allows one to scramble communication in such
a way that only that person can specify how to unscramble the communication.

Use of cryptographic technologies became ubiquitous in the Web2 phase, and now
undergirds the internet. Using HTTPS, all internet traffic is encrypted, so only
those authorized may view it. This form of encryption requires the use of
centralized certificate providers.

In Web3, cryptography is moving away from centralized providers to
self-issuance.

Cryptography gives us many useful tools:

- Encryption - concealing messages
- Authentication - proving that you know something and are therefore authorized
- Verification - verifying that a message was not altered
- Reputation - proof that something occurred at a given time

## History

1930-40s

- Decryption of German encryption plays key role in WW1
- Alan Turing advances cryptography in computing

Mid-Century

- Cryptography is primarily used for defense purposes

1977

- RSA public key encryption invented. This is the asymmetric cryptography that
  allows a user to share a public key with the world, which can be used to
  encrypt data that only the holder of the private key can read. It is slow, so
  it is only used to start sessions, but when combined with symmetric
  encryption, which is invented later, allows for high-performance and trustless
  encryption sessions.

1989

- Berners-Lee and Robert Cailliau built the prototype system which became the
  World Wide Web at CERN.

1994

- Bruce Schneier's Applied Cryptography is published. This is the seminal work on
  cryptography.

- SSL is released by Netscape. This is the first scheme used to encrypt HTTP
  requests, which is the protocol by which every web page is retrieved.

1995

- NSA publishes the SHA1 hash algorithm as part of its Digital Signature
  Standard. Hashing algorithms are a key component in the efficient verification
  of data.

1997

- Hashcash first proposed. This is the precursor to Bitcoin's proof-of-work.

2000

- U.S. Government announce restrictions on export of cryptography are relaxed
  (although not removed). This allows many US companies to stop the long running
  process of having to create US and international copies of their software.

2001

- Belgian Rijndael algorithm selected as the U.S. Advanced Encryption Standard
  (AES) after a five-year public search process by National Institute of Standards
  and Technology (NIST). This is the primary symmetric encryption scheme used
  today.

2001-2005

- Many cryptographic algorithms shown to have weaknesses, like WEP (wifi
  passwords), SHA-1 and MD5 hashes, prompts moving to more advanced variants
  like WPA and SHA-2.

2008

- [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) is published anonymously
  by Satoshi Nakamoto as an “electronic payment system based on cryptographic
  proof instead of trust.”

2014

- [Ethereum
  whitepaper](https://ethereum.org/669c9e2e2027310b6b3cdce6e1c52962/Ethereum_Whitepaper_-_Buterin_2014.pdf)
  is published

2017

- [Filecoin whitepaper]() is published.

## Leading to digital currencies

Armed with cryptography, we can now look at ways to use it to accomplish our
goals of increasing user sovereignty. In decentralized networks, users will need
to run infrastructure (like servers), which cost money. Currency is the
universal tool used to finance work. National currencies fuel Web2, but they
have severe limitations. They are slow and encumbered by rules that restricts
use across borders.

A currency is just a ledger, an accounting system that keeps track of who has
how much, and allows parties to exchange with each other. In the case of
National currencies, the central banks maintain the root ledgers and authorize
branch banks to maintain individual records for their own sets of customers. The
value of a currency depends on how useful it is and how much trust the users
have in the "fairness" of the currency authorities. An authority that
arbitrarily adds units to some accounts and not others will begin to lose the
trust of its users.

There were many attempts at creating non-national digital currencies, but these
were all met with political resistance and were shut down. eCash is widely
considered the first version of internet money followed by B-money, Bitgold, and
Hashcash. All were influential in what we know to be cryptocurrency today. Their
weakness was their centralization -- shutting down the central offices would
effectively take down the entire network.

In the 90s a small group of hackers who called themselves Cypherpunks were tired
of the government’s power and ability to obstruct people’s privacy as a means of
oppression. The Cypherpunks believed that cryptography would be the tool to
maintain sovereignty of and freedom on the internet.

“We cannot expect governments, corporations, or other large, faceless
organizations to grant us privacy out of their beneficence. [...] We must defend
our own privacy if we expect to have any. We must come together and create
systems which allow anonymous transactions to take place.” (A Cypherpunk’s
Manifesto)

A decentralized digital currency must not have a central authority that could be
shut down. But without a central authority, the problem arises of how to
arbitrate and create a fair system that both incentivizes good behavior and
prevents being gamed by hostile actors.

In 2009, a pseudonymous group of developers called Satoshi Nakamoto released
Bitcoin. This proved to be the first digital currency network that was
decentralized enough to be able to flourish across the globe. It brought
together several pre-existing cryptography techniques. The novel insight was to
incentivize useful work in the network by granting rewards denominated in
bitcoins to those who facilitate transaction transmission and storage.

{{% level type="[deep]" %}}

## Advanced Topic - Zero Knowledge Proofs

Zero Knowledge proofs are cryptographic methods and strategies for validating
information without revealing data that you want to keep private or secret.
Though this technology has applications in cryptocurrency, the applications are
wide and provide benefits in many applications.

[**Zero Knowledge Proof - ZKP | Simply
Explained**](https://www.youtube.com/watch?v=OcmvMs4AMbM)

{{< youtube OcmvMs4AMbM >}}

{{% /level %}}

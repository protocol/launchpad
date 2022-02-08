---
description: The IPFS Public DHT & Content Discovery and Routing
---

## The Public DHT
The public distributed hash table is the record of content that is used, along with Kademlia, to discover content-addressed data in a peer-to-peer network.

### What does the DHT do for IPFS?
A [DHT is a distributed system](https://blog.ipfs.io/2020-07-20-dht-deep-dive/) for mapping keys to values. In IPFS, the DHT is used as the fundamental component of the content routing system. It maps what the user is looking for (a CID) to the peer that is actually storing the matching content. There are 3 types of key-value pairings that are mapped using the DHT:

* Provider Records – These map a data identifier (i.e., a multihash) to a peer that has advertised that they have, and are willing, to provide you with that content. This is used by IPFS to find content, and IPNS to find pubsub peers.

* IPNS Records – These map an IPNS key (i.e., hash of a public key) to an IPNS record (i.e., a signed and versioned pointer to some path like `/ipfs/bafyXYZ`)

* Peer Records – These map a peerID to a set of multiaddresses at which the peer may be reached. This is
used by IPFS when we know of a peer with content, but do not know its address, and used for manual connections

[Read Mored in the docs](https://docs.ipfs.io/concepts/dht)

## Kademlia

[Kademlia](https://en.wikipedia.org/wiki/Kademlia) is a distributed hash table for decentralized peer-to-peer computer networks designed by Petar Maymounkov and David Mazières in 2002. It specifies the structure of the network and the exchange of information through node lookups.
#### The Public DHT | LabWeek 2021 <!-- Who Presented?  -->
<!-- Add a context paragraph-- The DHT keeps the IPFS Network of Peers Connected... -->

{% embed url="https://youtu.be/_3ee1_2rgKg" %}

{% embed url="<https://docs.google.com/presentation/d/e/2PACX-1vRFnTRDresIb6g-mAv2dLxrYpUmbtfQFsX48OVxOzgiVs7JN6bBD7LDz0n36_rIUPb7W_I4t5l1gvTJ/pub?start=false&loop=true&delayms=3000>" %}
From LabWeek 2021
{% endembed %}

<!-- Link to public copy of Slides: https://docs.google.com/presentation/d/1NJMonh2YolwKSpwEt61lU2YdvUswDAFhErn4RJwCVh0/edit#slide=id.p -->


### Radar
<!-- Add a paragraph  -->

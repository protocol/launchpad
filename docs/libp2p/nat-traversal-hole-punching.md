---
description: Combining Protocols for NAT Traversal
---

# Nat Traversal and Hole Punching

### NAT Traversal & Hole Punching

#### NAT Traversal

[NAT Traversal](https://en.wikipedia.org/wiki/NAT_traversal) allows those using different Internet Protocols (such as IPFS and HTTP) to communicate through gateways. A necessary component of this is Network Address Translation. Because the people who originally designed IP addresses (a location address on the internet) didn't make it possible to make enough public IP addresses as there are machines to locate, there are a limited number of public IP addresses, and not every machine connected to the internet can have their own.

In order to address this problem, routers and gateways use [**N**etwork **A**ddress **T**ranslation (NAT)](https://en.wikipedia.org/wiki/Network_address_translation) to connect each machine to the internet. Machines on a shared home or private network will have private IP addresses used within that network as their address, however, when each machine wants to connect with devices on the public internet, that router or gateway will add the public IP address to any packets of information machines send out when they communicate with the internet at large.


#### Hole Punching

Hole Punching is the process of establishing direct connections between two libp2p peers in which one or both are behind firewalls and/or NATs (Network Address Translations).

<!-- Hole punching blog http://bafybeigd25fcawofxm2jkjvnnk4z45d3ikolysdv7q4rzqlx2t5oj5v4ra.ipfs.localhost:8080/2022-01-20-libp2p-hole-punching/ -->

This includes two types of hosts: publicly reachable and non-publicly reachable hosts. Addresses of the former type of hosts can be directly dialed on the public Internet. Addresses of the latter type of hosts can only be dialed through a relay protocol, or through some means of hole punching. The document refers to publicly reachable hosts as public and non-publicly reachable hosts as private.

**See the entirety of the [long-term vision](https://github.com/libp2p/specs/blob/master/connections/hole-punching.md)**

#### Project Flare

_See_ [_the full proposal here_](https://github.com/protocol/web3-dev-team/pull/21/files#diff-b137dc3a933796d3ce264eeb6a31386d72a7a1c925c01e62c3ab026f46c417c2)

Given the pervasiveness of IPv4 peers that are behind NATs on the internet, NAT traversal is an essential requirement for a peer to peer application. The inability to traverse NATs means that such NATT’d peers are NOT reachable on the network and are thus unable to provide any meaningful service to the network, nor interact with network participants under protocol patterns that require inbound connections (e.g. dialbacks).

libp2p currently executes NAT traversal using[ Circuit Relays](https://docs.libp2p.io/concepts/circuit-relay/) wherein publicly dialable Relay servers relay the entirety of user traffic to peers that are NATT’d. This approach does NOT scale because:

1. It costs bandwidth on the Relay server.
2. There is NO real incentive to be a Relay server.
3. Introduces communication latency between the two peers that are interfacing via the Relay server.

A more scalable approach to NAT traversal is to enable direct communication between the peers via a technique called [Hole Punching](https://en.wikipedia.org/wiki/Hole_punching_(networking)). Hole punching removes the need to relay _all_ traffic between two peers via a Relay server.

### Issues & Project Tracking

* [NAT traversal tracking issue](https://github.com/libp2p/specs/issues/312#issuecomment-880762775)

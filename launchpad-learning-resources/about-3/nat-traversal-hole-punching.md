---
description: Combining Protocols for NAT Traversal
---

# Nat Traversal and Hole Punching

### NAT Traversal & Hole Punching

#### NAT Traversal

#### Hole Punching

Hole Punching is the process of establishing direct connections between two libp2p peers in which one or both are behind firewalls and/or NATs (Network Address Translations).

This includes two types of hosts: publicly reachable and non-publicly reachable hosts. Addresses of the former type of hosts can be directly dialed on the public Internet. Addresses of the latter type of hosts can only be dialed through a relay protocol, or through some means of hole punching. The document refers to publicly reachable hosts as public and non-publicly reachable hosts as private.

\*\*See the entirety of the \[long-term vision]\(### Long-Term Visions)\_

#### Project Flare

_See_ [_the full proposal here_](https://github.com/protocol/web3-dev-team/pull/21/files#diff-b137dc3a933796d3ce264eeb6a31386d72a7a1c925c01e62c3ab026f46c417c2)

Given the pervasiveness of IPv4 peers that are behind NATs on the internet, NAT traversal is an essential requirement for a peer to peer application. The inability to traverse NATs means that such NATT’d peers are NOT reachable on the network and are thus unable to provide any meaningful service to the network, nor interact with network participants under protocol patterns that require inbound connections (e.g. dialbacks).

Libp2p currently executes NAT traversal using[ Circuit Relays](https://docs.libp2p.io/concepts/circuit-relay/) wherein publicly dialable Relay servers relay the entirety of user traffic to peers that are NATT’d. This approach does NOT scale because:

1. It costs bandwidth on the Relay server.
2. There is NO real incentive to be a Relay server.
3. Introduces communication latency between the two peers that are interfacing via the Relay server.

A more scalable approach to NAT traversal is to enable direct communication between the peers via a technique called [_Hole Punching_](https://en.wikipedia.org/wiki/Hole\_punching\_\(networking\)). Hole punching removes the need to relay _all_ traffic between two peers via a Relay server.

### Issues & Project Tracking

* [NAT traversal tracking issue](https://github.com/libp2p/specs/issues/312#issuecomment-880762775)

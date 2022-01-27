---
description: The Building Blocks of Libp2p
---


## Concepts
_This is an annotated version of [this libp2p doc](https://docs.libp2p.io/concepts/)_

libp2p covers a lot of ground, and may involve unfamiliar terminology and concepts. This section goes over the foundational concepts involved in libp2p.

### Transport
When you make a connection from your computer to a machine on the internet, chances are pretty good you’re sending your bits and bytes using TCP/IP, the wildly successful combination of the Internet Protocol, which handles addressing and delivery of data packets, and the Transmission Control Protocol, which ensures that the data that gets sent over the wire is received completely and in the right order.

Because TCP/IP is so ubiquitous and well-supported, it’s often the default choice for networked applications.  While TCP and UDP (together with IP) are the most common protocols in use today, they are by no means the only options. Alternatives exist at lower levels (e.g. sending raw ethernet packets or bluetooth frames), and higher levels (e.g. QUIC, which is layered over UDP).

In libp2p, we call these foundational protocols that move bits around transports, and one of libp2p’s core requirements is to be transport agnostic.

[Read More](https://docs.libp2p.io/concepts/transport/)

### NAT Traversal

The internet is composed of countless networks, bound together into shared address spaces by foundational transport protocols.

As traffic moves between network boundaries, it’s very common for a process called Network Address Translation to occur. Network Address Translation (NAT) maps an address from one address space to another.

NAT allows many machines to share a single public address, and it is essential for the continued functioning of the IPv4 protocol, which would otherwise be unable to serve the needs of the modern networked population with its 32-bit address space.

[Read More](https://docs.libp2p.io/concepts/nat/)

<!-- ### Secure Communication
This is an incomplete section, needs creating


[Read More](https://docs.libp2p.io/concepts/secure-comms/) -->

### Circuit Relay

Circuit relay is a transport protocol that routes traffic between two peers over a third-party “relay” peer.

In many cases, peers will be unable to traverse their NAT and/or firewall in a way that makes them publicly accessible. Or they may not share common transport protocols that would allow them to communicate directly.

To enable peer-to-peer architectures in the face of connectivity barriers like NAT, libp2p defines a [protocol called p2p-circuit](https://github.com/libp2p/specs/tree/master/relay). When a peer isn’t able to listen on a public address, it can dial out to a relay peer, which will keep a long-lived connection open. Other peers will be able to dial through the relay peer using a p2p-circuit address, which will forward traffic to its destination.

The circuit relay protocol is inspired by TURN, which is part of the Interactive Connectivity Establishment collection of NAT traversal techniques.

[Read More](https://docs.libp2p.io/concepts/circuit-relay/)

### Protocols
There are protocols everywhere you look when you’re writing network applications, and libp2p is has many. The kind of protocols this article is concerned with are the ones built with libp2p itself, using the core libp2p abstractions like transport, peer identity, addressing, and so on.

Throughout this article, we’ll call this kind of protocol that is built with libp2p a libp2p protocol, but you may also see them referred to as “wire protocols” or “application protocols”.

These are the protocols that define your application and provide its core functionality.

There are some [key defining features of a libp2p protocol](https://docs.libp2p.io/concepts/protocols/#what-is-a-libp2p-protocol), and a protocol negotiation processes

#### Protocol Negotiation
When dialing out to initiate a new stream, libp2p will send the protocol id of the protocol you want to use. The listening peer on the other end will check the incoming protocol id against the registered protocol handlers.

If the listening peer does not support the requested protocol, it will end the stream, and the dialing peer can try again with a different protocol, or possibly a fallback version of the initially requested protocol.

If the protocol is supported, the listening peer will echo back the protocol id as a signal that future data sent over the stream will use the agreed protocol semantics.

This process of reaching agreement about what protocol to use for a given stream or connection is called protocol negotiation.


#### Core Libp2p Protocols
In addition to the protocols that you write when developing a libp2p application, libp2p itself defines several foundational protocols that are used for core features.

[Read More](https://docs.libp2p.io/concepts/protocols/)

### Peer Identity

[Read More]()

### Content Routing

[Read More]()

### Peer Routing

[Read More]()

### Addressing

[Read More]()

### Security Considerations

[Read More]()

### Publish/Subscribe

[Read More]()

### Stream Multiplexing

[Read More]()


## Second Heading

text

### Sub-Heading

text

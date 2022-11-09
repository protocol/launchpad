---
title: "Quiz & Resources"
description: "Explore beyond the curriculum"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
        identifier: "libp2p-resources"
weight: 370
category: lecture
level:
- shallow
- deep
---

## Libp2p Quiz

Take the [**libp2p Quiz**](https://docs.google.com/forms/d/e/1FAIpQLSfAEZCeioMqvWe16zzH8du8ygi7rcgfqDbVHt8MVQbRq6iO4A/viewform?usp=sf_link) after covering the pre-requisite content to gauge your understanding.

{{< embed src="https://docs.google.com/forms/d/e/1FAIpQLSfAEZCeioMqvWe16zzH8du8ygi7rcgfqDbVHt8MVQbRq6iO4A/viewform?usp=sf_link" width="100%" height="900px" >}}

### Main Resources

* libp2p [Website](https://libp2p.io)
* libp2p [Github Repos](https://github.com/libp2p)
* libp2p [Documentation](https://docs.libp2p.io/)

#### Github Discussions

* libp2p [spec issues](https://github.com/libp2p/specs/issues)
* libp2p [notes issues](https://github.com/libp2p/notes/issues)
* libp2p [discussion forum](https://discuss.libp2p.io)

#### Tutorials

If you want to dive in, check out our [collection of tutorials](https://docs.libp2p.io/tutorials/), which will help guide you through your explorations of libp2p.

You can also follow this [Getting Started with Rust and libp2p tutorial](https://docs.rs/libp2p/latest/libp2p/tutorial/index.html) to build a small ping clone, sending a ping to a peer, expecting a pong as a response.

* [Introduction to libp2p](https://proto.school/introduction-to-libp2p)
* [Blogging on the Decentralized Web](https://proto.school/blog)
* [ResNetLab on Tour – Content Routing](https://research.protocol.ai/tutorials/resnetlab-on-tour/content-routing/)

#### Examples

If you want to get a feel for what's possible with libp2p, or just want to see some idiomatic usage, check out the [examples](https://github.com/libp2p/go-libp2p/tree/master/examples). Each libp2p implementation maintains a set of working example projects that can illustrate key concepts and use cases. ([js examples](https://github.com/libp2p/js-libp2p/tree/master/examples), [rust examples](https://github.com/libp2p/rust-libp2p/tree/master/examples), [python examples](https://github.com/libp2p/py-libp2p/tree/master/examples))

### Reference

#### Specifications & Planning

While libp2p has several implementations, it is fundamentally a set of protocols for peer identity, discover, routing, transport and more.

See the [specifications section](https://github.com/protocol/launchpad/blob/main/reference/specs/README.md) for details.

#### Implementations

At the core of libp2p is a set of [specifications](https://github.com/protocol/launchpad/blob/main/reference/specs/README.md), which together form the definition for what libp2p is in the abstract and what makes a "correct" libp2p implementation. Today, implementations of libp2p exist in several languages, with varying degrees of completeness. The most complete implementations are in [Go](https://github.com/protocol/launchpad/blob/main/reference/go/README.md), [JavaScript](https://github.com/protocol/launchpad/blob/main/reference/js/README.md), and [Rust](https://github.com/libp2p/rust-libp2p).

In addition to the implementations above, the libp2p community is actively working on implementations in [python](https://github.com/libp2p/py-libp2p) and [the JVM via Kotlin](https://github.com/web3j/libp2p). Please check the project pages for each implementation to see its status and current state of completeness.

### Community

Get in touch with other members of the libp2p community who are building tools and applications with libp2p! You can ask questions, discuss new ideas, or get support for problems at [discuss.ipfs.io](https://discuss.ipfs.io), but you can also [hop on IRC](https://github.com/protocol/launchpad/blob/main/community/irc/README.md) for a quick chat.

See the other links in the community section for more information about meetings, events, apps people are building, and more.

Information about contributing to libp2p and about other software projects in the community are also hosted here.

#### Get Involved

libp2p is an open-source community project. While Protocol Labs is able to sponsor some of the work around it, much of the design, code, and effort is contributed by volunteers and community members like you. If you’re interested in helping improve libp2p, check the [contributing guide](https://github.com/protocol/launchpad/blob/main/contributing/README.md) to get started.

If you are diving in to contribute new code, make sure you check both the [contribution guidelines](https://github.com/libp2p/community/blob/master/CONTRIBUTE.md) and the style guide for your language ([Go](https://github.com/ipfs/community/blob/master/CONTRIBUTING\_GO.md), [JavaScript](https://github.com/ipfs/community/blob/master/CONTRIBUTING\_JS.md)).

#### Related Projects

libp2p began as part of the IPFS project, and is still an essential component. As such, libp2p composes well with the abstractions and tools provided by other projects in the IPFS "family". Check their individual sites for specific information and references:

* [IPFS](https://ipfs.io) is the InterPlanetary File System, which uses libp2p as its networking layer.
* [Multiformats](https://multiformats.io) is a variety of _self-describing_ data formats.
* [IPLD](https://ipld.io) is a set of tools for describing links between content-addressed data, like IPFS files, Git commits, or Ethereum blocks.
* [The Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack) is a licensing strategy for software development that embraces open-source values.

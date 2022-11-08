---
title: "The IPFS Gateways"
description: "IPFS Gateways and Browsers"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 95
category: lecture
level:
- deep
goal: 1.3
subgoals:
- 1.31
- 1.32
- 1.33
---
## What are IPFS Gateways

[IPFS Gateways](https://docs.ipfs.io/how-to/address-ipfs-on-web/#http-gateways) are provided strictly for convenience: in other words, they help tools that speak HTTP but do not speak distributed protocols (such as IPFS) to communicate. They are the first stage of the upgrade path for bridging web2 and web3. 

### Centralization
HTTP gateways have worked well since 2015, but they come with a significant set of limitations related both to the centralized nature of HTTP and some of HTTP's semantics. Location-based addressing of a gateway depends on both DNS and HTTPS/TLS, which relies on a trust in certificate authorities (CAs) and public key infrastructure (PKI). In the long term, these issues should be mitigated by use of opportunistic protocol upgrade schemes.


### Path gateway
In the most basic scheme, a URL path used for content addressing is effectively a resource name without a canonical location. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path as relative to the current server and just work without a need for any conversion:

```
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
https://<gateway-host>.tld/ipns/<ipnsid_or_dnslink>/path/to/resource
```

### Protocol upgrade
Tools and browser extensions should detect IPFS content paths and resolve them directly over IPFS protocol. They should use HTTP gateway only as a fallback when no native implementation is available in order to ensure a smooth, backward-compatible transition.

## Native URLs

When searching for content on IPFS on the [command line](/curriculum/ipfs/basics) or [ipfs desktop](/curriculum/ipfs/desktop-tutorial) we are using the native ipfs protocol handler behind the scenes. The only differentiating factor is that `ipfs://` replaces the `https://` format that we are familiar with:

```
ipfs://{cidv1}/path/to/resource
```
The IPFS URL protocol scheme requires case-insensitive CIDv1 in Base32 encoding. This is necessary because it allows for a standard way to address content in browsers and in our local node.

An IPFS URL does not retain the original path, but instead requires a conversion step to/from URI representation:

``` 
ipfs://{immutable-root}/path/to/resourceA → /ipfs/{immutable-root}/path/to/resourceA

ipns://{mutable-root}/path/to/resourceB → /ipns/{mutable-root}/path/to/resourceB
```

The first element after the double slash is an opaque identifier representing the content root. It is interpreted as an authority component used for origin calculation, which provides necessary isolation between security contexts of different content trees.

Example:

```
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

> **Native URI requires the CID to be case-insensitive. Use of CIDv1 in Base32 is advised.**

_Source: [docs.ipfs.io/native-URIs](https://docs.ipfs.io/how-to/address-ipfs-on-web/#native-urls)_

### Subdomain gateway

When [origin-based security](https://en.wikipedia.org/wiki/Same-origin_policy) is needed, CIDv1's case-insensitive encoding should be used in the subdomain:

    https://<cidv1b32>.ipfs.<gateway-host>.tld/path/to/resource

Example:

    https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/
    https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.cf-ipfs.com/wiki/Vincent_van_Gogh.html
    https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.localhost:8080/wiki/

_Source: [docs.ipfs.io/subdomain-gateway](https://docs.ipfs.io/how-to/address-ipfs-on-web/#subdomain-gateway)_

### Current Projects

- IPFS Companion browser extension
- IPFS and the JavaScript ecosystem
- How to address IPFS on the web
- How to run own HTTP Gateway
- DNSLink
- Collaborations
    - W3C
    - IPFS and Igalia collaborate on dweb in browsers
    - Brave
    - Opera

### IPFS Companion browser extension

[IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a browser extension that simplifies access to IPFS resources and adds browser support for the IPFS protocol. It runs in <img src="https://unpkg.com/@browser-logos/firefox@2.0.0/firefox_16x16.png" width="16" height="16">Firefox (desktop and Android) and Chromium-based browsers including Chrome or Brave. Check out all of IPFS Companion's features and [**install it**](https://github.com/ipfs/ipfs-companion#install-ipfs-companion) today!

### IPFS and the JavaScript ecosystem

At present, in order to interact with IPFS in a web browser, you must either bundle [`js-ipfs-core`](https://www.npmjs.com/package/ipfs-core) (a full IPFS node in JavaScript) with your client-side application or use the [`js-ipfs-http-client`](https://www.npmjs.com/package/ipfs-http-client) client library to connect to an external daemon running on a local or remote machine.

- To learn more, make sure to check the `browser-*` examples at [github.com/ipfs-examples/js-ipfs-examples](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)
- Highlight: an advanced, end-to-end example of using js-ipfs node in `SharedWorker` from `ServiceWorker` can be found at [github.com/js-ipfs-examples/browser-service-worker](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-service-worker)


### DNSLink

[DNSLink](https://dnslink.dev) enables you to map a domain name to an IPFS address (CID or IPNS libp2p-key) by means of a DNS TXT record.

To create a mutable pointer with [DNSLink](https://docs.ipfs.io/concepts/dnslink/), you need:
- a domain name you control
- A CID or an IPNS name to link to

```
ipfs.tech -> /ipfs/QmYyg8yU6k5Zxwugiy32UhzJabdNC2Yac2y9nSmPr4K5FS
```

Finally, you can use an IPFS gateway using the `/ipns/[DNSLink]` resolution scheme to resolve DNSLink names, e.g. `https://ipfs.io/ipns/libp2p.io`. (notice this [follows the schema above](#path-gateway))

#### Quick explanation of dnslink in IPFS

{{< youtube YxKZFeDvcBs >}}

Source: [Introduction to DNSlink](https://dnslink.dev/#introduction), [IPFS docs on DNSLink](https://docs.ipfs.tech/concepts/dnslink/)

### Collaborations

#### W3C

Protocol Labs is a [W3C](https://www.w3.org/Consortium/) Member. Current focus is to watch, learn, and participate in [WebExtensions Community Group](https://www.w3.org/community/webextensions/).

#### IPFS and Igalia team up

In 2020 IPFS and [Igalia](https://www.igalia.com/), an open source company with expertise in browser development and the web platform, started a collaboration that continues to this day. This opportunity has started discussions and has risen awareness of the distributed web. Their effort has brought much needed progress to bringing IPFS to Firefox and Chromium-based browsers. For more information [take a look at the official announcement](https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/).

#### Brave

[Brave v1.19 has integrated IPFS into their desktop web browser](https://brave.com/brave-integrates-ipfs/) for Windows, macOS and Linux. When Brave detects an address which is an HTTP gateway URL to IPFS content or a native IPFS address such as `ipfs://` or `ipns://` it will prompt the user to install and enable the native IPFS node, or to use an HTTP gateway.
Diagnostic UI can be found at `brave://ipfs`, we suggest enabling IPFS Companion for the best experience

#### Opera

Opera for Android 57 introduced support for resolving `ipfs://` or `ipns://` via a customizable gateway.
For more information [take a look at the official announcement](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/).

### How to Run Your Own HTTP Gateway

Protocol Labs operates and is responsible for only two public gateways, those being `ipfs.io` and `dweb.link`. Regardless, they maintain a list of over 80 [known public gateways](https://ipfs.github.io/public-gateway-checker/). 

You can use the latest [Kubo daemon](https://github.com/ipfs/go-ipfs) and follow [gateway recipes](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gateway-recipes) to turn your local node into a public gateway. Or checkout this step-by-step walkthrough tutorial to launch your own publicly available IPFS gateway to [Fly.io](https://fly.io/)

{{< youtube k1Hcg3B43Q4 >}}
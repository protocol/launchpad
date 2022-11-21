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
- shallow
- deep
goal: 1.3
subgoals:
- 1.31
- 1.32
- 1.33
- 1.34
---
## What are IPFS Gateways
IPFS gateways are IPFS nodes that are hosted for the benefit of anyone who would like to access IPFS content from the HTTP-based web2 internet. Protocol Labs operates and is responsible for only two public gateways, those being `ipfs.io` and `dweb.link`. Regardless, they maintain a list of over 80 [known public gateways](https://ipfs.github.io/public-gateway-checker/). Some commonly used gateways are `gateway.pinata.cloud` and `cloudflare-ipfs.com`.

[IPFS Gateways](https://docs.ipfs.io/how-to/address-ipfs-on-web/#http-gateways) are provided for convenience, but also for an owners own use cases. They help tools that speak HTTP but that do not speak to distributed protocols like IPFS's. They are the first stage to bridging web2 and web3. To learn how to access the IPFS network through a gateway checkout the [Get Files through an IPFS Gateway](#get-files-through-an-ipfs-gateway) section below.

### Centralization
HTTP gateways have worked well since 2015, but they come with a significant set of limitations related both to the centralized nature of HTTP and some of HTTP's semantics. Location-based addressing of a gateway depends on both the [Domain Name System (DNS)](https://www.cloudflare.com/learning/dns/what-is-dns/) and HTTPS with TLS Certificates, which relies on a trust in certificate authorities (CAs) and public key infrastructure (PKI). In the long term, these issues should be mitigated by use of opportunistic protocol upgrade schemes, encrypting communication channels and enabling safe peer-to-peer connections.

### Get Files Through an IPFS Gateway
In the most basic scheme, a URL path used for content addressing is effectively a resource name without a location-based address. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path relative to the current server and work without a need for any conversion. There are various types of [IPFS gateways](https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-types), that each has security, performance, and other functional implications. The most common way to read data from gateways are with this pathing schema:

```
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
https://<gateway-host>.tld/ipns/<ipnsid_or_dnslink>/path/to/resource
```

## Native URLs

When searching for content on IPFS on the [command line](/curriculum/ipfs/basics) or [ipfs desktop](/curriculum/ipfs/desktop-tutorial) we are using the native ipfs protocol handler behind the scenes. The only differentiating factor is that `ipfs://` replaces the `https://` format that we are familiar with:

```
ipfs://{cidv1}/path/to/resource
```
The IPFS URL protocol scheme requires case-insensitive (no capital letters) CIDv1 content identifiers with Base32 encoding. This is necessary because it allows for a standard way to address content in browsers and in our local node.

A Uniform Resource Identifier (URI) for IPFS has a different structure than a typical http URI that starts with `https:`, and when you create an IPFS URI, you will need to convert it to a new format that starts with `ipfs` or `ipns` :

```
ipfs://{immutable-root}/path/to/resourceA → /ipfs/{immutable-root}/path/to/resourceA

ipns://{mutable-root}/path/to/resourceB → /ipns/{mutable-root}/path/to/resourceB
```

The new identifier is made up of the CID of the IPFS or IPNS resource, then the path to the directory where that particular piece of content is, and the name of the file you are looking to retrieve:

Example:

```
ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html
```

> Native URIs must have a CID that is case-insensitive (no need for lower- or upper-cases) which is the format CIDv1 uses by default (as opposed to CIDv0 which _is_ case-sensitive).

Learn more in [docs.ipfs.tech/native-URIs](https://docs.ipfs.tech/how-to/address-ipfs-on-web/#native-urls)_

## Browsers
Web browsers and tools in the browser make it easy to access content on the distributed web.

### IPFS Companion Browser Extension

[IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a browser extension that simplifies access to IPFS resources and adds browser support for the IPFS protocol. It runs in <img src="https://unpkg.com/@browser-logos/firefox@2.0.0/firefox_16x16.png" width="16" height="16">Firefox (desktop and Android) and Chromium-based browsers including Chrome or Brave. Check out all of IPFS Companion's features and [**install it**](https://github.com/ipfs/ipfs-companion#install-ipfs-companion) today!


> Native URI requires CID to be case-insensitive. Use of CIDv1 in Base32 is advised.

_Source: [docs.ipfs.io/native-URIs](https://docs.ipfs.io/how-to/address-ipfs-on-web/#native-urls)_

### Centralization
HTTP gateways have worked well since 2015, but they come with a significant set of limitations related both to the centralized nature of HTTP and some of HTTP's semantics. Location-based addressing of a gateway depends on both DNS and HTTPS/TLS, which relies on a trust in certificate authorities (opens new window)(CAs) and public key infrastructure (opens new window)(PKI). In the long term, these issues should be mitigated by use of opportunistic protocol upgrade schemes.

### Protocol upgrade
Tools and browser extensions should detect IPFS content paths and resolve them directly over IPFS protocol. They should use HTTP gateway only as a fallback when no native implementation is available in order to ensure a smooth, backward-compatible transition.

### Path gateway
In the most basic scheme, a URL path used for content addressing is effectively a resource name without a canonical location. The HTTP server provides the location part, which makes it possible for browsers to interpret an IPFS content path as relative to the current server and just work without a need for any conversion:

```
https://<gateway-host>.tld/ipfs/<cid>/path/to/resource
https://<gateway-host>.tld/ipns/<ipnsid_or_dnslink>/path/to/resource
```

**Gateway Recipes**

_Read about [Gateway Recipes](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway-recipes)_


## IPFS In Web Browsers

<!-- What else should be included? Links? Can we pare it down?-->

Informal group working on improving IPFS presence in web browsers

Our goal is to facilitate native support for IPFS and other decentralized protocols in web browsers in order to benefit ....

* Browser users: Browser extensions and native-included IPFS alike expose IPFS features in a robust and intuitive way
* Web developers: Web developers can enjoy a smooth experience working with IPFS in browser contexts
* Browser vendors: Browser developers are empowered to meet the requirements of the distributed web

_Source: [ipfs/in-web-browsers repo](https://github.com/ipfs/in-web-browsers)_

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
- Get involved!
- Resources

## Current Projects

### IPFS Companion browser extension

[IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion#ipfs-companion) is a browser extension that simplifies access to IPFS resources and adds browser support for the IPFS protocol. It runs in <img src="https://unpkg.com/@browser-logos/firefox@2.0.0/firefox_16x16.png" width="16" height="16">Firefox (desktop and Android) and Chromium-based browsers including Chrome or Brave. Check out all of IPFS Companion's features and **install it** today!


<!-- image here -->

#### Notable past web extension experiments
- Mozilla hosted a community effort called [`libdweb`](https://github.com/mozilla/libdweb/) to implement experimental APIs for Firefox WebExtensions, with a goal of enabling dweb protocols in Firefox through browser add-ons:
 - IPFS [libdweb experiments](https://github.com/ipfs-shipyard/ipfs-companion/blob/libdweb/docs/libdweb.md), including a native protocol handler, local DNS-SD discovery and TCP transport
 - The long-term goal of this project was to integrate these APIs into the WebExtensions ecosystem, but as of Q3 2020 it is not yet in Firefox Nightly
- Exposing the IPFS API via `window.ipfs`(experiment ended in 2020)
- Support for `chrome.sockets.*` APIs in Chromium browsers (deprioritized due to EOL 2022)

### IPFS and the JavaScript ecosystem

At present, in order to interact with IPFS in a web browser, you must either bundle [`js-ipfs-core`](https://www.npmjs.com/package/ipfs-core) (a full IPFS node in JavaScript) with your client-side application or use the [`js-ipfs-http-client`](https://www.npmjs.com/package/ipfs-http-client) client library to connect to an external daemon running on a local or remote machine.

- To learn more, make sure to check the `browser-*` examples at [`ipfs-examples/js-ipfs-examples`](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)
 - Highlight: an advanced, end-to-end example of using js-ipfs node in `SharedWorker` from `ServiceWorker` can be found at [`js-ipfs-examples/browser-service-worker`](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-service-worker)

### How to Run Your Own HTTP Gateway

Use the latest [Kubo daemon](https://github.com/ipfs/kubo) and follow [gateway recipes](https://github.com/ipfs/kubo/blob/master/docs/config.md#gateway-recipes).

#### DNSLink

[DNSLink](https://dnslink.dev) enables you to map a domain name to an IPFS address (CID or IPNS libp2p-key) by means of a DNS TXT record.

- Read the [DNSLink guide](https://docs.ipfs.io/concepts/dnslink/) for details, including how to set it up on your own website
- See details on [DNSLink in IPFS Companion](https://docs.ipfs.io/how-to/dnslink-companion/) to see additional benefits of using IPFS Companion with DNSLink support

### Collaborations

#### [W3C](https://www.w3.org/Consortium/)

Protocol Labs is a W3C Member. Current focus is to watch, learn, and participate in [WebExtensions Community Group](https://www.w3.org/community/webextensions/).

#### IPFS and Igalia collaborate on dweb in browsers

In 2020 IPFS and [Igalia](https://www.igalia.com/) started a collaboration that continues to this day.
Read more: [https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/](https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/)  

The most notable highlights:

* IPFS and Igalia started a collaboration that will continue during 2021.
* Distributed web schemes have been safelisted in Chrome 86’s implementation of custom handlers and registered at IANA.
* Chrome 89 will allow browser extensions to register cross-origin handlers or handlers for schemes with prefix `ext+`. Refinement is pending for the permission UI.
* Firefox 84 marks `http://*.localhost/` URLs as [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), which means websites loaded from local [subdomain gateway](https://docs.ipfs.io/how-to/address-ipfs-on-web/#subdomain-gateway) will have access to the same Web APIs as HTTPS version.
* Firefox 84 has improved support for [loading locally delivered mixed-resources](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#Loading_locally_delivered_mixed-resources). Patches have also been submitted to WebKit but are pending on reviews and discussions.
* Work is in progress to improve Chromium’s consistency and specification compliance regarding the notion of [secure contexts](https://w3c.github.io/webappsec-secure-contexts/), including removing non-standard localhost names.
* Miscellaneous other fixes have landed for the Firefox and Chromium’s implementations of custom handlers.
* WIP refactor to make it easier to register custom protocol handlers (video: [Integrating New Protocol Handlers into Chrome [BlinkOn 15]](https://www.youtube.com/watch?v=kHIN6FkLAS8))


#### Brave

[Brave v1.19 has integrated IPFS into their desktop web browser](https://brave.com/brave-integrates-ipfs/) for Windows, macOS and Linux. When Brave detects an address which is an HTTP gateway URL to IPFS content or a native IPFS address such as `ipfs://` or `ipns://` it will prompt the user to install and enable the native IPFS node, or to use an HTTP gateway.
Diagnostic UI can be found at `brave://ipfs`, we suggest enabling IPFS Companion for the best experience

TLDR integration status:

- Initial release (v1.19) is focused on daemon orchestration and on URI support (read [blogs and press](https://github.com/ipfs/in-web-browsers/issues/64#issuecomment-763016248))
- Demo: Opening `ipfs://{cid}` will trigger install prompt for kubo (go-ipfs) managed by Brave itself.
- For the best experience enable IPFS Companion and switch it to IPFS Node Type ["Provided by Brave"](https://docs.ipfs.io/how-to/companion-node-types/#provided-by-brave).
 When Companion is enabled all IPFS resources will be resolved by the local node.

#### Opera

>>>>>>> main
Opera for Android 57 introduced support for resolving `ipfs://` or `ipns://` via a customizable gateway.
For more information [take a look at the official announcement](https://blog.ipfs.io/2020-03-30-ipfs-in-opera-for-android/).

### Puma Browser
[Puma](https://www.pumabrowser.com/) is a mobile-native browser that does not collect browsing cookies and integrates seamless peer-to-peer payments.

## Collaborations
Collaborations make it easy for other to build applications and use standards that make it possible for users to access content on the distributed web.

### W3C

Protocol Labs is a [W3C](https://www.w3.org/Consortium/) Member. Current focus is to watch, learn, and participate in [WebExtensions Community Group](https://www.w3.org/community/webextensions/).

### IPFS and Igalia team up

In 2020 IPFS and [Igalia](https://www.igalia.com/), an open source company with expertise in browser development and the web platform, started a collaboration that continues to this day. This opportunity has started discussions and has risen awareness of the distributed web. Their effort has brought much needed progress to bringing IPFS to Firefox and Chromium-based browsers. For more information [take a look at the official announcement](https://blog.ipfs.io/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/).

### IPFS and JavaScript

At present, in order to interact with IPFS in a web browser, you must either bundle [`js-ipfs-core`](https://www.npmjs.com/package/ipfs-core) (a full IPFS node in JavaScript) with your client-side application or use the [`js-ipfs-http-client`](https://www.npmjs.com/package/ipfs-http-client) client library to connect to an external daemon running on a local or remote machine.

- To learn more, make sure to check the `browser-*` examples at [github.com/ipfs-examples/js-ipfs-examples](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples)
- Highlight: an advanced, end-to-end example of using js-ipfs node in `SharedWorker` from `ServiceWorker` can be found at [github.com/js-ipfs-examples/browser-service-worker](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-service-worker)


### DNSLink

[DNSLink](https://dnslink.dev) enables you to map a domain name to an IPFS address (CID or IPNS libp2p-key) by means of a DNS TXT record.

To create a mutable pointer with [DNSLink](https://docs.ipfs.io/concepts/dnslink/), you need:
- A domain name you control (e.g. `www.me.com`)
- A CID or an IPNS name to link to, such as a website published with [Fleek.co](https://fleek.co/)

```
ipfs.tech -> /ipfs/QmYyg8yU6k5Zxwugiy32UhzJabdNC2Yac2y9nSmPr4K5FS
```

Finally, you can use an IPFS gateway using the `/ipns/[DNSLink]` resolution scheme to resolve DNSLink names, e.g. `https://ipfs.io/ipns/libp2p.io`. (notice this [follows the schema above](#get-files-through-an-ipfs-gateway))

#### Quick explanation of dnslink in IPFS

{{< youtube YxKZFeDvcBs >}}

Source: [Introduction to DNSlink](https://dnslink.dev/#introduction), [IPFS docs on DNSLink](https://docs.ipfs.tech/concepts/dnslink/)

{{% level type="[deep]" %}}
### How to Run Your Own HTTP Gateway | Devrel - Daniel Norman

You can use the latest [Kubo daemon](https://github.com/ipfs/go-ipfs) and follow [gateway recipes](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md#gateway-recipes) to turn your local node into a public gateway. Or checkout this step-by-step walkthrough tutorial to launch your own publicly available IPFS gateway to [Fly.io](https://fly.io/)

{{< youtube k1Hcg3B43Q4 >}}
{{% /level %}}

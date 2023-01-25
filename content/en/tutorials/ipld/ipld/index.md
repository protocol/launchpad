---
title: "IPLD Pathing Options"
description: "Use the IPFS API to manually navigate a DAG"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
    tutorials:
        parent: "tutorials-ipld"
weight: 232
category: tutorial
level:
- deep
---

## Background

In this tutorial, you are going to use the IPFS command line API to experience IPLD pathing features which allow you navigate a directed acyclic graph (DAG). You will be navigating the DAG of the [ipld.io](https://ipld.io) website that is hosted on IPFS, thanks to a service called [Fleek.co](/curriculum/dev-tools/fleek/).

Fleek.co can display a static website whose code is hosted on Github. So whenever there is a change to the [ipld.io github repo](https://github.com/ipld/ipld), the changes get added to IPFS through Fleek and the new CID gets updated automatically in the DNS server. Therefore, as you go through the tutorial the CIDs may be different depending on when you go though it.

## Pre-Requisites

* Install IPFS on the command line, if you have not done that yet, [check out this tutorial](https://curriculum.pl-launchpad.io/curriculum/ipfs/setup/)
* Download jq on the command line:
    * Linux or WSL: `sudo apt-get install jq`
    * Mac: `brew install jq`
* Open the [ipld.io](https://ipld.io/) website
* Have the [IPLD Gitub Repo](https://github.com/ipld/ipld) on hand

# video goes here

## Instructions
## Instructions
Once you have installed kubo (formerly go-ipfs) and initiated and ipfs node, start up ipfs with the command`ipfs daemon`, then open a second terminal window to follow the instructions below.
### Install jq

Jq is a tool to help the user view json text easier on the command line. You can go to [stedolan.github.io/jq/download](https://stedolan.github.io/jq/download) to find instructions for your operating system.

### Find CID for ipld.io website

```
ipfs resolve /ipns/ipld.io
```

You should see the following output in your CLI:

```
/ipfs/QmQ2ocFLq6d7ZiVEQfuEGEr4niJmdSscoyLkgTKRWmAEqg
````

This command can help you find the root CID for any website that is hosted on IPFS through [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/). Fleek makes websites readily available on IPFS by auto-updating the DNSLink with the most recent CID.

### Inspect the Root

Now that you have the root CID for the website ipld.io, you can inspect the DAG that makes up the data stored on IPFS


```
ipfs dag get QmQ2ocFLq6d7ZiVEQfuEGEr4niJmdSscoyLkgTKRWmAEqg | jq
```

You should see the following output in your CLI, which is a list of the CIDs below the root block:

```json
{
  "Data": {
    "/": {
      "bytes": "CAE"
    }
  },
  "Links": [
    {
      "Hash": {
        "/": "QmY55i3pt9gJh4po9cdRJzZFafPAwF7V8etP9xQsnBZ8sD"
      },
      "Name": "FAQ",
      "Tsize": 15452
    },
    {
      "Hash": {
        "/": "QmVWdcKiK2mWpDXQj9DtHsrBqzA4hSLxov5juvaS4wrCZD"
      },
      "Name": "css",
      "Tsize": 85864
    },
…

…
  {
      "Hash": {
        "/": "QmPNReXtnq8rDGJEbGGdYRxbiaZa7du1TZ782syYJodQM1"
      },
      "Name": "index.html",
      "Tsize": 26494
    },
    {
      "Hash": {
        "/": "QmcVrQ8Bhk2S858P4sSedR9PNc8pq2zvLXpsTTPRnLZk86"
      },
      "Name": "x",
      "Tsize": 685
    }
  ]
}
```

This has pulled in the next level of blocks connected to the root CID onto your local ipfs node, printed in DAG-JSON format. We use the `jq` command to print the json in an easy-to-read layout.

> The original block is actually DAG-PB format which is used to construct UnixFS file data in IPFS.  If you inspect the binary format of the data with `ipfs block get QmQ2ocFLq6d7ZiVEQfuEGEr4niJmdSscoyLkgTKRWmAEq` you will get illegible information, since it is raw DAG-PB bytes.

DAG-PB has two top-level properties: `Data` and `Links`. The data field has the actual bytes contained in a block. Each `Link` in DAG-PB has a name, a CID and a size. The links contain the `Hash` or CID for the data below. The links (called `"Hash"` in the DAG-PB) can also be inspected, leading you another level down (to the children) of content in that Merkle tree.

![data and links](data-links.png)

You can see here the has of the `"Hash"` or CID of the index.html page for the website.

![index.html hash](index-hash.png)



### Load a Page With a File Path

When a client (i.e a website/a browser via an IPFS gateway) loads a root like in the following manner and doesn’t find a single page, it will look for an `index.html` link, which [ipld.io](http://ipld.io/) has. In this case, the `Links` field is empty, but the `Data` field contains a lot of bytes so the client will load those in. The bytes are Base64 encoded.

```bash
ipfs dag get Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/index.html | jq

```

You should see the following output in your CLI:

```json
{
    "Data": {
        "/": { "bytes": "CAIS0s4BPCFET0NUWVBF... "}
    },
    "Links": []
}
```
If you want to navigate to any other block using IPFS pathing, just add the name of the link in the path, similar to what you would do in a linux filesystem.

As an example, take a look at this directory in the [IPLD website github repo](https://github.com/ipld/ipld/tree/master/docs/codecs/known):

![IPLD Repo](ipld-repo.png)

You can inspect this by simply adding the filepath on the end of the root CID like so:

```bash
ipfs dag get Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/docs/codecs/known | jq
```

This command traverses the IPLD structure & finds the CID of the root of the `/docs/codec/known` directory on Github.

### Loading a Page with IPLD Pathing

DAG-PB is a special case within ipfs, because when supplying a path attached to a CID, it will interpret the blocks and look for named links for us. This isn’t the case for blocks of any other codec (e.g. DAG-CBOR). We can switch out of this special-case mode and explicitly say that we want to use raw-IPLD pathing by prefixing our root block CID with `/ipld/` so we can _path_ through the DAG-PB’s block properties for ourselves.

```bash
ipfs dag get /ipld/Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/Links/7/Hash | jq
{
    "Data": {
        "/": { "bytes": "CAIS0s4BPCFET0NUWVBF..." }
    },
    "Links": []
}
```

`Links` is an array field, so we use the number 7 to identify which child block we want to access. In this case, we’re going to navigate into the `Hash` and that will load the block with that CID. Now we can also move into accessing only the _raw_ bytes by adding `Data` to the end of the path, as opposed to accessing the DAG-PB formatted block:

```bash
ipfs dag get /ipld/Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/Links/7/Hash/Data | jq
{
    "/": {  "bytes": "CAIS0s4BPCFET0NUWVBF... "}
}
```

### Switching codecs

We are now at a simple byte array, it looks complex because DAG-JSON has to present bytes in this way, but we can change the codec to view the `RAW` codec and view the bytes _as they are_.

```bash
ipfs dag get --output-codec=raw /ipld/Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/Links/7/Hash/Data

��<!DOCTYPE html>
<html class="no-js" lang="en-US" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
<head>

...

<link rel="stylesheet" href="css/tachyons.min.css" />

<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet"/>

<title>IPLD - The data model of the content-addressable web</title>
…
…
```

### Exercise: Using IPLD Pathing to go deep into the DAG

Now that you have learned the basics of IPLD pathing options, we challenge you to navigate to a block **at least** 4 layers deep or more into the ipld.io dag and submit the command you used to reach that point.

{{% embed src=https://docs.google.com/forms/d/e/1FAIpQLSejZokLiXjhecn6Aqr7VXhafsZVOeUeDM1sm76ykiAHtV4SRA/viewform?usp=sf_link width="100%" height="800px" %}}

Here is 1 possible answer:
```bash
* ipfs dag get /ipld/Qmb2TK3N6M2SQj3JaLJhGWPcpmtyvuHhZdSMADMGrLnpnQ/Links/3/Hash/Links/1/Hash/Links/1/Hash/Links/2/Hash/Links/0/Hash
```

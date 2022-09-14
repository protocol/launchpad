title: "IPFS Setup & Basics (Tutorial)"
description: "Deep Dive Tutorial – Setup & Access Files with the IPFS CLI"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 80
category: tutorial
level:
- shallow
- deep
---

### Background
In these tutorials you can get started with installing go-ipfs (also known as kubo), and doing some basic things with the filesystems.

### Prerequisites
* A shell where you can run Unix command either on a Mac, or Unix machine, or Windows [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
  * Optional: [a Linux VM like Multipass](https://multipass.run/)
* [wget](https://www.tecmint.com/install-wget-in-linux/)
* [Installation Instructions](https://docs.ipfs.io/install/command-line/#system-requirements)
>  When you run `ipfs daemon`, if you get the error: `lock <path>/.ipfs/repo.lock: someone else has the lock`, run the command `killall ipfs` and try again

### Instructions – Getting Started with IPFS


#### Video – Getting Started with IPFS
This video is the basic setup for ipfs-go on a linux machine, using [wget](https://www.tecmint.com/install-wget-in-linux/) to grab the resources. You will also `ipfs init` a node and get it running with `ipfs daemon`.

{{< youtube A7yZaYhrwyM >}}

### Instructions – IPFS Basics: Accessing Files
In this tutorial, you can follow along to understand the basics of how you, as a user, can access, add, and pin files in IPFS.  Follow along with the examples to learn about pinning and adding files, how files from IPFS can be previewed and inspected, and learn a bit about how that data is created and stored on IPFS.

#### Video – IPFS Basics: Accessing Files

{{< youtube EkQfoQprA8s >}}

#### Resources
* [Video Script](https://www.notion.so/protocollabs/Script-IPFS-Basics-Working-with-Files-in-IPFS-4102dc71f5dc4bf49b274bdfcee4c162)
* [Docs](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online)
* Get a CID of a file by starting IPFS and visiting `localhost:5001/webui` in your browser, checking out _Explore_

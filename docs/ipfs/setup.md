---
description: Deep Dive Tutorial – Setup & Access Files on IPFS
---
## IPFS Command Line Interface (CLI) Setup

### The Basics
In these tutorials you can get started with installing go-ipfs (also known as kubo), and doing some basic things with the filesystems.

### Getting Started with IPFS
This video is the basic setup for ipfs-go on a [linux VM](https://multipass.run/), using [wget](https://www.tecmint.com/install-wget-in-linux/) to grab the resources. You will also `ipfs init` a node and get it running with `ipfs daemon`.

The examples in this exercise are done on a Linux machine, however the process is similar for other operating systems

{% embed url="https://youtu.be/A7yZaYhrwyM" %}

#### Download the IPFS Binary
The first thing you will need to do is [go to the IPFS documentation](https://docs.ipfs.io/install/command-line/#official-distributions) and download the latest distribution for your operating system using `wget` or `curl` command, from the most [recent IPFS distribution](https://dist.ipfs.io/#go-ipfs) for your operating system.

To install IPFS on Linux, use the command:

```shell
wget https://dist.ipfs.io/go-ipfs/<version>/<package>
```

### Extract and Install IPFS
Once you have the correct biary installed for your opearting system installed, you can extract the compressed package:

```shell
tar -xvzf <package name>
```

Next, install is on your machine using the script provided in the package:

```shell
bash install.sh
```

Check to make sure that you have sucessfully installed IPFS by checking the most recent version:

```shell
ipfs --version
```
<!-- Q. When you ran the command to check the IPFS version, did you get a confirmation that you had the most recent version of IPFS?
a. Yes (Correct)
b. No -->

### Start and Stop an IPFS Node


#### Resources
* [Installation Instructions](https://docs.ipfs.io/install/command-line/#system-requirements)
* When you run `ipfs daemon`, if you get the error: `lock <path>/.ipfs/repo.lock: someone else has the lock`, run the command `killall ipfs` and try again


#### IPFS Basics: Accessing Files
In this tutorial, you can follow along to understand the basics of how you, as a user, can access, add, and pin files in IPFS.  Follow along with the examples to learn about pinning and adding files, how files from IPFS can be previewed and inspected, and learn a bit about how that data is created and stored on IPFS.

{% embed url="https://www.youtube.com/watch?v=EkQfoQprA8s" %}

#### Resources
* [Video Script](https://www.notion.so/protocollabs/Script-IPFS-Basics-Working-with-Files-in-IPFS-4102dc71f5dc4bf49b274bdfcee4c162)
* [Docs](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online)
* Get a CID of a file by starting IPFS and visiting `localhost:5001/webui` in your browser, checking out _Explore_


**Links**

**IPFS** | [Docs](https://docs.ipfs.io) | [GitHub](https://github.com/ipfs) - **IPLD** | [Docs](https://ipld.io/docs/) | [GitHub](https://github.com/ipld) - **libp2p** | [Docs](https://docs.libp2p.io) | [GitHub](https://github.com/libp2p) - **Filecoin** | [Docs](https://docs.filecoin.io) | [GitHub](https://github.com/filecoin-project)

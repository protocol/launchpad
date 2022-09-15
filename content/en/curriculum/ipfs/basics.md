---
title: "IPFS CLI Basics (Tutorial)"
description: "Deep Dive Tutorial – Access Files with the IPFS CLI"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
weight: 105
category: tutorial
level:
- shallow
- deep
---

## Background
In this tutorial you can do some basic things with the public IPFS filesystem. This video tutorial provides instructions for how to install and run commands with the IPFS API using a Unix-type shell & operating system.

## Prerequisites
* The [latest version of Go (golang)](https://go.dev/doc/install)
* A shell where you can run Unix-type commands either on a Mac, or (Li)Unix machine, or Windows [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
* IPFS [installed on the OS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions) your are using
* IPFS Docs' [kubo (go-ipfs) Command-line commands](https://docs.ipfs.tech/reference/kubo/cli/#ipfs)


## Instructions

In this tutorial, you can follow along to understand the basics of how you, as a user, can access files in the public IPFS network. Follow along with the examples to learn about pinning and adding files, how files from IPFS can be previewed and inspected, and learn a bit about how that data is created and stored on IPFS.

### Video – IPFS CLI Basics: Accessing Files

{{< youtube EkQfoQprA8s >}}

### Start and Stop an IPFS Node
In the previous tutorial, you learned how to start and stop and IPFS node in the command line.

* Run `ipfs daemon` in the CLI to start your new node.

>  When you run `ipfs daemon`, if you get the error: `lock <path>/.ipfs/repo.lock: someone else has the lock`, it means there is another instance running on your machine. Use the command `killall ipfs` and try again



* You can stop your node by pressing `cntrl + c` twice in a row in the same terminal it's running in, or typing `killall ipfs` in another window.

<<<<<<< HEAD
### See your IPFS Peers (Swarm)
=======
### See Your IPFS Peers (Swarm)
>>>>>>> main

### Read an IPFS File

### Get and IPFS File with a CID

### Add a File to your IPFS Node

### List Pinned Files on your Node

### Pin a File from the IPFS Network

<<<<<<< HEAD
### List Specific Files from a CID
=======
### List Specific File from a CID
>>>>>>> main

#### Resources
* [Video Script](https://www.notion.so/protocollabs/Script-IPFS-Basics-Working-with-Files-in-IPFS-4102dc71f5dc4bf49b274bdfcee4c162)
* [Docs](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online)
<<<<<<< HEAD
* Get a CID of a file by starting IPFS and visiting `localhost:5001/webui` in your browser, then checking out the _Explore_ section.
=======
* Get a CID of a file by starting IPFS and visiting `localhost:5001/webui` in your browser, checking out _Explore_
>>>>>>> main

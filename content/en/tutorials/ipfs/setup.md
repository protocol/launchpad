---
title: "IPFS CLI Setup"
description: "Deep Dive Tutorial – Setup the IPFS CLI"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
    tutorials:
        parent: "tutorials-ipfs"
weight: 80
category: tutorial
level:
- shallow
- deep
---

## Background
In this tutorial you can get started by installing go-ipfs (also known as kubo), and starting & stopping a node

## Prerequisites
* The [latest version of Go (golang)](https://go.dev/doc/install)
* A shell where you can run Unix-type commands either on a Mac, or (Li)Unix machine, or Windows [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2)
  * Optional: [a Linux VM like Multipass](https://multipass.run/)
* Install [wget](https://www.tecmint.com/install-wget-in-linux/) on the operating system (OS) you are using
* IPFS Docs' [installation instructions](https://docs.ipfs.io/install/command-line/#system-requirements)


## Instructions

### Video – Getting Started with IPFS
This video is the basic setup for [kubo](https://github.com/ipfs/kubo) on a linux machine, using [wget](https://www.tecmint.com/install-wget-in-linux/) to grab the resources. You will also `ipfs init` a node and get it running with `ipfs daemon`.

{{< youtube A7yZaYhrwyM >}}

### Install go-ipfs (kubo)
Refer to the [IPFS Docs' installation instructions](https://docs.ipfs.io/install/command-line/#system-requirements) for the operating system you are using.

### Initialize an IPFS Node
First you will want to verify that you have ipfs correctly installed on your machine.

* Run the command `ipfs --version` to check it is installed. If you don't get a version number, try uninstalling & installing again.

Before you can run the ipfs daemon, you have to initialize and instance of IPFS on your machine, creating a node identity identified with `peer identity:` in the output of the CLI.

* Run `ipfs init` in the CLI

In the folder where you have initialized your node, you should be able to see a config file called `.ipfs`, which has data about your node. Run the command to list the directories as a long list (`-l`) where hidden (`-a`) files aren't ignored

```
ls -la

➜ drwxr-xr-x   10 <folder/name>  staff          320 Sep 12 17:37 .ipfs
```

You can change directory (`cd`) into the `.ipfs` directory to see the contents of the config file and list (`-ls`) the contents:

```➜
cd .ipfs

➜  .ipfs ls
api            blocks         config         datastore      datastore_spec keystore       repo.lock      version
```





### Start an IPFS Node
Now that an instance had been created on your machine, you can start your IPFS node which will communicate and share data with other nodes on the network.

* Run `ipfs daemon` in the CLI to start your new node.

>  When you run `ipfs daemon`, if you get the error: `lock <path>/.ipfs/repo.lock: someone else has the lock`, it means there is another instance running on your machine. Use the command `killall ipfs` and try again

### Stop an IPFS Node
When the IPFS node is running, any information you have pinned to that node is available, and you are able to retrieve data from the public IPFS network without a gateway.

You may, however want to stop your node from time to time, and you can do so by pressing `cntrl + c` twice in a row in the same terminal it's running in, or typing `killall ipfs` in another window.

---
title: "Bacalhau"
description: "A Computer Over Data Framework for IPFS"
draft: false
menu:
  curriculum:
    parent: "curriculum-devtools"
category: lecture
weight: 20
level:
- shallow
- deep
---

Bacalhau is a framework that allows you to perform distributed computations on IPFS.  These computations are executed in the form of Docker containers or WASM programs.

The **Bacalhau network is a set of computers (nodes) working ready to perform computations**.
You can send your computation (Docker container or WASM) to the Bacalhau network and then read the results.
Every computation has an _input_ and an _output_.
In Bacalhau, the main idea is that the **input is taken from IPFS, and the output is published to IPFS**.

For example, consider that you have a Python script stored on IPFS, with CID `QmR1...`.
This script prints numbers from 0 to 100, and you want to execute it on the Bacalhau network.

![Bacalhau Overview](bacalhau-overview.png)

First, you provide the CID of the Python script to the Bacalhau network.
The script is fetched from IPFS, and is executed by one or several Bacalhau nodes.
After the computation is finished, the results (the numbers printed) are published to IPFS, with a new CID, `QmFH...`.

## Why Is It Important?

Bacalhau opens up the possibility for a market where clients can pay Bacalhau providers to perform these compute functions over data in and IPFS network, saving the clients time and effort of downloading large datasets, and creating a new type of incentive for those who are providers in an IPFS network.

* Sometimes, **you need to perform tasks that are heavy in computational terms**, and you may not have the right hardware to execute them.
The Bacalhau network **provides you with a wide range of machines and resources** that you can use to run your computations.

* Bacalhau offers **built-in integration** with IPFS.
You can use IPFS files and folders as an input in your computations, and the results are stored in IPFS.

* Bacalhau **nodes have the ability to bid for executing computations**

* With Bacalhau, there is the possibility of a **new market and incentivizationfor those who provide the infrastructure** of distributed IPFS networks.

## Architecture

Every node in the Bacalhau network can act as a _requester node_ or a _compute node_.
Requester nodes are responsible for receiving the computations (in technical terms, called **jobs**) and delegating them to one or several compute nodes.
Compute nodes are responsible for performing the actual computation.

![Bacalhau High Level Architecture](bacalhau-architecture.png)

The lifecycle of a job in Bacalhau is a complex task that includes several steps and verifications.
You can read everything about the Bacalhau architecture in the [official documentation](https://docs.bacalhau.org/about-bacalhau/architecture).

## The Bacalhau CLI

Sending your computations and communicating with the Bacalhau network is pretty easy by using the Bacalhau CLI.
The `bacalhau` command installed on your computer allows you to send a new job (computation), retrieve its status, or get its results.

```bash
> bacalhau docker run ubuntu echo Hello World
```

The previous command creates a new job in Bacalhau network by using a Docker image.
Specifically, it runs an Ubuntu container and executes `echo Hello World` inside the container.

You can then verify the status of the job by executing the following command.

```bash
> bacalhau list --id-filter=${JOB_ID}
```

If you are familiar with Docker, you should identify the `docker run` command, which allows you to execute Docker containers.
The Bacalhau CLI adds several options on top of this command.

```bash
> bacalhau docker run \
-v QmfKJT13h5k1b23ja3ZCVg5nFL9oKz2bVXc8oXgtwiwhjz:/files \
ubuntu cat /files/read_csv.py
```

In the previous example, the command `cat /files/read_csv.py` is executed inside an Ubuntu container.
The `-v` (volume) option allows you to mount an IPFS file or folder to a directory inside the Docker container.
The IPFS folder with CID `QmfKJT13h5k1b23ja3ZCVg5nFL9oKz2bVXc8oXgtwiwhjz` is mounted to the `/files` directory inside the container. Therefore:
1. An Ubuntu Docker container is created
2. The `QmfKJT13h5k1b23ja3ZCVg5nFL9oKz2bVXc8oXgtwiwhjz` IPFS folder is mounted to the `/files` directory inside the container.
3. The file is read by using the `cat` command.

Now that you understand the basics of Bacalhau, check out the great examples in the [official documentation](https://docs.bacalhau.org/examples/).

## Resources

* [Bacalhau Examples](https://docs.bacalhau.org/examples/)
* [Running a Bacalhau Node](https://docs.bacalhau.org/running-node/quick-start)
* [Bacalhau CLI Reference](https://docs.bacalhau.org/all-flags)

---
title: "Forest"
description: "Rust client for the Filecoin network"
draft: false
menu:
  curriculum:
    parent: "curriculum-devtools"
weight: 0
category: lecture
level:
- shallow
- deep
---

## <Dev Tool> Introduction
Forest is the rust client for the Filecoin network. Forest adds to the client diversity, network resiliency, network democracy, decentralization and overall adoption of Filecoin. 

## Why Use/ Who Uses <Dev Tool>
Forest put its focus on being a light infrastructure node and having an enhanced developer experience. A few key developments include:

- the ability to generate its own snapshots for calibration and main network
- the ability to generate snapshots with 10 GB memory 
- fast snapshot download time: main net (under 1 hour), calibration net (under 1 mintute)
- the ability to switch networks during runtime with a flag 
- the ability to run Forest with docker containers 


## Tutorial 
Please follow the [Forest documentation](https://github.com/ChainSafe/forest) if you are interested in running the node. 


## Coming Next
A few key features that you can expect from the Forest client in the near future:
- Full functional Filecoin wallet handling 
- The ability to make storage and retrieval deals
- A javascript console into the Forest CLI (inspired by Geth Go Ethereum Client) for developers to retrieve chain data, interact with chain state, etc 

## Resources
* [Forest repo](https://github.com/ChainSafe/forest)
* [Forest releases](https://github.com/ChainSafe/forest/releases)
* [Forest wiki](https://github.com/ChainSafe/forest/wiki)


## Support
Reach out to Lee R (Forest TPM) at lee@chainsafe.io or David H (Forest Team Lead) at david.himmelstrup@chainsafe.io for any questions or collaborations! 
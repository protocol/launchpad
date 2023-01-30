---
title: "Switch Networks"
description: ""
draft: false
menu:
    tutorials:
        parent: "tutorials-metamask-intro"
weight: 10
category: tutorial
---

{{< beforepages text="This tutorial expects you to have a Metamask wallet ready to use. Learn how to create it in the following tutorial.">}}
  {{< beforepages-element page="/tutorials/metamask-intro/create-wallet" >}}
{{< /beforepages >}}

By default, Metamask is connected to the **Ethereum Mainnet**.
If you want to operate with other EVM-compatible tokens, you must **switch the network**.

**ChainList** ([chainlist.org](https://chainlist.org/)) is a web site that provides public information about EVM networks, such as Filecoin or Polygon.
In the EVM space, every network (mainnet and testnet) receives a _chain ID_, which uniquely identifies the network.

In this tutorial, we will connect Metamask to the Filecoin network, specifically the _Wallaby testnet_.
Although you can introduce the network details manually, ChainList offers a `Connect Wallet` button to easily add a network to Metamask.

## Instructions

1. Go to [chainlist.org](https://chainlist.org/).
1. Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

   ![Select a testnet in Chainlist.](chainlist-select-test-networks.png)

1. Scroll down to find the **Filecoin -- Wallaby** testnet:

   ![Find the Filecoin Wallaby testnet in Chainlist.](chainlist-filecoin-wallaby.png)

1. In MetaMask click **Next** and then **Continue** when prompted to connect Chainlist.org to MetaMask:

   ![Connect Chainlist to MetaMask.](chainlist-connect-with-metamask.png)

1. Back on the Chainlist.org page, click the **Filecoin -- Wallaby** testnet connect button again.
1. In MetaMask click **Approve** when prompted to _Allow this site to add a network_:

   ![Allow Chainlist to change networks.](chainlist-allow-site-to-add-a-network.png)

1. Click **Switch network** when prompted by MetaMask:

   ![Switch networks with Chainlist.](chainlist-switch-network.png)

1. Open MetaMask, and you should see that you're now on the Filecoin Wallaby testnet:

   ![Complete the process with Chainlist.](chainlist-complete.png)

Nice! Now we've got the Filecoin Wallaby testnet set up within MetaMask. You'll notice that our MetaMask window shows `0 TFIL`. Test-filecoin (`TFIL`) is `FIL` that has no value in the _real world_, and developers use it for testing.

---
title: "Drand (Tutorial)"
description: "Distributed, Unpredictable, Publicly-Verifiable, and Decentralized Randomness Generator"
draft: false
menu:
    curriculum:
        parent: "curriculum-filecoin"
weight: 423
category: lecture
level:
- deep
---
This example goes over how to use Drand as a client to retrieve a random value in a key-value pair list. 

**If a code section loads as a single line, try refreshing the page.**

## Pre-Requisites
* Make sure you have Node version 12 or greater installed. You can find instructions on how to do that on the [NodeJS website](https://nodejs.org/en/).
* Clone the [launchpad-tutorials](https://github.com/protocol/launchpad-tutorials) repository and run `npm install`
   1) `npm install`
   2) `node bias.js`

## Caveats
* Drand mainnet releases a random number every 30 seconds. So if you run your results immediately after the other, you may get the exact same output. The problem that arises is if you want to test if the biased randomness works or not over time, it would take a really long time to test.
* This "biased" algorithm is not sophisticated, it takes a random number and compares it against the list of user provided items, the last number smaller than the random number is chosen.

## Instructions
Imagine you are a full time L5 software engineer and have more important things to think about than what to get for lunch.
You decide to leave it up to randomness to choose your next meal. But you still have preferences. You assign weights to your preferences such that items you would like to eat most often have heavier weights (chances of being chosen). And things you don't want to eat as often, have smaller chance of being chosen.

To be able start talking with the Drand network you will need to import the necessary libraries.

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmrodriguez3313%2Fdrandexample%2Fblob%2Fmain%2Fbias.js%23L1-L12&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

Now we can make calls to the Drand network. But to do that we have to create the Client to get the latest random number published.

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmrodriguez3313%2Fdrandexample%2Fblob%2Fmain%2Fbias.js%23L19-L28&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

`client.get()` is an asynchronous function that returns an object where you can access the random number with `res.randomness`. This returns a 64-digit hexidecimal number as a **string**.

We do not need 64 digits for this simple example let alone for them to be in hex. For our example we can just grab the first two digits from `rand` and convert it base 10. This will make it easier to compare the user weights to our random number.

``` javascript
rand = randomness.slice(0, 2);
randomDecimal = parseInt(rand, HEX); // HEX = 16
```

 Unfortunately, a two digit Hexadecimal value [doesn't always convert to a 2 digit decimal number](https://kb.iu.edu/d/afdl). So we create a simple ["sliding window"](https://www.geeksforgeeks.org/window-sliding-technique/) function to find the first pair of digits that converts properly.
 
<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmrodriguez3313%2Fdrandexample%2Fblob%2Fmain%2Fbias.js%23L47-L61&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

Now that we have our random number we compare it against our food options to find out what we are having for lunch. This simple algorithm converts the user weights provided as decimal numbers to be integers, and adds the sums, the first weight that isn't bigger than our random number is what we are having for lunch.

For example here is our food options,:
``` javascript
const FoodOptions = { "pho": 0.3, "croquets": 0.29, "pizza": 0.28, "pasta": 0.07, "molé_verde": 0.03, "shrimp": .03 };
```
<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmrodriguez3313%2Fdrandexample%2Fblob%2Fmain%2Fbias.js%23L33-L40&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
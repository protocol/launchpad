---
description: Add the subtitle here
---

# The Filecoin Protocol

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FdJC0yfHL6n4VMktmNXWq%2Fuploads%2F9pAg4DeJpIPYM1f2YYOB%2Fimage.png?alt=media\&token=e8d41405-726d-4712-935d-32772618e21f)

### Sealing & Proving new Sectors <a href="#how-sealing-and-proving-works" id="how-sealing-and-proving-works"></a>

{% embed url="https://youtu.be/Nmw66GZyf48" %}

#### How Filecoin Actors Work | Zenground0

In this talk, learn about the capabilities of Filecoin Actors. _Note this link is private and you should ping maintainers for access_

{% embed url="https://drive.google.com/file/d/1YhJ7a-BnuPl0OOUxV_2ZV6ayxb7TFyi6/view?usp=sharing" %}


### How the Filecoin Protocol Works
 [Filecoin School Resources](https://drive.google.com/drive/folders/1stQQlqN-V7tBwfSAcyLKnhCuViCTbwWm)

 [![image](https://user-images.githubusercontent.com/618519/156397357-e5108eb5-2064-472e-b426-60d1f2ba1aad.png)](https://drive.google.com/drive/folders/1stQQlqN-V7tBwfSAcyLKnhCuViCTbwWm)

#### Program Agenda

* **Introduction (30mins)**
  * Filecoin introduction (10mins)
    * Storage Market
    * Storage-based blockchain
  * General VM and blockchain (20mins)
    * Understanding Tipset VM
    * Actors
    * Cron Actor
* **Mining cycle I (1h)**
  * Protocol Overview (10mins)
    * Power table
    * Sectors
  * Adding storage (10mins)
  * Maintaining storage (10mins)
  * Storage Faults protocol (20 mins)
* **Mining Cycle II (1h)**
  * Earning block reward (20 mins)
    * Leader Election
    * Winning PoSt
  * Summary of Miners duties (10mins)
    * WinningPoSt
    * WindowPoSt
    * ProveCommit
* **Important FIPs (20mins)**
  * First faults
  * Optimistic Window PoSt
  * Deep dive into
* **Specific Actors (1h)**
  * ​[Storage Miner Actor](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/miner/miner\_actor.go)
  * ​[Storage Power Actor ](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/power/power\_actor.go)​
  * ​[Cron Actor](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/cron/cron\_actor.go)​

<details>

<summary>Protocol School Notes</summary>

* **Introduction (30mins) \[Nicola]**
  * _Filecoin introduction (10mins)_
    * Filecoin has 2 parts/products re-using the same resource: space
      1. Decentralized Storage Market (Verifiable storage: you can store other people data in a verifiable way)
      2. Storage Based Consensus (Storage of someone's data gives you power, power gives you block reward)
         * Storage can be re-used for market
         * Incentives to honest behaviour
      3. Total supply: 2 billion of filecoin in total
  * _General VM and blockchain (20mins)_
    * Transactions are called "messages"
      * From one actor to another actor
        * Actor is something that talks over the blockchain via functions
          * If A sends X to B means Actor A calls function pay with input X to actor B
          * Message goes in a pool
          * Who wins the block takes some messages and puts them in a block. He then propagate block to the network
    * Contrary to other blockchains, have possibly multiple blocks in the same epoch.
      * Epochs measure times, not blocks. 1 epoch every 30 seconds
        * A set of block for each epoch
        * One block links to 2 former blocks in the former epoch
        * How many blocks? On expectation 5 for each epoch
        * You need to wait the end of an epoch in order to execute the blocks (you can not execute blocks on the spot: different from Ethereum for example): at epoch X+1 you run transactions of the blocks in epoch X
          * Deterministic order for executing transactions
          * Duplicated transactions are not executed
          * This can lead to some problems
          * You can update a state when you execute the former epochs blocks
            * You can not have two different state in the epoch, since you have deterministic execution
        * How do you know you have all the blocks?
          * Each block is linked to parents blocks from the former epoch
          * You must need all the parents blocks a particular block points to \\
    * How do we process blocks? You execute blocks in the virtual machine
      * The block comes, you execute transaction in order in the VM
      * In the VM there are actors \[balances, miner, storage market..]
      * Each time you have an action in the blockchain you ask one actor to call to another actor through functions
      * Everything that goes to the VM updates the VM state
      * Final state of an epoch gets stored in a block
      * One change of state for each epoch
  * _Actors_
    * Actors have methods which can be called
    * Actors can call other actors
      * They send messages with each others
      * Actor are triggered by users apart cron actor
    * Cron Actor
      * Only actor not triggered by users.
    * Cron, Market, Power actor are the only unique actors
    * Other actors are not unique (you have many address actors for example)
    * Address:
      * Every actor has two addresses
        * An incremental id (f0)
        * A robust address
          * Difference:
            * robust is a long unique address
            * Incremental id: short message, assigned in the consensus by the blockchain, you need to wait finality blocks to get them finalized
      * Other addresses generated in different ways
        * From 01 to 99 reserved to PL
        * F1 accounts account actors
    * Genesis actor: actor in the system to stay
      * System, Init, Reward, Power (total power in the network), Market, VerifiedRegistry, BurntFunds (fees which are burnt)
  * State: set of actors, updated every epoch
    * Gas = how much it costs to make a state update (via calling different functions that update the state)

<!---->

* **Mining cycle I (1h) \[Nicola]**
  * _Protocol Overview_
    * Key Concepts
      * Miners: store clients file and participate inc onsensus
      * Clients: delegate storage of data
      * Sector: unit of storage
        * It can be full of data/empty/partially empty
        * Today sectors content can not be updated
        * Sectors with no deals on it: CC sector
        * Deal: between miner and client about data storage
        * Two sector size 32 and 64 GB
        * You create a sector through Sealing
          * Unsealed sector: you have some data
          * Sealing: you take unsealed sector and run sealing on it (not in the network at this stage)
          * How do I put it in the network?
            * Adding the sector to the network and prove it
              * Call your actor and post a precommit (no prove on the sector here) message on chain with
                * the hash of the sealed sector
                * The list of deals sector is storing
                * ⇒ sector is given an ID
                * ⇒ network knows you are about to prove a sector
              * Prove a sealed sector (not proven yet!)
                * You wait 150 blocks, you pick a randomness and you locally generate a proof
                * You post the proof onchain with a proveCommit message
                * Chain checks proof is correct
                * ⇒ this gives a proof that you did it right
                * ⇒ storage is committed
              * After 24 hours of storage your sector is active and counts for power
              * If you prove every 24 hours the sector is kept active
                * If you don t prove it the sector is marked at faulty
                * If yu don t recover it the sector is terminated
        * If a sector is Committed Capacity (CC, no deals) it counts 32GiB
        * If a sector has delas, it still counts 32GiB
        * If a sector has verified deals you will have up to 320 GiB (according to quality adjustment coefficient) \\
  * Mining Cycle \[Sector Lifetime]:
    * Register a Miner
    * Add Storage
      * A Miner makes deals and publish them into the market
      * Miner seal the sector using special randomness from the past
        * So that you link a sector to a particular chain (you can not reuse it in a fork)
      * Miner send a precommit message as described before
        * Lock funds as precommit deposit
      * Miner waits 150 block
        * Pick randomness from 150th block
        * 24h of time to post proveCommit
          * Penalty if you don t \[lose precommmit deposit]
          * If you proveCommit in time you get back preCommit deposits and you have tu put initial pledge. Storage power is given to the miner for that sector
            * It is partially burnt in case of faults/bad service
    * Maintaining Storage/Power
      * MIners maintain power submitting a Proof of Spacetime \[WindowPoSt]
        * First one \~24h after provecommit ⇒ it turns sector from committed to active
          * Sector added to the power actor \[power table: all the power in the network accounted by miner, according to sector quality]
        * 1 windowpost every 24h for maintaining power \[aka maintaining the sector active]
          * How account for time? A miner is associated with a proving period start: at the end of each proving period you reset it and so on: each proving period lasts 24h
          * Each proving period has 48 deadlines (1 each 30 mins)
            * 48 slots, sectors gets associated with deadline (75 TiB per deadline at most. When one deadline is full you go and fill the next one. )
            * For each deadline you have 30 min prove via windowpost all the sectors belonging to that deadline
              * 30 min depends on the size of the proofs ⇒ distribute proofs through time
                * Legacy item after last snark improvements
              * Deadline opens at time t, lasts for 60 blocks and closes. If you have faulty sectors you need to announce them in before a particular fault cutoff \[of you'll pay higher fees]
                * You need to declare faults before getting the challenges (we want miners to declare faults when they have, not after checking if they got lucky with challenges )
              * If you don't post a windowpost the sectors that belong to that proof are considered inactive and removed from the miner's power \\
        * Important point: Check windowpost is expensive: we decided to go for optimistic windowpost
          * We assume windowpost are correct but are not checked by default
          * Any node can check proofs independently and wrong proofs get spotted, correspondent miners get highly penalized
          * 24 hours of time to check a windowpost
          * This approach saves gas \[from each block being occupied by windowpost gas costs to once per day cost for eventually spotting bad windowpost proofs]
        * Power actor keeps track of all of above involving power add/maintenance
        * Prove Commit costs are still high
          * This makes the growth of the chain to be kind of constant (not ideal...we should find strategies to improve on this \[better snarks])

<!---->

* **Mining Cycle II (1h) \[Nicola]**
  * _Storage Faults_
    * Declare and Recover Faults
      * A sector can be marked as faulty
        * Miner declares fault for a sector \[declare fault]
          * Which deadline which sector
          * Sector will be marked as faulty but remains active until deadline. At deadline power adjustments happen
        * If not, miner can not generate windowpost for that sector. \[skipped fault]
          * When Submitting a Windowposrt miner marks faulty sectors
        * If miner does not show up at all, all sectors in a partition are marked as faulty \[detected fault]
      * Faults are associated with fees \[and those fees are expensive]
        * You avoid the fee if it is not a continued fault
      * Fault always cause removal of power
      * After 7 days of continued fault, sector is terminated and miner pay a huge fee
      * Fault can be recovered
        * Miner can declare a fault recovery. Sectors is back to active after the first correct prove on that sector after the recovery declaration
        * If you declare recovery a sector and you don't prove the sector itself, you pay fault fee
  * _Earning block reward_
    * Leader Election
      * Done at every block
        * Take randomness from Drand Beacon
        * Sign randomness
        * Hash
        * If output is lower than target you get elected
        * Target depends on your power in the power actor (miners claims)
          * Miner wins proportionally to power they have
          * Power considered in leader election is the one a miner had 900 blocks before (at each block you look at power in the past)
            * Why power from the past? Security of consensus
      * If you get elected you are allowed to win a block \[not a winner yet]
        * Miner address must still exist
        * Miner must be above min miner size
        * Miner must be eligible for election
          * Not eligible if miner is in debt (balance < 0 due to "too many" faults fees that can not be paid by the balance)
        * Miner must provide a proof of election + a windowpost
          * One of the miner's sectors is picked at random and miner has to answer 66 challenges on it
            * If you don't have the sector you can not prove it because of lack of time
              * It is not rational to remove sectors and recompute because one risks to lose block rewa

</details>

### Core Primitives (Optional reference) <a href="#core-primitives-optional-reference" id="core-primitives-optional-reference"></a>

* Lotus versioning scheme: [https://github.com/filecoin-project/lotus/discussions/7053](https://github.com/filecoin-project/lotus/discussions/7053)​
* Piece logistics: [https://spec.filecoin.io/#section-systems.filecoin\_files.piece ](https://spec.filecoin.io/#section-systems.filecoin\_files.piece)​
* Consensus: [https://spec.filecoin.io/#section-algorithms.expected\_consensus](https://spec.filecoin.io/#section-algorithms.expected\_consensus)
* Deal-making: [https://spec.filecoin.io/#section-systems.filecoin\_markets.storage\_market.deal-flow](https://spec.filecoin.io/#section-systems.filecoin\_markets.storage\_market.deal-flow)


### Storage Provider Resources (Optional)

{% embed url="https://youtu.be/XlqW3LrN578" %}

Mining Filecoin from a Storage Provider perspective

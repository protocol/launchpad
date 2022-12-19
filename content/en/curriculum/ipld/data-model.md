---
title: "The IPLD Data Model"
description: "Understand the IPLD data model"
draft: true
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 220
category: lecture
level:
- shallow
- deep
objectives:
  show: true
  goals:
  - "1.4"
  subgoals:
  - 1.41
  - 1.42
  - 1.43
  - 1.44
---
The Data Model is how we reason about data moving through the various states—in-memory, programmatic access and manipulation, and serialization to and from bytes for storage or transfers.

Like the JSON data model, the IPLD Data Model includes data **[Kinds](https://ipld.io/docs/schemas/using/authoring-guide/#schema-kinds)** which include **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Lists** and **Maps**, but also adds **[Bytes](https://ipld.io/docs/schemas/using/authoring-guide/#bytesprefix-unions-for-bytes)** and **[Links](https://ipld.io/docs/schemas/using/authoring-guide/#links)** (CIDs). 

The data model defines a common representation of basic types that **are easily representable by common programming languages** and **found in the most common and successful serialization formats**.

```js
const data = {
 string: "☺️  we can do strings!",
 ints: 1337,
 floats: 13.37,
 booleans: true,
 lists: [1, 2, 3],
 bytes: new Uint8Array([0x01, 0x03, 0x03, 0x07]),
 links: CID(bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae)
}
```

Read more about the Data Model at [**ipld.io/docs/data-model**](https://ipld.io/docs/data-model/)

## Kinds

We refer to the different kinds of representable data in the Data Model as "kinds": **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Bytes**, **Lists**, **Maps** and **Links**. The 'recursive kinds' are **Maps** and **Lists** (since they can contain other kinds). We use the term "kinds" here to disambiguate this from "types", which is a term we use at the Schemas level.

Read more about IPLD Kinds and specifics of what we expect regarding their bounds and representation at [ipld.io/docs/data-model/kinds](https://ipld.io/docs/data-model/kinds/)
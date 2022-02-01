# The IPLD Data Model

IPLD defines a **Data Model** that details the forms that data can take in memory, and through which a codec transforms that memory to and from encoded bytes.

Like the JSON data model, the IPLD Data Model includes **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Lists** and **Maps**, but also adds **Bytes** and **Links** (CIDs).

The Data Model is how we reason about data moving through the various states—in-memory, programmatic access and manipulation, and serialization to and from bytes for storage or transfers.

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

## Blocks and Nodes

IPLD data is either quantified in terms of **nodes** and **blocks**. A node is a **point in a graph**, while a block is a collective unit of data that is serialized and hashed to generate a content address (CIDs). Blocks typically include many nodes.

If we define an example *block* of data using JSON:

```json
{"a": ["b", "c"]}
```

We can see 5 *nodes*:

1. The enclosing map
2. The key (the string `"a"`)
3. The list
4. The first list value (the string `"b"`)
5. The second list value (the string `"c"`)

Read more about Nodes and their relationship to other IPLD concepts at [ipld.io/docs/data-model/node](https://ipld.io/docs/data-model/node/)

## Kinds

We refer to the different kinds of representable data in the Data Model as "kinds": **Booleans**, **Strings**, **Ints**, **Floats**, **Null**, **Bytes**, **Lists**, **Maps** and **Links**.

We use the term "kinds" here to disambiguate this from "types", which is a term we use at the [Schemas](ipld-schemas.md) level.

The 'recursive kinds' are **Maps** and **Lists** (since they can contain other kinds).

Read more about IPLD Kinds and specifics of what we expect regarding their bounds and representation at [ipld.io/docs/data-model/kinds](https://ipld.io/docs/data-model/kinds/)

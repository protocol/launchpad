# IPLD Schemas

IPLD concerns itself with the data layer of the distributed web. Its scope begins above the data storage and transmission layer, only interested in how data elements are encoded and decoded to a particular storage format and then presented in a consistent and usable form when above this encoding layer.

Schemas are an important tool for extending IPLD’s scope into the application layer, where coherent and useful data structures are important, rather than disjointed and atomized data elements. In this way, IPLD Schemas provide a barrier to prevent data encoding and storage concerns from leaking too heavily into the application layer. Instead, IPLD can present a clear data abstraction to distributed web developers, a strong separation of concerns. Further, IPLD Schemas contain tools to embed advanced logic able to power bi-directional transformations, further pushing data representation concerns out of the application layer.

```
type Message struct {
  msg String
  payload Payload
}

type Payload union {
  | Error "error"
  | Progress "progress"
  | Ping "ping"
} representation keyed

type Error string

type Progress struct {
  percent Float
  last String
}

type Ping struct {
  ts Int
  nonce String
}
```

## Use Cases

IPLD Schemas help us describe and reason about the *shape* of data that we expect to flow through an IPLD based system. With associated tooling, Schemas can also present a simplified and customized interface to an application's data concerns.

* **Schemas as a documentation tool**: At their most basic, IPLD Schemas are simply a method of describing the properties of data. The Schema DSL is simple (much simpler than other data schema languages), and as such it is a useful documentation tool because it is fairly easy to understand without much prior exposure. Their simple and clear definition also provides a much more sophisticated way to describe the shape of data than other traditional means (such as example data in a JSON form). Even though IPLD Schemas are a relatively new technology, you will find it being used in an increasing number of specifications and other documentation.
* **Schemas as a validation tool**: IPLD Schemas are designed to be efficient and have simple and predictable paths to matching data layouts for the purpose of validation. The data layouts described by IPLD Schemas are not exhaustive, but cover the most common forms that are fast to validate. Therefore, IPLD Schema types do not need to be deeply traversed to provide validation feedback.
* **Schemas as a versioning and migration tool**: The fast-validation nature of IPLD Schemas also lends itself to an excellent data versioning tool. As the form of serialized data changes over time, different schemas may be used to express those forms. Being able to attempt validation against different schemas and having efficiency guarantees means IPLD Schemas can be used as a data versioning tool.
* **Schemas as a transformational tool**: IPLD Schemas don't provide a sophisticated set of data transformational tools but they do provide a basic abstraction layer that can turn the simple IPLD Data Model types into forms that are more sympathetic to application design.
* **Schemas as a code generation tool**: IPLD Schemas provide a means to connect the serialization and deserialization process with application layer data structures. As such, they can be used to generate APIs and code to simplify and more tightly bound the data layer of a distributed web application.

## Kinds and Types

IPLD treats its Data Model as the base layer for data representation. As such, rather than referring to the elements of the data model as "types", they are "kinds". A "kind" is what is present at the Data Model layer as far as the tools for the Data Model are concerned (such as encoding formats).

We can take the Data Model's list of kinds and categorize them as either "scalar kinds" or "recursive kinds". A scalar kind being a singular element that does not contain additional kinds, such as an Int or String. A recursive kind is one that may contain other kinds. The recursive kinds are Map and List.

IPLD Schemas introduce additional kinds, without breaking the Data Model, simply by adding abstractions over the existing kinds. So schemas introduce:

* **Unions**: to describe a node that may be one (and only one) of a number of well-defined types.
* **Structs**: typically constructed of a Map with well-defined key/value pairs.
* **Enums**: a pre-defined set of strings or ints that a particular node must be.

An IPLD Schema document uses these kinds to define "**types**". A Schema "type" refers to the data elements that are described by Schemas, where we can piece together the basic kinds to form much more sophisticated data structures that have well-defined shapes and are generally associated with a name (there is limited support for anonymous types for convenience).

Much more information about IPLD Schemas can be found on the [IPLD Docs site](https://ipld.io/docs/schemas/).
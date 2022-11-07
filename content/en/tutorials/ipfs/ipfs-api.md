---
title: "The IPFS API (Tutorial)"
description: "Building a Go Application with the IPFS API – Deep Dive Tutorial"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipfs"
    tutorials:
        parent: "tutorials-ipfs"
weight: 160
category: tutorial
level:
- deep
---

## Background

When you run your IPFS node as a daemon, an HTTP RPC API is automatically exposed.
Because every CLI command is available on the API, you can use this API to programmatically operate as if you were using the IPFS CLI. Note that the IPFS API is not a REST API; all endpoints are accessible by using the HTTP POST method.

You can access the IPFS API endpoint for your local node at `http://localhost:5001/api/v0/<operation>`. Note that the `5001` port is used by default when you spin up your node.

Although accessing the API directly through HTTP requests is a valid approach, there are tools available for the two main programming languages of the IPFS ecosystem: Go (Golang) and JavaScript.

The main implementation of IPFS is [kubo](https://github.com/ipfs/kubo)(formerly go-ipfs), which allows you to set up your node by spinning up a daemon application written in Go. [JS-IPFS](https://github.com/ipfs/js-ipfs) is an officially supported implementation of IPFS in JavaScript. You can take three approaches to use these implementations in your application.

* **Embedded node:** if you want your application to spin up an IPFS node, then use `Go-IPFS` or `JS-IPFS`.
* **Client:** if you already have a running IPFS node, then you can use a client written in Go or JS to communicate with the node. Use [go-ipfs-api](https://github.com/ipfs/go-ipfs-api) for Go, and [js-ipfs-http-client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client) for JS.
* **HTTP API:** send HTTP requests directly from your Go or JS application through a HTTP gateway to interact with the node.

Both `JS-IPFS` and `js-ipfs-http-client` work in the browser with some considerations noted in their READMEs.

## Connecting to an IPFS node by using the Go client

In this exercise, you will use the Go client to interact with a running IPFS node.

By the end of the exercise, you should be able to:

* Connect to a running IPFS node.
* Add a file.
* Print the content of the file.
* Download the file to your computer.
* Add the file to IPNS.

## Video: IPFS API Tutorial

{{< youtube Ga9gfoZSm0Y>}}

### Prerequisites

* You must have Go installed. In this exercise, version 1.18 is used.
If you do not have Go installed, refer to [this page](https://go.dev/doc/install).
If you want to install multiple versions of Go, refer to [this page](https://go.dev/doc/manage-install#installing-multiple).
* Clone the `https://github.com/protocol/launchpad-tutorials` Git repository, which contains all the sample applications used in the Launchpad program.
* You must have an IPFS node running at the default `5001` port.
Watch [this video](https://www.youtube.com/watch?v=A7yZaYhrwyM) to learn how to spin up an IPFS node.

## Instructions

* In an editor, open the `ipfs-go-client` folder of the `launchpad-tutorials` repository.

* Examine the `go.mod` file, which contains the dependencies of the application.
Note that the `github.com/ipfs/go-ipfs-api` is set as a dependency, and the rest of dependencies are _indirect_. To read more about indirect dependencies in Go, refer to [this page](https://go.dev/ref/mod#go-mod-file-require).

* Open the `app/main.go` file, which contains the code for this exercise.
Notice that there are several not implemented methods, which you will complete throughout the exercise.

### Review the "main" Function

* Review the `func main()` (on ~ line 39), which is the entry point of the application. This function calls the different functions that you will implement and handles their result for you.

* A connection to the node is created by providing the location of the node's API (the default port 5001).

```go
sh := shell.NewShell("localhost:5001")
```

The `NewShell` method returns a `*shell.Shell` object that exposes all the available methods to interact with the IPFS node.

### Add a File Using the IPFS API

* Go back up to ~ line 15, and add a file that contains the `Hello from Launchpad!` text to IPFS in the `addFile` function:

```go
func addFile(sh *shell.Shell, text string) (string, error) {
    return sh.Add(strings.NewReader(text))
}
```

The `Add` method expects a reader, which can be generated from reading a local file or providing a string.
If no errors have occurred, the CID of the added file is returned.

### Read a File Using the IPFS API

* Next, you will read the content of the file by using the `Cat` method. Add in the following to the `readFile` function (on ~ line 19):

```go
func readFile(sh *shell.Shell, cid string) (*string, error) {
    reader, err := sh.Cat(fmt.Sprintf("/ipfs/%s", cid))
    if err != nil {
        return nil, fmt.Errorf("Error reading the file: %s", err.Error())
    }

    bytes, err := io.ReadAll(reader)
    if err != nil {
        return nil, fmt.Errorf("Error reading bytes: %s", err.Error())
    }

    text := string(bytes)

    return &text, nil
}
```

The `readFile()` function retrieves data and puts it in a buffer, converts it into a byte array, then converts that byte array into a string.

An IPFS [canonical path](https://docs.ipfs.io/how-to/address-ipfs-on-web/#turning-native-address-to-a-canonical-content-path) is passed to the `Cat` method. The `Cat` method returns a reader, so the `io.ReadAll` helper function is used to get the bytes of the file. Then, the bytes are cast into a string.

### Download a File Using the IPFS API

* In the next function, `downloadFile`, you will download the file to your computer by using the [Get method](https://github.com/ipfs/go-ipfs-api/blob/master/shell.go#L386) from the [Shell struct](https://github.com/ipfs/go-ipfs-api/blob/master/shell.go#L36). The `func downloadFile` returns a file using the CID:

```go
func downloadFile(sh *shell.Shell, cid string) error {
    return sh.Get(cid, YourLocalPath)
}
```

The `Get` method expects two parameters: the CID of the file and the local path of your computer where the file will be downloaded.

`YourLocalPath = "~/Path/to/Directory"` is a constant defined at the beginning of the `main.go` file, where you should add the path on your local machine that you want the files downloaded to (at ~ line 13).

### Publish a File to IPNS Using the IPFS API

To publish your file to IPNS you will need a public/private key pair, which is used as a _pointer_ to a CID. You can read more about IPNS [in the documentation](https://docs.ipfs.tech/concepts/ipns/).

By default, when you install a local IPFS node, a public/private key pair called `self` is created.

* In a new terminal window, list your IPFS keys.

```bash
> ipfs key list -l
<YOUR_PUBLIC_KEY>      self
```

If you have not created any other key pair, only the `self` keypair should be listed.
Copy the public key, which starts with `k...`, as you will need it to publish the file to IPNS.

* The `main.go` file defines a `YourPublicKey` constant at the beginning.
Include your public key in the constant.

```go
const YourPublicKey = "k..."
```

* Publish the file to IPNS by using the `PublishWithDetails` method in the `addToIPNS` function that is there already:

```go
func addToIPNS(sh *shell.Shell, cid string) error {
    var lifetime time.Duration = 50 * time.Hour
    var ttl time.Duration = 0 * time.Microsecond

    _, err := sh.PublishWithDetails(cid, YourPublicKey, lifetime, ttl, true)
    return err
}
```

The `PublishWithDetails` method expects several parameters:

1. `cid`: the CID of the file that will be published to IPNS.
2. `key`: the public key that will be used to publish the file.
In the previous snippet, the public key constant is provided.
3. `lifetime`: the time that the IPNS record will be valid.
Basically, how long IPNS will keep the mapping relationship `public key --> CID`.
By default, 24 hours.
4. `ttl`: how long IPNS will cache the record.
5. `resolve`: check if the given path can be resolved before publishing.
By default, `true`.

In the previous snippet, the record is kept in IPNS for 50 hours and there is no cache since the `ttl` variable is at 1 microsecond.

### Retrieve an IPNS Record Using the IPFS API

* Use your public key to query IPNS in the `resolveIPNS` function that is there. The result will be the CID of the file that you published.

```go
func resolveIPNS(sh *shell.Shell) (string, error) {
    return sh.Resolve(YourPublicKey)
}
```

### Run your Program
Verify that everything works together by running the Go application.
* Change directory with `cd` into the `ipfs-go-client/app` directory
* Make sure you have ipfs running (`ipfs daemon` in a separate terminal window) then:

```bash
> go run .
```

You should see output like:

```bash
Adding file to IPFS
File added with CID: QmNsA8eUBSbpdCVHMLa8Py5TcNoZ1D9U5GkginqktrqNF1

...output omitted...

IPNS is pointing to: /ipfs/QmNsA8eUBSbpdCVHMLa8Py5TcNoZ1D9U5GkginqktrqNF1
```

You can see an [example of the completed code here](https://github.com/protocol/launchpad-tutorials/blob/main/ipfs-go-client/solution/main.go)

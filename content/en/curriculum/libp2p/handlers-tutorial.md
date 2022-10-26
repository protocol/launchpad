---
title: "Using Stream Handlers (Tutorial)"
description: "Use go-libp2p to create a new stream of data"
draft: false
menu:
    curriculum:
        parent: "curriculum-libp2p"
weight: 316
category: tutorial
level:
- deep
---

In this tutorial, you will learn how to exchange data between two libp2p nodes by using streams (a _source node_ will send messages to a _target node_).

By the end of the exercise, you should be able to:

* Set stream handlers for specific protocols
* Open a new stream
* Send messages through a stream
* Read string data through a stream

## Video: Creating libp2p Handlers

{{< youtube 27fQqqqwYqY >}}

## Prerequisites

* You must have Go installed. In this exercise, version 1.18 is used.
If you do not have Go installed, refer to [this page](https://go.dev/doc/install).
If you want to install multiple versions of Go, refer to [this page](https://go.dev/doc/manage-install#installing-multiple).
* Clone the `https://github.com/protocol/launchpad-tutorials` Git repository, which contains all the sample applications used in the Launchpad program.

## Instructions

* Open the `libp2p-go-handlers` folder of the `launchpad-tutorials` repository in an IDE of your preference. The `app` subfolder contains the template that you will complete.

* In the `main.go` file, review the code.
There are several functions that you will implement in this tutorial.
The `main()` function manages the flow of the program by calling different helper functions.

### Review the "main" Function

* Let's understand the flow of the program. This program creates two libp2p nodes. The flow of the program works as follows:
    - Create the _target node_ (this is handled by the `runTargetNode` function).
    - The _source node_ needs to know the location of the _target node_ to establish a connection. Therefore, the `runTargetNode` function returns a `peer.AddrInfo`, containing the multiaddress and ID of the node.
    - Create a _source node_, which receives the _target node_ information as a parameter.

```go
func main() {
	ctx, _ := context.WithCancel(context.Background())

	// Create target node
	info := runTargetNode()
	// Create source node and provide the target node information
	runSourceNode(info)

	<-ctx.Done()
}
```

### Implement the Target Node

* In the `runTargetNode` function, add a new stream handler for the `/hello/1.0.0` protocol. The stream handler of a protocol specifies what to do when a stream for that protocol is opened in the node.
The [SetStreamHandler](https://github.com/libp2p/go-libp2p/blob/master/core/host/host.go#L52) method expects the ID of the protocol and the function to execute when a new message is received.

```go
func runTargetNode() peer.AddrInfo {
	log.Printf("Creating target node...")
	targetNode := createNode()
	log.Printf("Target node created with ID '%s'", targetNode.ID().String())

	// TO BE IMPLEMENTED: Set stream handler for the "/hello/1.0.0" protocol
	targetNode.SetStreamHandler("/hello/1.0.0", func(s network.Stream) {
		log.Printf("/hello/1.0.0 stream created")
		err := readHelloProtocol(s)
		if err != nil {
			s.Reset()
		} else {
			s.Close()
		}
	})

	return *host.InfoFromHost(targetNode)
}
```

In this tutorial, the `/hello/1.0.0` protocol is used as an example. In a real world application, you can specify handlers for the custom protocols that your application uses.

* Now, implement the `readHelloProtocol` function, which reads the content of the stream.

```go
func readHelloProtocol(s network.Stream) error {
	// TO BE IMPLEMENTED: Read the stream and print its content
	buf := bufio.NewReader(s)
	message, err := buf.ReadString('\n')
	if err != nil {
		return err
	}

	connection := s.Conn()

	log.Printf("Message from '%s': %s", connection.RemotePeer().String(), message)
	return nil
}
```

In the function, a new reader is created and the content is read as a string until a line break (`\n`) is found. Then, the connection is used to find out which peer sent the message.

### Implement the Source Node

* Let's move to the `runSourceNode` function. The source node is created and connected to the target node by using the information provided as a parameter. Let's open a stream for the `/hello/1.0.0` protocol and send a message.
The [NewStream](https://github.com/libp2p/go-libp2p/blob/master/core/host/host.go#L66) method expects a context, the ID of the peer to open the stream, and the ID of the protocol.

```go
func runSourceNode(targetNodeInfo peer.AddrInfo) {
	log.Printf("Creating source node...")
	sourceNode := createNode()
	log.Printf("Source node created with ID '%s'", sourceNode.ID().String())

	sourceNode.Connect(context.Background(), targetNodeInfo)

	// TO BE IMPLEMENTED: Open stream and send message
	stream, err := sourceNode.NewStream(context.Background(), targetNodeInfo.ID, "/hello/1.0.0")
	if err != nil {
		panic(err)
	}

	message := "Hello from Launchpad!\n"
	log.Printf("Sending message...")
	_, err = stream.Write([]byte(message))
	if err != nil {
		panic(err)
	}
}
```

You can read the code like "use the target node's connection to open a stream for the `/hello/1.0.0` protocol".

### Test the Application

* Let's test everything by running the Go application.

```bash
> go run  .
2022/09/08 12:08:02 Creating target node...
2022/09/08 12:08:02 Target node created with ID '12D3KooWF7r4SxND9Qf8uu9u3PtDduG5ET4NZf1Pw25BMqQEvXRP'
2022/09/08 12:08:02 Creating source node...
2022/09/08 12:08:02 Source node created with ID '12D3KooWMErSsjs4nPzTDjSvGcWipqyfJYxoSQJM57mTPWccEYQA'
2022/09/08 12:08:02 Sending message...
2022/09/08 12:08:02 /hello/1.0.0 stream created
2022/09/08 12:08:02 Message from '12D3KooWMErSsjs4nPzTDjSvGcWipqyfJYxoSQJM57mTPWccEYQA': Hello from Launchpad!
```

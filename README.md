# Launchpad
This repository contains intentionally organized and curated content for Protocol Labs' Launchpad program.
We welcome contributions, but please read the Contributing section below.

See the staging stite at: [https://empty-poetry-5978.on.fleek.co/](https://empty-poetry-5978.on.fleek.co/)

The default branch for this repository is **main** for the curriculum published on: https://curriculum.pl-launchpad.io/.

**!Important** The content published on the now deprecated Gitbook at https://protocol-labs.gitbook.io/launchpad-curriculum is configured & published from the **gitbook** branch.

## Contributing to the Launchpad Curriculum
We highly encourage collboration & contributions from others who are creating content! Adding tutorials to the Tutorials page of the platform, and Dev Tools pages are super helpful!
* See the [Style Guide](https://github.com/protocol/launchpad/blob/main/STYLE-GUIDE.md) for information on how to format the markdown and add content like images and videos
* See the [directions for creating tutorials and dev tools pages](https://github.com/protocol/launchpad/blob/main/templates/README.md)

* We would love to make a PR To help get you started! [ping the core contributors](https://github.com/protocol/launchpad/graphs/contributors) to this repository, or open an [Issue](https://github.com/protocol/launchpad/issues).

## Sections

### Pre-Requisites
* Web3 and Protocol Labs
* Building Web3
* Web3 Tools

### Launchpad Learning Resources
* [The Protocol Labs Network](docs/protocol-labs-network/README.md)
* [IPFS](docs/ipfs/README.md)
* [IPLD](docs/ipld/README.md)
* [LibP2p](docs/libp2p/README.md)
* [Filecoin](docs/filecoin/README.md)

### Dev Tools
* [Protocol Labs Toolkits & SDKs](docs/protocol-labs-toolkits-sdks/README.md)
* [Built on IPFS and Filecoin](docs/built-on-ipfs-filecoin/README.md)
* [Additional Learning](docs/additional-learning-resources/README.md)

## Hugo
Use Hugo to statically serve & preview files on your machine

* Create a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) of this repo or simply use `git clone git@github.com:protocol/launchpad.git`
* Open the `/launchpad` folder where you cloned it
* Install version 0.101.1 + of Hugo with `brew install hugo`
* Run `npm install` from the top level of the launchpad repository
* Run `hugo server` to start hugo & preview this on `localhost:1313`

> Note that you may have the run `npm install` on new/ others' branches you checkout and server before running `hugo server`

## Editing Content

Content is located in `content/en/` and the directories in there will be one of the links along the top of the page.

Edit the landing pages in `section-name/index.html` or `section-name.md`

Edit Sidebar content in `config/_default/menus/menus.en.toml`

### Content Maintainers

When editing content, please ask for a PR review from a content maintainer:
* Curriculum website structure, formatting, and maintenance: @chase
* PL Network: @rschanger
* web3 Basics: 
* IPFS: 
* IPLD:
* libp2p: 
* Filecoin: 
* DevTools: 
* Launchpad Getting Started: @momack2

### Content Maintainer Expectations

1. Review and merge new PRs to their section of the curriculum
2. Keep curriculum content "up to date" - including linking to new content when its source of truth moves to new locations (ex, if curriculum content is moved to a new source of truth, link to the new source of truth within the curriculum (and remove the duplicated content)
3. Review their curriculum section at least 1x/quarter to check for needed updates / deprecation / etc

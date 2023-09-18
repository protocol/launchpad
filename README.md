# Launchpad

This repository contains intentionally organized and curated content for
Protocol Labs' Launchpad program. We welcome contributions, but please read the
Contributing section below.

The default branch for this repository is **main** for the curriculum published
on: https://curriculum.pl-launchpad.io/.

**!Important!** The content published on the now deprecated Gitbook at
https://protocol-labs.gitbook.io/launchpad-curriculum is configured & published
from the **gitbook** branch.

## Contributing to the Launchpad Curriculum

We highly encourage collaboration & contributions from others who are creating
content! Adding tutorials to the Tutorials page of the platform, and Dev Tools
pages are super helpful!

- See the [Style
  Guide](https://github.com/protocol/launchpad/blob/main/STYLE-GUIDE.md) for
  information on how to format the markdown and add content like images and
  videos
- See the [directions for creating tutorials and dev tools
  pages](https://github.com/protocol/launchpad/blob/main/templates/README.md)

- We would love to make a PR To help get you started! [ping the core
  contributors](https://github.com/protocol/launchpad/graphs/contributors) to
  this repository, or open an
  [Issue](https://github.com/protocol/launchpad/issues).

## Sections

### Curriculum

- [Getting Started](content/en/curriculum/getting-started)
- [Web3](content/en/curriculum/web3)
- [The Protocol Labs Network](content/en/curriculum/pln)
- [IPFS](content/en/curriculum/ipfs)
- [Filecoin](content/en/curriculum/filecoin)
- [IPLD](content/en/curriculum/ipld)
- [LibP2p](content/en/curriculum/libp2p)
- [DevTools](content/en/curriculum/dev-tools)

### Tutorials

- [FVM](content/en/tutorials)
- [IPFS](content/en/ipfs-intro)
- [IPFS](content/en/ipld)
- [libp2p](content/en/libp2p)
- [Metamask](content/en/metamask-intro)

## Hugo

Use Hugo to statically serve & preview files on your machine

- Create a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
  of this repo or simply use `git clone git@github.com:protocol/launchpad.git`
- Open the `/launchpad` folder where you cloned it
- Install version 0.101.1 + of Hugo with `brew install hugo`
- Run `npm install` from the top level of the launchpad repository
- Run `hugo server` to start hugo & preview this on `localhost:1313`

> Note that you may have the run `npm install` on new/ others' branches you
> checkout and server before running `hugo server`

## Editing Content

Content is located in `content/en/` and the directories in there will be one of
the links along the top of the page.

Edit the landing pages in `section-name/index.html` or
`section-name/objectives.html` or `section-name.md`

Edit Sidebar content in `config/_default/menus/menus.en.toml`

When editing content, please ask for a PR review from a content maintainer:

- Curriculum website structure / formatting: @chase
- Getting Started: @momack2
- Web3:
- PL Network:
- IPFS:
- Filecoin:
- IPLD:
- libp2p:
- DevTools:

## Launchpad Homepage

The Launchpad homepage is now a single html file, which is also hosted by Hugo
and tracked in this repository at: `layouts/index.html`.

CSS for the homepage is mostly managed through tailwindcss, which gets installed
automatically with npm. Tailwindcss runs as a standalone application, monitoring
the source code, and generating only the css that will be needed. The command to
run the tailwindcss daemon from the root directory is:

<!-- prettier-ignore -->
```
npx tailwindcss -i ./static/css/tailwind-input.css -o ./static/css/tailwind-output.css --minify --watch
```

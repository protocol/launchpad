---
title: "Github Tips and Tricks"
description: "Github usage for open source contribution"
draft: false
menu:
    resources:
        parent: "resources-other"
weight: 80
---

{{< embed src="https://docs.google.com/presentation/d/11V_BA5A64lCY_wFsvuLO4je02zvzJwD5vf2kzONDWyc/embed" width="100%" height="30%">}}

## Protocol Labs on Github
There are a number of different Open Source Software (OSS) organizations and projects that are used to manage the code that makes up what we maintain at Protocol Labs. Everything created at PL is open source. To get to the organization or repo, just type in `github.com/<organization>/<repo>`

## Tutorial – Make a PR
In this tutorial, you will learn how to use the GUI to make a PR


## Guides
### Github Orgs & Repos

* **Protocol Labs**
  * /protocol – [https://github.com/protocol](https://github.com/protocol)
    * thing
    * /.github – [https://github.com/protocol/.github](https://github.com/protocol/.github)
* IPFS
  * /
* **IPLD**
  * /ipld – [https://github.com/ipld](https://github.com/ipld)
* **libp2p**
  * /libp2p – [https://github.com/libp2p](https://github.com/libp2p)
* **Filecoin**
  * /filecoin-project – [https://github.com/filecoin-project](https://github.com/filecoin-project)
    * /community – [https://github.com/filecoin-project/community](https://github.com/filecoin-project/community)
    * /bacalhau – [https://github.com/filecoin-project/bacalhau](https://github.com/filecoin-project/bacalhau)
    * /FIPs – [https://github.com/filecoin-project/FIPs](https://github.com/filecoin-project/FIPs)
    * /lotus – [https://github.com/filecoin-project/lotus](https://github.com/filecoin-project/lotus)
* **Other PLN Projects**
  * /filecoin-saturn – [https://github.com/filecoin-saturn](https://github.com/filecoin-saturn)
  * /drand - https://github.com/drand
  * * /boost –


### Markdown Guide

Every text input section in [GitHub uses Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/about-writing-and-formatting-on-github). Every Pull Request (PR), review, issue, and comment section supports markdown. Markdown is not specific to Github, but is it's own writing and formatting style. Github has added additional functionality to it that is only usable within Github like interacting with other users with @mentions, issue and PR references, and emoji's!

If you are contributing to open source repositories and organizations, here are some common uses seen in the wild:

<!-- This table was generate with https://www.tablesgenerator.com/markdown_tables -->

| Markdown                     | Command                  | Description                                                                                   |
|------------------------------|--------------------------|-----------------------------------------------------------------------------------------------|
| HEADER                       |             #            | Used for headings, add more symbols before the heading to change the size from 1 (biggest) to 6 (smallest).  |
| * unorderedList              |            */-           | Either a single `*` or `-` is used for _unordered lists_. Tabs create sub-lists.              |
| 1) numberedList              |         number)          | Used to create _numbered lists_. Tabs create sub-lists.                                       |
| > Quote                      |            >             | Used to quote other users responses.                                                          |
| \`code\` or \```codeblock\``` |       \`                | A single ` is used for just one line of code. A group of three ``` are used for multi-line code blocks.      |
| \[title\]\(www.example.com\) |       \[ ] ( )           |  Create URLs/Links in this format. With the text you want to display `[]` and the URL in `()`  |
| :thumbsup:                   |       :emoji name:       | Write the emoji name in between colons to create an emoji.                                     |
| :white_check_mark: Checklist |            []            | Github automatically creates a progression bar for checkboxes grouped together within Issues.  |
| @username                    |             @            | Github will create a link to the user and notify them (with respect to their preferences).     |
| #GHIssueNumber or PRNumber   |         # or GH-         | Github will automatically create a link to an Issue or PR, IF applicable. Else, it'll treat it like Heading. |

Source: [Github Writing Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), [Markdown Guide](https://www.markdownguide.org/cheat-sheet/)

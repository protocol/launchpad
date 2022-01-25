# Launchpad
This repository contains intentionally organized and curated content for Protocol Labs' Launchpad program.
We welcome contributions, but please read the [About Launchpad page](https://github.com/protocol/launchpad/blob/main/docs/about-launchpad.md) to see the steps to contribute.

This site is [published on GitBook](https://app.gitbook.com/o/-L_E2woSLfhpBp2IPz9k/s/dJC0yfHL6n4VMktmNXWq/)

## Sections
0. Pre-Requisites
1. The Protocol Labs Network
2. IPFS
3. IPLD
4. LibP2p
5. Filecoin
6. Protocol Labs Toolkits & SDKs
7. Built on IPFS and Filecoin


## Structure‌ for Gitbook
In `.gitbook.yml` the structure accepts two properties:‌

* `readme:` Your documentation's first page. Its default value is `./README.md`
* `summary:` Your documentation's table of content. Its default value is `./SUMMARY.md`

The value of those properties is a path to the corresponding files. The path is relative to the `root:` option. For example, here's how you can tell GitBook to look into a ./docs folder for the first page and summary:

```
root: ./docs/
structure:  
    readme: ./about-launchpad/README.md
    summary: ./product/SUMMARY.md
```
​
## Summary‌
The summary file is a Markdown file (`summary.md`) in `docs/` that should have the following structure:

```
‌# Table of Contents for GitBook
* [Top-Level Page](about-launchpad.md)

## Use headings to create page groups like this one​

* [First page's title](directory1/README.md)    
    * [Some child page](directory1/page1-1.md)    
    * [Some other child page](directory1/page1-2.md)

* [Second page's title](directory2/README.md)    
    * [Some child page](directory2/page2-1.md)    
    * [Some other child directory2](part2/page2-2.md)    

## A second-page group​

* [Yet another page](another-page.md)
```

Providing a custom summary file is optional. By default, GitBook will look for a file named SUMMARY.md in your root folder if specified in your config file, or at the root of the repository otherwise.
If you don't specify a summary, and GitBook does not find a SUMMARY.md file at the root of your docs, GitBook will infer the table of contents from the folder structure and the Markdown files below.‌

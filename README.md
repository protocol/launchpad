# Launchpad
This repository contains intentionally organized and curated content for Protocol Labs' Launchpad program.
We welcome contributions, but please read the [About Launchpad page](https://github.com/protocol/launchpad/blob/main/docs/about-launchpad.md) to see the steps to contribute.

This site is published on GitHub pages at *https://protocol.github.io/launchpad/*

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
readme: Your documentation's first page. Its default value is ./README.md
summary: Your documentation's table of content. Its default value is ./SUMMARY.md
The value of those properties is a path to the corresponding files. The path is relative to the "root" option. For example, here's how you can tell GitBook to look into a ./product folder for the first page and summary:

```
structure:  
    readme: ./product/README.md
    summary: ./product/SUMMARY.md
```
​
## Summary‌
The summary file is a Markdown file (.md) that should have the following structure:

```
‌# Summary​

## Use headings to create page groups like this one​

* [First page's title](page1/README.md)    
    * [Some child page](page1/page1-1.md)    
    * [Some other child page](part1/page1-2.md)

* [Second page's title](page2/README.md)    
    * [Some child page](page2/page2-1.md)    
    * [Some other child page](part2/page2-2.md)    

## A second-page group​

* [Yet another page](another-page.md)
```

Providing a custom summary file is optional. By default, GitBook will look for a file named SUMMARY.md in your root folder if specified in your config file, or at the root of the repository otherwise.
If you don't specify a summary, and GitBook does not find a SUMMARY.md file at the root of your docs, GitBook will infer the table of contents from the folder structure and the Markdown files below.‌

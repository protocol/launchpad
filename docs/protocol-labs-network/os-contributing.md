---
description: Contributing in Open Source
---

# Open Source Contribution

## The Projects
Get started contributing to IPFS Projects, with these high-traffic repos:

### PL Repos
* [go-ipfs](https://github.com/ipfs/go-ipfs) is a high traffic project, with many contributors from outside PL
* [libp2p](https://github.com/libp2p/go-libp2p-core)
* [ipfs-cluster](https://github.com/ipfs/ipfs-cluster)
* [js-ipfs](https://github.com/ipfs/js-ipfs) has multiple projects in a single repo
* [multiformats](https://github.com/multiformats/js-multiformats)
* [js-libp2p](https://github.com/libp2p/js-libp2p)
* [Filecoin Improvement Requests (FIPs)](https://github.com/filecoin-project/FIPs)

### Graphical/ User Interfaces
We often see issues being filled in these repos that end up getting moved elsewhere:
https://github.com/ipfs/ipfs-desktop/
https://github.com/ipfs/ipfs-webui/
https://github.com/ipfs/ipfs-companion/

### Docs
* [IPFS docs](https://github.com/ipfs/ipfs-docs)
* [libp2p docs](https://github.com/libp2p/docs)
* [IPLD docs](https://github.com/ipld/docs)
* [Filecoin docs](https://github.com/filecoin-project/filecoin-docs)
* [Lotus docs](https://github.com/filecoin-project/lotus-docs)

### Dashboards
* See this [dashboard for go-ipfs projects and tickets](https://github.com/orgs/ipfs/projects/16/views/1)

## How to Contribute

#### Contributing and Maintaining in Open Source | Steven Allen & Raul Kripalani

In This talk Steven Allen & Raul Kripalani will give tips and advice on how to make sure contributing to your open source project is effective, and maintains the spirit of positive communication and working together as a community to build great software in a way that teaches and elevates all member of a community.

{% embed url="https://youtu.be/A9Lo_rLNU9w" %}

#### Writing and Reviewing Great PRs

This document, covered in the video above, by Steven Allen and Raul Kripalani describes best practices for a thorough PR submission & review, along with an additional guide for Golang contributions.

{% embed url="https://docs.google.com/document/d/1EP6S8k-DNsDgIKmtrA_9YrCghq3F21IqhDh9THNuoOU/edit" %}

### Code Review Developer Guide

_This is an annotated version of Google's_ [_Code Review Developer Guide_](https://google.github.io/eng-practices/review/)

Code reviews should look at:

* Design: Is the code well-designed and appropriate for your system?
* Functionality: Does the code behave as the author likely intended? Is the way the code behaves good for its users?
* Complexity: Could the code be made simpler? Would another developer be able to easily understand and use this code when they come across it in the future?
* Tests: Does the code have correct and well-designed automated tests?
* Naming: Did the developer choose clear names for variables, classes, methods, etc.?
* Comments: Are the comments clear and useful?
* Style: Does the code follow our style guides?
* Documentation: Did the developer also update relevant documentation?

**Standards for Review**

The primary purpose of code review is to make sure that the overall code health of the code base is improving over time. All of the tools and processes of code review are designed to this end.

In order to accomplish this, a series of trade-offs have to be balanced.

First, developers must be able to make progress on their tasks. If you never submit an improvement to the codebase, then the codebase never improves. Also, if a reviewer makes it very difficult for any change to go in, then developers are disincentivized to make improvements in the future.

On the other hand, it is the duty of the reviewer to make sure that each CL is of such a quality that the overall code health of their codebase is not decreasing as time goes on.

**Principles**

Technical facts and data overrule opinions and personal preferences.

On matters of style, the style guide is the absolute authority. Any purely style point (whitespace, etc.) that is not in the style guide is a matter of personal preference. The style should be consistent with what is there. If there is no previous style, accept the author’s.

Aspects of software design are almost never a pure style issue or just a personal preference. They are based on underlying principles and should be weighed on those principles, not simply by personal opinion. Sometimes there are a few valid options.

If no other rule applies, then the reviewer may ask the author to be consistent with what is in the current codebase, as long as that doesn’t worsen the overall code health of the system

**Resolving Conflicts**

In any conflict on a code review, the first step should always be for the developer and reviewer to try to come to consensus, based on the contents of this document and the other documents in [The CL Author’s Guide](https://google.github.io/eng-practices/review/developer/) and this [Reviewer Guide](https://google.github.io/eng-practices/review/reviewer/).

When coming to consensus becomes especially difficult, it can help to have a face-to-face meeting or a video conference between the reviewer and the author, instead of just trying to resolve the conflict through code review comments. (If you do this, though, make sure to record the results of the discussion as a comment on the CL, for future readers.)

**Mentoring**

Code review can have an important function of teaching developers something new about a language, a framework, or general software design principles. It’s always fine to leave comments that help a developer learn something new. Sharing knowledge is part of improving the code health of a system over time.

**The Complete Guide**

See all the sections below for a comprehensive picture. The pages in these section contain recommendations on the best way to do code reviews, based on long experience. All together they represent one complete document, broken up into many separate sections. You don’t have to read them all, but many people have found it very helpful to themselves and their team to read the entire set.

* [The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html)
* [What to Look For In a Code Review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
* [Navigating a CL in Review](https://google.github.io/eng-practices/review/reviewer/navigate.html)
* [Speed of Code Reviews](https://google.github.io/eng-practices/review/reviewer/speed.html)
* [How to Write Code Review Comments](https://google.github.io/eng-practices/review/reviewer/comments.html)
* [Handling Pushback in Code Reviews](https://google.github.io/eng-practices/review/reviewer/pushback.html)

See also the [CL Author’s Guide](https://google.github.io/eng-practices/review/developer/), which gives detailed guidance to developers whose CLs are undergoing review.

# Style Guide

## Directory Structure
All the markdown content is within the `content/en` directory. If you don't want to include any images in the markdown, then you can simply create a markdown file with the corresponding name (e.g. `mutable-content.md`). However, if you want to include images, you must create a directory; in this directory, you place the different resources used in the markdown, as well as the markdown file itself, which must be called `index.md`.

_Example_
`Directory: content/en/curriculum/ipfs/mutable-content`
```
index.md
pinning.png
```

## Titles
* The name of a page is set in the `/docs/summary.md` page. Whatever you put on the list is what the page will be
* A single `#` will not show up on a page
* Main section titles will be created with two `##`, e.g.`## Main Title`
* Sub titles are created with three `###` e.g. `### Sub Title`
* Video titles and other embedded content will be created with four `####`, e.g. `#### Video Title | Presenter`. Try and include the video title with a pipe `|` and the people in the video/ creator

_Example_
```
#### Video Title | Organization Name(if not PL) - Name(s) of Presenters

In this talk by Steven & Dietrich, they review some of the customs and best practices involved when becoming a part of an open source community.

{% youtube GcvGc3pgOT8 %}
```

## Embedding

### Images Hosted Online
Images hosted online follow the format of
`![Alt text](https://url-of-image-on-web)`

_Example_
```
![Distributed Web](https://protocol.ai/assets/img/pl\_projects.87ac4e1b.png)
```

### Add Images Directly
To add your own images, use the directory structure explained previously in this guide.

For example, consider that you want to add an image to the `ipfs-api.md` file. First, you must convert the file into a directory, `ipfs-api`. Inside the directory, you place your image and the markdown file `index.md`, which contains the markdown content. Then, you can simply refer to the image:

```
![Protocol Labs Logo](name-of-image.png)
```

### General Embeds
The `embed` shortcode creates an _iframe_ with the URL provided. You can use it to embed videos, Google Docs/Slides, or any other web page.

To embed a Google Doc, make sure the Google slide is shared (likely publicly) with the audience who will be viewing it.
You can use either the URL of the from the page where you access it (ending in `/edit` or share the document, and copy the url from there. (Ends in `/share`)

Simply add it with the embed tags:
```
{% embed src="<link to document>" %}
```

Example 1:

```
{% embed src="https://docs.google.com/document/d/1EP6S8k-DNsDgIKmtrA_9YrCghq3F21IqhDh9THNuoOU/edit" width="500px" height="600px" %}
```

Example 2:

```
{% embed src="https://drive.google.com/file/d/1EHUXFm0SA4DiBlHTXnRQQ-vHXuQdyBCo/view?usp=sharing" width="100%" height="100%" %}
```

_Forms Example_

```
{% embed src="https://docs.google.com/forms/d/e/1FAIpQLSfBhz3elo3K8U6MpMKeO1-0CfTdTQwPaMSYJPi3bSNyFLm0Dw/viewform?usp=sf_link" %}
```

### Video Embeds - YouTube
A video embed requires it to be published to YouTube (typically as an unlisted video), and the URL to add it. Although you can use the general `embed` shortcode, there is one specifically for YouTube videos that you should use.

Simply add in video ID with `{% youtube video-id %}`

_Example_

```
{% youtube 2RCwZDRwk48 %}
```

## Tagging Content
In Launchpad, we have people with different learning needs, so we tag our content by using different _levels_. Currently, the levels supported are: `shallow` and `deep`.

To tag an entire page, use the `level` parameter in the metadata of the page. For example, the following page is shown to both _shallow_ and _deep_ residents.

```
---
title: "IPLD Resources"
description: "Explore beyond the curriculum"
draft: false
menu:
    curriculum:
        parent: "curriculum-ipld"
weight: 280
category: lecture
level:
- shallow
- deep
---
```

To tag a section of a page, use the `level` shortcode. For example, the following text is only shown to _deep_ residents.

```
{{% level type="[deep]" %}}
Text for shallow residents
{{% /level %}}
```

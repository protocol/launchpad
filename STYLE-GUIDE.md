# Style Guide

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

{% embed url="https://youtu.be/GcvGc3pgOT8" %}
```

## Embedding

### Images Hosted Online
Images hosted online follow the format of
`![Alt text](https://url-of-image-on-web)`

_Example_
```
![Distributed Web](https://protocol.ai/assets/img/pl\_projects.87ac4e1b.png)
```

### Add Images directly
To add your own images, add the image into the `.gitbook/assets` directory, then embed it as so:

```
![Protocol Labs Logo](<../../.gitbook/assets/name-of-image.png>)
```
> Note that one must have actual opening and closing `<>` symbols <../../gitbook/imagename.ext> around the path to the image

You can also add images in the ui by clicking and dragging, and the images will automatically be put into the `/docs/.gitbook/assets` directory


### Video Embeds - YouTube
A video embed requires it to be published to Youtube (typically as an unlisted video), and the URL to add it.

Simply add in the web address with `{% embed url"<https.youtube.com/video-url>" %}`

_Example_

```
{% embed url="https://www.youtube.com/watch?v=2RCwZDRwk48" %}
```

You can also add a YouTube video in the UI by pasting the YouTube URL and pressing enter

### Google Doc/ Slides Embeds

To embed a Google Doc, make sure the Google slide is shared (likely publicly) with the audience who will be viewing it.
You can use either the URL of the from the page where you access it (ending in `/edit` or share the document, and copy the url from there. (Ends in `/share`)

Simply add it with the embed tags:
```
{% embed url="<link to document>" %}
<Add a short description here>
{% endembed %}
```

Example 1:

```
{% embed url="https://docs.google.com/document/d/1EP6S8k-DNsDgIKmtrA_9YrCghq3F21IqhDh9THNuoOU/edit" %}
{% endembed %}
```

Example 2:

```
{% embed url="https://drive.google.com/file/d/1EHUXFm0SA4DiBlHTXnRQQ-vHXuQdyBCo/view?usp=sharing" %}
This video walks through major themes and takeaways from the doc above
{% endembed %}
```

_Forms Example_

```
{% embed url="https://docs.google.com/forms/d/e/1FAIpQLSfBhz3elo3K8U6MpMKeO1-0CfTdTQwPaMSYJPi3bSNyFLm0Dw/viewform?usp=sf_link" %}
```

## Code Snippets

When creating code snippets, use tabs (even if there is only an option in one language)

### Tabs Example

{% tabs %}
{% tab title="TypeScript" %}
```typescript
read(key: AES256, eNode: Encrypted<VNode>): Result<Failure, VNode>
```
{% endtab %}

{% tab title="Haskell" %}
```haskell
read :: AES256 -> Encrypted VirtualNode -> Either Failure VirtualNode
```
{% endtab %}
{% endtabs %}

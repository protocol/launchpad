# Style Guide

## Embedding

### Images Hosted Online
Images hosted online follow the format of
`![Alt text](https://url-of-image-on-web)`

_Example_
```
![Distributed Web](https://protocol.ai/assets/img/pl\_projects.87ac4e1b.png)
```

### Add Images directly
To add your own images, add the image into the `/docs/.gitbook/assets` directory, then embed it as so:
```
![Protocol Labs Logo](../.gitbook/assets/<name-of-image.png>)
```

You can also add images in the ui by clicking and dragging, and the images will automatically be put into the `/docs/.gitbook/assets` directory


### Video Embeds - YouTube
A video embed requires it to be published to Youtube (typically as an unlisted video), and the URL to add it.

Simply add in the web address with `{% embed url"<https.youtube.com/video-url>" %}`

_Example_
```
{% embed url="https://www.youtube.com/watch?v=2RCwZDRwk48" %}
```

You can also add a YouTube video in the UI by pasting the YouTube URL and pressing enter

### Google Doc Embeds


Example:
```
{% embed url="https://docs.google.com/document/d/1EP6S8k-DNsDgIKmtrA_9YrCghq3F21IqhDh9THNuoOU/edit" %}

{% embed url="https://drive.google.com/file/d/1EHUXFm0SA4DiBlHTXnRQQ-vHXuQdyBCo/view?usp=sharing" %}
This video walks through major themes and takeaways from the doc above
{% endembed %}
```

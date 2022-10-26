---
title: "Github Tips and Tricks"
description: "Github usage for open source contribution"
draft: false
menu:
    devtools:
        parent: "resources-other"
weight: 80
---

{{< embed "https://docs.google.com/presentation/d/11V_BA5A64lCY_wFsvuLO4je02zvzJwD5vf2kzONDWyc/embed" >}}

## Markdown quick guide

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
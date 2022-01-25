---
description: Open Source Culture and Stewardship
---

# Open Source Stewardship

## Protocol Labs: An Open Source Organization

Working at a company in the Protocol Labs Network (PLN) is a fairly unique experience. For many Labbers, your work will often require contributing to one or many open source projects. IPFS, libp2p, Filecoin, Multiformats, IPLD, and others are all projects created and sponsored by the PL Network. Each of these projects is an independent open source project, and each of them has needs and goals that span multiple organizations within and outside the PL Network.


#### Open Source Culture | Steven Allen & Dietrich Ayala

In this talk by Steven & Dietrich, they review some of the customs and best practices involved when becoming a part of an open source community.

{% embed url="https://youtu.be/GcvGc3pgOT8" %}

### Managing Roles

The tricky part in being an employee of a PL Network company, and a member of a project with its own independent goals, is not conflating the two in a way that is harmful to the community. Talking about company-specific endeavors, internal meetings, and events in public repositories or issues can make other community members feel left out, and uninvited.

One way to think about it, is to think of yourself as two people, or one person, but with two hats. When you are wearing that libp2p hat, you are not an employee of your Protocol Labs Network company, you are instead an open source contributor to libp2p. While wearing this hat, you are looking out for this project’s best interests, independent of what your PLN obligations are.

### Async Work & Communication for Open Source

_This is an annotated version of_ [_this Spaceport article_](https://protocol.almanac.io/docs/async-work-ezPny9x7Q50QISL4UIUhB3PoURV0lgxP)

Open async communication enables greater participation, keeps low-priority matters from interrupting high-priority work, and typically leaves a better paper trail.


### Sync Comms

Though we aim for async comms, **sync time is also valuable for bringing multiple parties into agreement, focused problem-solving sessions, and early-stage project formation**. Sync time, or synchronous communication, is widely recognized to be face to face conversations, or phone and video communications.

In time, this approach to comms builds momentum and enable us to:

* Build and maintain documentation
* Avoid many miscommunications
* Reduce our bus factor​
* Make the switch from proprietary to open-source far smoother

### Async Principles
[**The Async Manifesto**](http://asyncmanifesto.org), spells out many of these principles. Pay particular attention to are as follows:

* Valuing modern tools and flexible work environments over meetings and office hours
* Embracing flexibility in prioritization over detailed planning
* Creating comprehensive documentation over tribal knowledge

A high-bandwidth bidirectional communication channel is needed, either for brainstorming or decision making, where all relevant and interested parties can be gathered.

Relevant required readings are distributed in advance

### Async Communication Is Self Directing

Our goal is to have resources and processes that allow you, as an individual, to feel empowered to find all the answers to the questions you might have. With that said, here are some guidelines for helping you find what you’re looking for.

* Can’t find the doc? Have you read the main resource? Have you done a thorough search of all resources? Well then, you are really out of luck, BUT! you are probably not alone. Instead of pinging someone, consider it a bug, open an issue on GitHub, and let others answer it asynchronously.
* Need to get an answer to something?
  * Is it urgent? No? send an email.
  * Does it have to happen in the next 30 minutes? Yes, then ping the person or team on the channel of the respective work stream, not in a DM. It enables others to pick up an urgent item in case the main person is not available.
* If you know that the person is busy, then consider providing hints on how urgent the email is on the subject (i.e., **P0 to P4**). Also, be okay with writing emails that are one sentence long. Courtesy over conciseness can cost someone time.

Need something done? Create a GitHub issue, do the footwork of getting it to “ready” state, and assign it to someone.

Ideally, you’ll be able to add it to a team’s kanban board and make sure the team members know about it to make sure it will be covered in some team’s regular check-ins.

Need a decision made? Either open an issue or a pull request (PR) on GitHub. Make sure to identify key stakeholders and set a deadline for discussion/decision.

### Components of a Great Async Message

The 4 components of a great asynchronous message

🗣 Enough information to cover all follow-up questions. Don’t let yourself be the victim of an open loop; over-communicate if necessary.

📅 A deadline. When do you need a response by? How urgent is it? Which task is being blocked right now?

🔗 Links, images, and as much supporting material as possible. Again, include screenshots, screencasts, images, etc. – whatever will help illustrate your thoughts. Add these to emails, GitHub comments, posts, etc.

📥 A concrete need. What do you want to get out of the communication? Approval on a task? An asset of some kind? Be extremely clear.

## Contributing
### Contributing and Maintaining in Open Source
In This talk Steven Allen & Raul Kripalani will give tips and advice on how to make sure contributing to your open source project is effective, and maintains the spirit of positive communication and working together as a community to build great software in a way that teaches and elevates all member of a community.

{% embed url="https://youtu.be/A9Lo_rLNU9w" %}

#### Writing and Reviewing Great PRs

This document, covered in the video above, by Steven Allen and Raul Kripalani describes best practices for a thorough PR submission & review, along with an additional guide for Golang contributions.

{% embed url="https://docs.google.com/document/d/1EP6S8k-DNsDgIKmtrA_9YrCghq3F21IqhDh9THNuoOU/edit" %}

### Code Review Developer Guide
_This is an annotated version of Google's [_Code Review Developer Guide_](https://google.github.io/eng-practices/review/)_

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

### Healthy Team Habits (Optional)

{% embed url="https://youtu.be/XHyRCTTYBSA" %}

---
id: 61
title: 'My crazy idea to push the limits of CSS'
date: '2013-12-10T00:59:36+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=61'
permalink: /my-crazy-idea-to-push-the-limits-of-css/
categories:
    - 'Code &amp; Design'
---

CSS is for styling websites. JavaScript is for, amongst other things, interacting with DOM elements. We’ve long relied on JavaScript to come in when the extent of what can be done with CSS stops (think click events, DOM traversing, etc.). So wouldn’t it be super cool if we could push the limitations of CSS just a little bit further, so we don’t have to rely on JS for toggling classes, selecting DOM elements, and other things on the “presentational” layer? Kind of like closing the chasm between style and function.

\##I have an idea…

I’ve thought about how to mimick JS click events in CSS the most lately. The approach would work for other things like traversing up the DOM as well though.

Basically, in CSS there’s pseudo-classes like `:hover` and `:focus`. But it lacks a really powerful pseudo-class: `:click`. Simple as that.

In a pre-processor like Sass, it would ideally look something like this:

```
.a:click {
    // .b could be ANY element in the DOM
    .b {
        display: block;
    }
}

```

Traditionally in Sass of course, `.b` would be a child of `.a`. But stay with me here…

\##…but it’s kind of a hack

Let’s say, taking our example from above, that our markup looks like this:

```
<div class="container">
    <div class="a">Click me...</a>
</div>

<div class="other-container">
    <div class="b">...to show me</div>
</div>

```

Obviously, nesting `.b` under the `.a:click` psuedo-class in our Sass would ouput `.a:click .b`. And that is **A)** not our intent and **B)** going to throw errors and not work in a browser.

Here’s where the hack comes in. Using a Compass plugin or Ruby gem or something, what if we, before the Sass compiles to CSS, scan for instances of `:click` pseudo-classes and take both the element initiating `:click` and its nested element, prevent them from compiling into CSS and spit out some JavaScript instead?

Something like this, a simple `click` function:

```
$(".a").on("click", function () {
    $(".b").css("display", "block");
}

```

Essentially, we wouldn’t be making CSS do anything it can’t do. We’d just be more capable to interact with the DOM while still in our Sass file. No writing JavaScript!

\##Inline styles? What is this, 1995?

There’s obviously lots of concerns and questions I have about this, but a huge objection I have is using JavaScript to output inline styles. That’s no bueno.

So my current thought is this.

Instead of outputting inline styles, we could just add classes. There would need to be a way to either define in a config file what the default “something’s gonna happen if this class is added” class is (like `.active`), OR a special attribute we write alongside our `:click` pseudo-class (like `.a:click[.active]`).

\##There you have it

That’s my idea. I’m unsure at this point how far you could or would even want to go. How would you bring a `toggle` event over? What if you wanted to customize the outputted JS or expand upon it (every time you compile the Sass it’d overwrite the JS)? There’s tons of unknowns, but my aim is to get my idea out there, both for my own documentation purposes and for others to throw ideas around with me. Heck, maybe there’s already a Sass or Compass plugin out there that I don’t know about.

At any rate, I’m going to start looking into the technical details of doing something like this, probably by way of a Compass plugin. I’m not really sure if the way I am proposing can be done, but we’ll find out! Watch for another post if I make any headway, and please discuss in the comments!
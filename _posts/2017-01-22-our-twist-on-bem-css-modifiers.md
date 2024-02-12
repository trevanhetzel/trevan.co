---
id: 154
title: 'Our twist on BEM CSS modifiers'
date: '2017-01-22T01:26:45+00:00'
author: admin
layout: post
guid: 'https://trevan.co/?p=154'
permalink: /our-twist-on-bem-css-modifiers/
categories:
    - CSS
---

Over the past few years, I’ve found that the BEM CSS methodology falls closest in line with my preference for CSS authoring (although I do have a lot of respect for [Enduring CSS](https://leanpub.com/enduringcss/c/blog)). The block (parent), element (child/grandchild) and modifier work for nearly every scenario. However, there was always one thing with BEM that drove me nuts – **the way it recommends writing modifiers**.

According to the official [BEM](http://getbem.com/naming/) website, the way to declare modifiers is `.block__element--modifier`. The reasoning behind that is great, and it works well for short block names, but it leads to huge class strings in markup when you have multiple words in your block. And let’s face it, it’s extremely difficult to never use more than one word in a CSS class name. `.block` eventually becomes `.lego-block` because such a short ambiguous name is not intuitive. When you throw a modifier on that, the markup already starts to get lengthy – `lego-block lego-block--secondary`. If you have more than one modifier, you can definitely see the repetitive implications.

To get around this repetition, I wanted to simply remove the repeated text from the modifier. That would make `lego-block lego-block--secondary` simply `lego-block --secondary`. The double dashes are great because they visualize the fact that the text succeeding them is a modifier. There was one problem with that approach though – not all browsers support class selectors that don’t start with a letter.

So about a year I complained on Twitter about Safari (being the main culprit) not supporting class names that don’t start with a letter.

> I started using standalone CSS state classes. Like .—state &amp; scope them to their main sibling classes. But it doesn’t work in Safari 🙁
> 
> — Trevan Hetzel (@trevanhetzel) [February 3, 2016](https://twitter.com/trevanhetzel/status/694914983742693376)

<script async="" charset="utf-8" src="//platform.twitter.com/widgets.js"></script>

And I got a brilliant response from [Dylan Baumann](https://twitter.com/dylanbaumann) *(now a fellow front-end developer on my team at Flywheel)*.

> [@trevanhetzel](https://twitter.com/trevanhetzel) [@agentkyle](https://twitter.com/agentkyle) you might be able to circumvent it with:
> 
> \[class\*='-scope'\] { // stuff }
> 
> — Dylan Baumann (@dylanbaumann) [February 3, 2016](https://twitter.com/dylanbaumann/status/694921669337419777)

<script async="" charset="utf-8" src="//platform.twitter.com/widgets.js"></script>

CSS attribute selectors, of course! With an attribute selector, you can still write `lego-block --secondary` in the markup and not have to worry about browsers not reading it.

I contemplated long and hard about officially adopting this for my projects and our projects at Flywheel for the sole fact that attribute selectors are nasty and lengthy and feel like a hack. But you gotta choose your battles and this was one that I was okay with losing a hand in order to not lose a leg. The clarity it’s brought to our markup is well worth any extra bytes in the compiled CSS file. And to further drive home my decision, I experimented and found that gzip does such a great job at compressing repetitive code that the file size implications are very minimal. I also considered selector performance but, after reviewing [Ben Frain’s tests](https://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/), realized that shouldn’t be a worry at all.

## The mixin

We use a Sass mixin called `state`. The word “state” is something we decided on as a team that we preferred over the word “modifier”.

```
@mixin state($class, $parent: nil) {
    &[class*='--#{$class}'] {
        @content;
    }
}

```

The Sass usage is like so:

```
.lego-block {
    @include state(secondary) {
        // modifying code here
    }
}

```

And the HTML usage is simply `<div class="lego-block --secondary">`.
---
id: 79
title: 'A Pure CSS Approach to Tabs'
date: '2014-07-27T01:10:19+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=79'
permalink: /a-pure-css-approach-to-tabs/
categories:
    - CSS
---

I’ve been pretty interested lately in recreating JavaScript-like click events with pure CSS. One good use case for CSS click events is creating tabs. Creating full-featured tabs with current highlighting and having the first shown by default involves some dirty tweaks. Namely, to get it right using only one unordered list, the “first” tab actually needs to come last in the list. I’ll explain why in a bit, but first let’s look at the markup needed to pull this off. There are several ways people mark up pure CSS tabs, but I like the approach below simply becomes it keeps things organized together.

```
<ul class="tabs">
    <li id="tab2">
        <a href="#tab2" class="trigger">Tab 2</a>
        <div class="content">
          Content 2
        </div>
    </li>
    <li id="tab3">
        <a href="#tab3" class="trigger">Tab 3</a>
        <div class="content">
          Content 3
        </div>
    </li>
    <li id="tab1">
        <a href="#tab1" class="trigger">Tab 1</a>
        <div class="content">
          Content 1
        </div>
    </li>
</ul>

```

As you can see, with the layout above there’s no distinction of a tab row and content row. So the first thing to do is to make it appear like there is.

```
.tabs {
    position: relative;
    width: 25em;
    list-style: none;
    padding: 0;
}

.tabs li {
    float: left;
}

.trigger {
    display: block;
    padding: 0 .5em;
    width: 4em;
    color: #aaa;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
}

.content {
    position: absolute;
    top: 2em;
    left: 0;
    padding: 0 .5em;
}

```

That gives it a more “tab-like” feel. Also, notice how I defined a `width` on the `.trigger` anchors. I normally don’t like setting explicit widths and heights on things, but in this case we have to use a little hack to move the first item to the end of the list to get it shown by default. So we need widths on the anchors in order to know the exact `margin-left` value of the second anchor, since we’re going to position the first absolutely to the left. Again, it’s a hack, but it works pretty well if you can justify using explicit widths.

## Hooking it up

To get the tabs to actually work, we’ll utilize the CSS3 `:target` pseudo-selector. It works like this: when a URL’s hash matches an element’s ID, that element’s `:target` pseudo-class gets activated. So to create a “click event” in CSS with `:target`, you set an `href` an a “trigger” element equal to that of the ID of the element you wish to modify.

Let’s check it out.

```
li:target .content {
  display: block;
}

li:target .trigger {
  color: #000;
}

```

There’s our functioning tabs! Pretty simple, eh? The thing missing now is showing the first tab by default when the page loads. This is where putting the first item that you want shown in the tab list at the end of the list in the DOM comes in. That way (since CSS can’t traverse up the DOM), we can use CSS [general sibling selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors) to target the `last-child`. It took a while to figure this out myself, so I’ll try to explain better with code.

First, we need to set the default appearance of the last tab and anchor. That can be done by just piggybacking off of the previous styles that set tabs as active.

```
li:target .content,
li:last-child .content{
  display: block;
}

li:target .trigger,
li:last-child .trigger{
  color: #000;
}

```

Now that works to set the first item (technically last in the DOM, but hopefully you get the idea) as active by default, but now the first item is shown all the time, even when you click on another tab. So, here’s **really** where putting the first one last in the DOM comes in.

```
li:target ~ li:last-child .content {
    display: none;
}

li:target ~ li:last-child .trigger {
    color: #aaa;
}

```

Now when an item is targeted (its ID matches the hash in the URL and its `:target` pseudo-class is activated), using the general sibling selector we hide/change the appearance of the last item to make it no longer “active”.

## Final result

See the Pen [CSS tabs](http://codepen.io/trevanhetzel/pen/Hmewv/) by Trevan Hetzel ([@trevanhetzel](http://codepen.io/trevanhetzel)) on [CodePen](http://codepen.io).

<script async="" src="//codepen.io/assets/embed/ei.js"></script>

## What’s your approach to CSS tabs?

This is kind of my favorite approach to CSS tabs using `:target`, it’d be cool to hear everyone else’s in the comments. Checkboxes? Focus? Maybe you think CSS just sucks for tabs (it clearly has its limitations).
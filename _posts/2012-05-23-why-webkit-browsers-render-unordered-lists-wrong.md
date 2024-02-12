---
id: 19
title: 'Why Webkit browsers render unordered lists wrong'
date: '2012-05-23T22:01:39+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=19'
permalink: /why-webkit-browsers-render-unordered-lists-wrong/
categories:
    - 'Code &amp; Design'
---

I oftentimes use unordered lists for the main navigation of websites. I’ll style them by floating them, removing the list-style and adding background images. However, I’ve been running into this issue lately where Webkit browsers (like Google Chrome and Rockmelt) don’t render the list properly. They display it stacked vertically, instead of on a single horizontal line like it should be and how most all other browsers display it. And it’s quite random too. If I refresh the page several times, it might render it properly. Or it might not. Regardless, it’s left me mind-boggled and I’ve tried everything I could to it from happening.

It happened to me while I was coding my blog that you’re reading, so I made it a point to find out why. **Here’s why:**

Check out the original css, before I figured out what was wrong (shown is just the CSS pertaining to this issue):

```
ul#nav {margin:54px 0px 0px 0px; padding:0; float:right}
ul#nav a li {list-style:none; display:inline-block; float:left; margin:0}

```

Now here’s the css after I fixed the problem (again, only showing the CSS pertaining to the Webkit issue):

```
ul#nav {margin:54px 0px 0px 0px; padding:0}
ul#nav a li {list-style:none; display:inline-block; float:right; margin:0}

```

The problem I found was that the UL element had the property of `float: right` on it to align the entire list to the right. This shouldn’t be an issue, right? Wrong! The float property is what was causing the LI elements to stack up vertically instead of horizontally! Don’t ask me why. All I know is that removing the float property on the UL element caused the LI elements to display horizontally like I wanted them to. In my particular case I was lucky enough that simply changing the LI float property to `float: right` aligned the entire list to the right of the surrounding element, which is what I was after in the first place. So I just flipped the order that my LI’s were displayed (or else they would have read backwards), and I was all set. If you’re not so lucky and have to have a float property on your UL element, I would probably recommend just surrounding the UL in a div and float that div accordingly. Hope this helps someone out there who encounters this problem!
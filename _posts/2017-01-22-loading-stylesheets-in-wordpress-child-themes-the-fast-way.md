---
title: 'Loading stylesheets in WordPress child themes the fast way'
date: '2017-01-22T01:27:37+00:00'
layout: post
featured_image: '/assets/images/wordpress-shirt.jpg'
categories:
    - CSS
    - Performance
    - WordPress
---

Loading stylesheets in WordPress child themes is a pretty straightforward process. According to the [Codex](https://codex.wordpress.org/Child_Themes), you just add a `wp_enqueue_scripts` action that loads the parent theme’s stylesheet as well as the child theme’s stylesheet. Easy peasy.

However, you know me and extra asset requests 😉 I hate to request multiple CSS or JS files if I can help it. Loading the parent stylesheet with WordPress’ recommended `wp_enqueue_scripts` is going to end up making two calls – one for the parent stylesheet and one for the child. We don’t want none of that!

## Here’s what I’ve done to get around loading both those stylesheets

Using Sass, I just `@import` the parent theme’s `style.css`. That easy!

```
@import "../twentysixteen/style";

```

I can’t vouch for the reliability of this in all cases (relative paths for fonts or assets might not work in some themes), but it works for at least the Twenty Sixteen theme!
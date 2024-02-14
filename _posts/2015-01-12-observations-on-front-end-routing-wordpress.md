---
id: 89
title: 'Observations on Front-end Routing &#038; WordPress'
date: '2015-01-12T01:14:10+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=89'
permalink: /observations-on-front-end-routing-wordpress/
categories:
    - 'Code & Design'
---

Front-end frameworks are becoming wildly popular as a means of focusing more attention on the client side and giving sites that single page application feel. There are tons of articles on routing and accessing and displaying data for whatever front-end framework you’re using. However, I’ve found there to be a lack of documentation and resources for using front-end frameworks with the most popular CMS in the world: WordPress.

I’ve started to do quite a bit of research on using front-end frameworks with WordPress and the main issue I keep running into is that of routing. While front-end routing issues are not specific to just WordPress, my goal has been to figure out a solid solution to tackle front-end routing specifically related to WordPress.

# The problem with front-end routing

Front-end routing works great by default and can be very simple to use with WordPress. That is, **if** you don’t care about SEO and search engine friendly URLs. By default, the routers built in to Backbone, Angular, Ember, etc. usually serve pages by way of hashtags. For example, the route for a super awesome article might be `http://coolsite.com/#super-awesome-article`. Using the [History API](http://html5doctor.com/history-api/), the hashtag can be removed to serve a prettier URL like `http://coolsite.com/super-awesome-article`.

This is all great and works, like I said, if you don’t care about SEO. **But**, unless you’re building a user authenticated web app that doesn’t care about search engines indexing URLs, you should care about SEO. The thing is, web crawlers from Google and the like can’t see your URLs and the content served up by them because you’re creating it all on the client side with JavaScript, which the crawlers don’t typically run. So all a web crawler sees is whatever content your default page serves up from the server.

You might think (as I did) that `http://coolsite.com/super-awesome-article` would totally be crawlable by search engines since it looks, we’ll say, proper. But, while it does look like a proper URL structure, it’s still being created on the client side and JavaScript is just manipulating what the browser shows as the URL (using pixie dust, which is sprinkled into all front-end frameworks).

# What we can do to overcome SEO issues

There are, as I see it, two ways to provide web crawlers with content and still get that snappy, SPA feel of front-end routing.

## 1. Combine server routes and front-end routes

The first method, and the one which I *thought* would work the best, is to essentially use two different technologies to serve the same content: PHP and JavaScript. WordPress would create normal routes and use normal PHP templates, while JavaScript would “take over” once a template has been served.

I’ve been playing around with this method and can say that it’s just a lot of work and duplication of concerns. Here’s an example of what it looks like to serve up a standard WordPress post.

1. WordPress serves `/super-awesome-post`, pulling from the `page.php` template. This is what search engines see.
2. Use a Backbone (replace with your framework of choice) router to serve `/#super-awesome-post`, which pulls from a JavaScript template and uses a templating engine like Underscore’s or Handlebars to parse it.
3. Replace all permalinks with something like `<a href="#/<?php echo $post->post_name;?>">` so clicking on links uses the front-end routing solution.

### Duplication

While I still think this method has potential and could potentially be fully implemented, I’m finding it has more downsides than upsides to continue pursuing.

Mainly, you have to maintain two sets of templates for each route (PHP and JavaScript). I was actually really hoping to find a way to utilize just one template, like `page.php` for single pages, `front-page.php` for the home page, etc. Ideally, you would use a templating engine to remove all the PHP tags when rendering it on the client side, and somehow tell WordPress to ignore your templating engine tags when serving templates. Even if you could get that scenario working, your code would still contain lots of duplication. In the simplest form, duplication would look like below. In a more advanced form, you’d be doing logic in both PHP and JavaScript, which is just unwieldly.

```
<h1>
    <?php the_title(); ?> // What WP would see
    <%- post.title %> // What the JS templating engine would see
</h1>

```

## 2. Serve HTML snapshots to crawlers

The next method that I have yet to fully test out is that of using hashbangs and serving HTML snapshots to crawlers. Google actually has some [really good documentation](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started) on doing this, as they’ve recognized the rise of AJAX-y applications and the need to be able to index them.

Essentially, this method works by using `#!` (`/#!super-awesome-post`) in your URLs, which tells Google that this content is created dynamically on the front-end and to proceed with the next step.

The next step is where it gets tricky. You have to then tell crawlers where your static content actually is. It then reads that, but keeps your hashbang URL as the destination when users click on a search result.

Telling crawlers where your static content lives is done on the server side. My understanding of the process is that once a crawler sees the hashbang, it then requests the same URL, but with `_escaped_fragment_` in place of the `#!`. Using WordPress, you’d first have to make sure that `/?_escaped_fragment_super-awesome-post` maps to `/super-awesome-post`. You’d then have to serve an HTML snapshot to `/?_escaped_fragment_super-awesome-post` that contains static content.

HTML snapshots can be created in a [multitude](http://crawljax.com/) [of](http://htmlunit.sourceforge.net/) [ways](http://watij.com/). The thing that makes me cringe about HTML snapshots is that they appear to be pretty manual. Without some sort of server side script in place, it looks like you’d have to literally run a snapshot whenever you update your WordPress site (which can be quite frequent).

Google also [lists](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started) a method of using a meta tag if you don’t want to use the hashbang format (`<meta name="fragment" content="!">`).

# This is complicated

Both methods I’ve talked about are damn complicated and tedious. But hey, that’s why I’m writing about this: to find the simplest solution for front-end routing with WordPress! I’m probably going to try out the second method with the hashbangs and HTML snapshots in the near future, so stay tuned for a follow-up post with actual code and hopefully a working demo.

# Oh yeah, this is all possible courtesy of the WP REST API

I’ve spent the entirety of this article talking just about front-end routing, but I should note quickly that the use of front-end frameworks wouldn’t even be possible if we couldn’t fetch our WordPress data with AJAX. A project called the [WP REST API](http://wp-api.org/) essentially turns your WP data into JSON for easy access with AJAX and front-end frameworks. The plugin can be found [here](https://wordpress.org/plugins/json-rest-api/) and will apparently be included in WordPress core coming up very soon.
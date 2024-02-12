---
id: 138
title: 'Single page WordPress themes with Timber, Twig and Backbone'
date: '2015-12-28T00:14:31+00:00'
author: admin
layout: post
guid: 'http://trevan.co/?p=138'
permalink: /wordpress-timber-twig-backbone/
categories:
    - Backbone
    - JavaScript
    - WordPress
---

I wrote an [article](http://trevan.co/front-end-wordpress-theme/) nearly a year ago about building a front-end WordPress theme using Backbone. Since then, I’ve done a lot more research and experimenting and have come up with a pretty solid way of developing “single-page-esque” WordPress themes with Backbone (or React/Flux, Angular, Ember or any other front-end framework).

My big hurdle earlier in the year was the concept of server-side vs. client-side rendering. I couldn’t think of a good way to serve content from the server and the client without having duplicate templates for PHP and JavaScript, which is very cumbersome and repetitive. To reiterate why I think this topic is important, I think it comes down to two things: speed and SEO. On an initial page load, it’s much faster to have all content served directly from the server. And, even though Google supposedly crawls JavaScript now, I still feel safer giving search engines content directly from the server.

## Enter Timber

Luckily, I found a great solution to my rendering problems! It’s called [Timber](http://upstatement.com/timber/), a plugin that nicely pairs the [Twig templating engine](http://twig.sensiolabs.org/) with WordPress. Timber alone is a cool way to structure a normal theme with Twig templates. But the key to my use of Timber is the pairing of it with the Twig JavaScript library, [Twig.js](https://github.com/justjohn/twig.js/). Which means, shared templates!

You can use one single Twig template for both the server-side and the client-side rendering. This doesn’t eliminate the different server-side/client-side logic you still have to have to populate the templates with data, but it makes things a lot easier.

### PHP usage

Without going terribly in-depth in this article (I have an example for that), the basic jist is that instead of writing WordPress loops in your PHP templates, you utilize Timber for that. A single.php template that was previously littered with logic and templating turns into a very simple file that looks something like this:

```
<?php get_header(); ?>

<?php
$data = Timber::get_context();
$data['post'] = new TimberPost();
Timber::render('templates/article.twig', $data);
?>

<?php get_footer(); ?>

```

Timber does a lot of the heavy lifting of acquiring data for you, which is a huge plus.

### JavaScript usage

In the same way that you pass data into the .twig template using PHP, you do the same with your JavaScript framework. You don’t actually rely on the Timber plugin at all on the client side of things – just the Twig templates. The big difference is where the data is coming from. I’ve experimented with both using the [WP REST API](http://v2.wp-api.org/) and creating my own endpoints with admin-ajx.php. The benefit to using the REST API is that it’s already set up for you. The downfall is that the data structure it outputs doesn’t always align with the way the loop outputs data, making for lots of if/else checks inside the template. I’ve always prescribed to the definition of templates being solely for displaying data and not for logic, so I ultimately decided it best to create my own endpoints using admin ajax. This allows you to customize the output before serving it up, making it match the structure of the loop more closely.

I might do some more research on the REST API in the future and see if I can’t just use it in PHP, which would allow you to use the same data structure both on the server and the client side.

## Examples

So far I’ve developed two sites that use the method described in this article: [my blog](http://trevan.co) (you’re on it!) and our [culture blog](https://life.getflywheel.com/) at Flywheel. Both use Backbone (just plain Backbone, although the next site I build like this will probably utilize Marionette), Timber, twig.js, Gulp and Browserify.

My blog is [open sourced on GitHub](https://github.com/trevanhetzel/trevan.co), so the entire theme is open for you to take a look at it. If you wish to install it locally to play around with, the only requisite (besides Node to run Gulp) is the [Timber plugin](https://wordpress.org/plugins/timber-library/).

With the completion of these two projects and the fact that they’re live and pulling in decent amounts of traffic, I’m pretty excited to develop this idea of WordPress client-side/server-side shared templating even further. Look forward for more detailed technical posts on the matter and maybe even an online course!
---
id: 101
title: 'Managing critical CSS in a WP theme'
date: '2015-05-16T01:23:11+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=101'
permalink: /managing-critical-css-in-a-wp-theme/
categories:
    - Performance
    - WordPress
---

If you’ve been keeping up with the latest in front-end performance trends, you’ve no doubt heard of, and hopefully played around with, “critical CSS”. If you haven’t, go check out Scott Jehl’s [article](http://www.filamentgroup.com/lab/performance-rwd.html) on perceived performance first. Basically, to help with a site’s perceived performance, you can inline in the `<head>` only the styles that are critical for rendering the above-the-fold content that a user first sees upon visiting your site. Then, the full stylesheet is loaded in asyncrhonously. It works wonders! But, in all honesty, it kind of sucks to manage. Which is why I’d like to share a little workflow that I use when developing WordPress themes.

## Generating critical CSS

The best way to grab critical styles from a page is by using Grunt (or other task runner) paired with a task like [grunt-critical](https://github.com/bezoerb/grunt-critical) or [grunt-criticalcss](https://github.com/filamentgroup/grunt-criticalcss). Whenever you finish a page, just run it through the Grunt task and, voila, your critical styles are ready for use.

I don’t always have the greatest luck using the aforementioned tools, however, so lately I’ve just been using the [Penthouse web generator](http://jonassebastianohlsson.com/criticalpathcssgenerator/).

## Inlining critical CSS

If I wasn’t using WordPress (didn’t have to worry about a “global” header), I’d just throw the critical styles in a `<style>` tag and then load in the full stylesheet asynchronously using Filament Group’s [loadCSS](https://github.com/filamentgroup/loadCSS).

Like this:

```
<style><!-- Critical styles here --></style>

<script>
    // minified loadCSS function
    function loadCSS(e,n,o,t){"use strict";var d=window.document.createElement("link"),i=n||window.document.getElementsByTagName("script")[0],s=window.document.styleSheets;return d.rel="stylesheet",d.href=e,d.media="only x",t&&(d.onload=t),i.parentNode.insertBefore(d,i),d.onloadcssdefined=function(n){for(var o,t=0;t<s.length;t++)s[t].href&&s[t].href.indexOf(e)>-1&&(o=!0);o?n():setTimeout(function(){d.onloadcssdefined(n)})},d.onloadcssdefined(function(){d.media=o||"all"}),d}
    loadCSS("path/to/style.css");
</script>
<noscript><link href="path/to/style.css" rel="stylesheet"></noscript>

```

Doing this in a WordPress theme is a little more tricky though, because each template is going to have a different set of critical styles. So what I’ve been doing is assigning a variable in each template file to that page’s critical CSS after I generate it.

```
<?php global $critical;
$critical = 'your critical styles here'';
/* Template Name: Whatever */
get_header(); ?>

```

*Note: It’s important to set that as a global variable so it can be accessed in the `header.php` file.*

Then in `header.php`, I first check that a `$critical` variable is available. If it is, that’s where I inline those critical styles and use the loadCSS function. If `$critical` is not available, I just load the stylesheet normally using a `<link>` tag. It’s helpful to have that as a fallback in case you forget to grab the critical styles for a give template or just don’t want to.

The final code in `header.php` looks like this:

```
<?php global $critical;
    if ($critical): ?>
        <style><?php echo $critical ?></style>

        <script>
            // minified loadCSS function
            function loadCSS(e,n,o,t){"use strict";var d=window.document.createElement("link"),i=n||window.document.getElementsByTagName("script")[0],s=window.document.styleSheets;return d.rel="stylesheet",d.href=e,d.media="only x",t&&(d.onload=t),i.parentNode.insertBefore(d,i),d.onloadcssdefined=function(n){for(var o,t=0;t<s.length;t++)s[t].href&&s[t].href.indexOf(e)>-1&&(o=!0);o?n():setTimeout(function(){d.onloadcssdefined(n)})},d.onloadcssdefined(function(){d.media=o||"all"}),d}
            loadCSS("path/to/style.css");
        </script>
        <noscript><link href="path/to/style.css" rel="stylesheet"></noscript>
    <?php else: ?>
        <link href="path/to/style.css" rel="stylesheet">
    <?php endif; ?>

```

## Caching and cookies

Depending on how users typically get to your site, the most common thing that happens is that a user comes to your home page, sees content quickly because of the inlined critical CSS, then navigates in to another page. Well, since the full stylesheet will have already been loaded by the time they go to another page in your site, that stylesheet is most likely going to be cached by their browser. Thus, using critical styles on those internal pages actually add **more** weight to the page (albeit not much) because inline styles can’t be cached. This scenario, again, is just the most common one. It’s still good to inline critical styles on internal pages because users will not always go through your home page to get to them and still deserve a snappy experience.

To make sure you’re never inlining critical styles that don’t need to be inlined, you can take advantage of cookies. If a certain cookie is set, don’t inline critical styles. If it’s not set, inline critical styles and set that cookie.

Here’s the *final* final code I’ve been using:

```
<?php if(isset($_COOKIE['critical_css'])): ?>
    <link href="path/to/style.css" rel="stylesheet">
<?php global $critical;
elseif ($critical): ?>
    <style><?php echo $critical ?></style>

    <script>
        // minified loadCSS function
        function loadCSS(e,n,o,t){"use strict";var d=window.document.createElement("link"),i=n||window.document.getElementsByTagName("script")[0],s=window.document.styleSheets;return d.rel="stylesheet",d.href=e,d.media="only x",t&&(d.onload=t),i.parentNode.insertBefore(d,i),d.onloadcssdefined=function(n){for(var o,t=0;t<s.length;t++)s[t].href&&s[t].href.indexOf(e)>-1&&(o=!0);o?n():setTimeout(function(){d.onloadcssdefined(n)})},d.onloadcssdefined(function(){d.media=o||"all"}),d}
            loadCSS("path/to/style.css");
    </script>
    <noscript><link href="path/to/style.css" rel="stylesheet"></noscript>

    // Set cookie here
<?php else: ?>
    <link href="path/to/style.css" rel="stylesheet">
<?php endif; ?>

```
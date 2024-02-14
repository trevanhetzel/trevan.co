---
id: 87
title: 'Responsible Responsive Design: The Good Parts'
date: '2015-01-05T01:13:27+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=87'
permalink: /responsible-responsive-design-the-good-parts/
categories:
    - 'Code & Design'
    - CSS
---

If you’re a front-end developer and haven’t read [Scott Jehl](http://scottjehl.com/)‘s [Responsible Responsive Design](http://www.abookapart.com/products/responsible-responsive-design), you need to do it now. The latest from the [A Book Apart](http://www.abookapart.com/) library, Responsible Responsive Design covers some of the most relevant topics facing developers in 2015. So, after underlining a bunch of lines in my book, I decided to compile some of them into a list.

Here are what I found to be the “good parts” (really just my takeaways) of the book.

# Random nuggets of goodness

- The ideal number of characters per line in a layout should be between 45 – 75.
- Use [Tappy.js](https://github.com/filamentgroup/tappy) for fast event listeners that handle both touch and mouse interactions.
- Use `aria-hidden` to tell screen readers to ignore the contents of an element (i.e. when using `<a href="#">` or the like).
- Use CSS to specify viewport style (instead of the popular `<meta name="viewport" ... >`): `@viewport{width:device-width}`. Should continue using the `meta` tag for older browsers though.
- [Level 4 media queries](http://dev.w3.org/csswg/mediaqueries-4/) are going to be awesome (think `@media(touch)` to detect if touch is enabled on the device).
- [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) can detect CSS property support without JavaScript.
- The HTML5 shim is sometimes called a shiv because [this](https://github.com/aFarkas/html5shiv/#why-is-it-called-a-shiv).
- A great way to serve responsive stylesheets conditionally to old IE is told [here](http://adactio.com/journal/5964/) by Jeremy Keith (similar to [Sparkbox’s technique](http://seesparkbox.com/foundry/structuring_and_serving_styles_for_older_browsers)).

# General Performance

- Perceived performance is the most important.
- A one-second page load time is the de facto standard goal.
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) is the go-to tool for examining how optimized your site is.
- [WebPagetest](http://www.webpagetest.org/) is the go-to tool for testing actual performance (shoot for a low Speed Index; 1000 is a good goal).
- One of the easiest tools for image compression is [ImageOptim](https://imageoptim.com/).
- [OptiPNG](http://optipng.sourceforge.net/) and [jpegtran](http://jpegclub.org/jpegtran/) are two of Scott’s top choices for optimizing images via task runners like Grunt and Gulp.
- Using the HTML5 application cache for offline use is as simple as adding a file to your project called `whatever.appcache` (and of course referencing it in your HTML and adding which files to cache inside the `.appcache` file).

# Organizing &amp; referencing assets for performance

## CSS

- Only inline all your styles if they are less than 8kb.
- The first round-trip to the server carries ~14kb back to the browser.
- Critical CSS (styles that pertain to only things “above the fold” that users first see) should be inlined. [Grunt-CriticalCSS](https://github.com/filamentgroup/grunt-criticalcss/) helps determine which styles are critical.
- The rest of the site’s CSS should then be loaded in a non-blocking manner, NOT just with a `link` tag in the `head`. [`loadCSS`](https://github.com/filamentgroup/loadCSS) is a little script that loads stylesheets asynchronously.
- To be on the safe side, it’s best to include an actual link to the full stylesheet inside of a `noscript` tag as well.

## Images

- Unlike CSS and JavaScript, browsers request images asynchronously.
- If two background images are declared on the same selector with CSS, most browsers will only fetch the last one. ([researched](http://timkadlec.com/2012/04/media-query-asset-downloading-results/) by Tim Kadlec)
- Media query for detecting HD (retina) screens is `@media(min-resolution: 144dpi)`.
- [Data URIs](http://css-tricks.com/data-uris/) should only be used for global parts of a site that are shared across breakpoints and pages (i.e. a header or footer).

### Picture element

- Picture is used by declaring multiple `source` elements and an `img` element inside of a `picture` element.
- A browser runs through each `source` element, finds the one that matches the `media` attribute, and then sets the `img` element’s source to that matching `source` element’s `srcset` attribute value.
- You usually won’t even need to use the `picture` element. You can just use `srcset` attributes on an `img` element to instruct the browser which image to fetch at certain breakpoints.
- [Picturefill](https://github.com/scottjehl/picturefill) is a lightweight JavaScript polyfill that lets you use `picture` elements and attributes in a wide variety of browsers today.
- Picturefill can also be used to serve bitmap fallbacks to browsers that don’t support SVG.

## JavaScript

- Serve as few JavaScript assets as possible. Ideally, you’d concatenate and minify all your scripts into just one.
- jQuery is not always necessary. If you can swing it, consider using a lighter framework like [Shoestring](https://github.com/filamentgroup/shoestring).
- Using the `async` attribute allows scripts to be downloaded *while* the rest of the page is downloading.
- Using the `defer` attribute allows scripts to not be downloaded until *after* the rest of the page is downloaded.
- The best solution is to have scripts loaded dynamically by inlining a small function ([`loadJS`](https://github.com/filamentgroup/loadJS)) in the `<head>` that then appends `script` tags without blocking loading of the rest of the page.
- “Cutting the mustard” is an [approach](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) used to only serve JavaScript enhancements if a browser can support them.
- [enhance](https://github.com/filamentgroup/enhance) is the script that brings everything together! Inline it in the `<head>` and modify to fit your needs. It includes the `loadCSS` and `loadJS` functions and more.
- Use `meta` tags to define the paths to your “full” CSS file and JavaScript files.

### Cookies and caching

- Back to inlining critical CSS. Inline styles can’t be cached, so a browser loads them on each subsequent visit.
- You really only want those inline styles served on the first visit because browsers will cache the full stylesheet on that first visit.
- Detecting whether or not it’s a first time visit is done by setting a cookie. This requires some server-side logic to detect if a cookie is set (if set, it should not display the inline styles).
- The enhance.js script includes a cookie function for setting a cookie on the first visit.
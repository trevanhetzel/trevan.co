---
id: 93
title: 'Building a Front-end WordPress theme'
date: '2015-02-06T01:15:41+00:00'
author: admin
layout: post
guid: 'http://trevan.flywheelsites.com/?p=93'
permalink: /front-end-wordpress-theme/
categories:
    - Backbone
    - JavaScript
    - WordPress
---

A couple weeks ago I [wrote an article](http://trevan.co/front-end-routing-with-wordpress/) detailing my observations on front-end routing with WordPress. In order to test and play around with front-end routing, I created a very basic WordPress theme built with Backbone.js using the new [WP REST API](http://wp-api.org). In this article, I’ll walk through the creation of that theme and how to switch your mindset from building themes with PHP to building themes with JavaScript!

[View demo](http://ferouting.flywheelsites.com)

[View on GitHub](https://github.com/trevanhetzel/backbone-wp)

## The backbone of our Backbone app

Building a WordPress theme that relies more on the front-end than the back-end wouldn’t be possible without the WP REST API (technically it *would* be possible if you wanted to parse XML). The REST API is a plugin available for use now, lead by some awesome contributors who want to see a modern API in the most popular framework on the web. I actually talked with one of the project leads, Rachel Baker, on the Word-Break Show last week, so if you’re interested in learning more about the API I’d recommend [giving it a listen](http://word-break.com/podcast/episode-09-rachel-baker/).

### Installing the REST API plugin

The REST API plugin (called JSON REST API in the plugin directory) is so trivial to set up. Either [download it](https://wordpress.org/plugins/json-rest-api/) from the directory or install via your WP dashboard, activate it and you’re set. Seriously, it’s that simple. No configuration!

With the plugin installed, you can now hit its API endpoint (which lives at `/wp-json`) and retrieve data in JSON format. A full list of the data you can retrieve can be found on the project’s [documentation site](http://wp-api.org/#posts_retrieve-posts). A simple example AJAX call to retrieve all pages would look like this:

```
$.ajax({
    url: '/wp-json/posts?type=page',
}).done(function (posts) {
    console.log(posts);
});

```

The above would log an array of objects to the console. If, say we wanted to get all the page titles, you could loop through that response and pick out the `title` values.

```
$.ajax({
    url: '/wp-json/posts?type=page',
}).done(function (posts) {
    $.each(posts, function (index, post) {
        console.log(post.title)
    });
});

```

Hopefully you can see now how easily accessible your WordPress data can be with the use of the REST API. Now let’s get everything set up and start building out a site!

## Theme structure

Like any WordPress theme, we’ll need at least a stylesheet and an `index.php` file to be recognized as a theme. What I find so intriguing about building “front-end” themes is that there’s very little PHP needed. Only one PHP file is really needed just to serve up your initial markup and assets. I took it a little further and split things into a `header.php` and `footer.php` and also added a `functions.php` for a few things like image cropping.

The full structure of my theme looks like so:

- `js/`
    - `vendor/`
        - `backbone.min.js`
        - `jquery.min.js`
        - `underscore.min.js`
    - `app.js`
- `templates/`
    - `404.php`
    - `page.php`
- `footer.php`
- `functions.php`
- `header.php`
- `index.php`
- `style.css`

### PHP templates

Starting with what the server will serve up to browsers, `index.php` looks like this:

```
<?php get_header(); ?>

    <main id="content" class="wrapper"></main>

    <?php get_template_part('templates/page'); ?>
    <?php get_template_part('templates/404'); ?>

<?php get_footer(); ?>

```

Super simple. It first gets the header template, then declares an empty element that the JavaScript templates will be rendered in, then pulls in the actual page templates, and finally gets the footer template.

The big thing to note here is the two `get_template_part` calls to `templates/page` and `templates/404`. I’m using those for organizational purposes so that the `index.php` file itself is nice and slim, but the contents of those templates are ultimately outputted to the browser. Here’s what `templates/page.php` looks like.

```
<script id="page" type="text/template">
    <h2><%= data.title %></h2>

    <% if (data.featured_image) { %>
        <img src="<%= data.featured_image.guid %>" class="right">
    <% } %>

    <%= data.content %>
</script>

```

Notice first that everything is wrapped inside a `script` tag. A common way to use Backbone is to put templates inside of `script` tags with the `type` attribute set to `text/template`. Browsers can’t understand that script type so they will just ignore it. Thus, the markup of our theme is actually loaded one time, on initial page load. However, that doesn’t account for the loading of markup generated or switched out by Backbone whenever a view is switched. That is done on the client side using, in this case, Underscore’s templating engine.

Once everything is set up on the JavaScript side, things like `<%= data.content %>` will display whatever is in the content field for a particular post or page.

### JavaScript

I’m using three libraries for this theme: [Backbone](http://backbonejs.org/), [Underscore](http://underscorejs.org/) and [jQuery](http://jquery.com/). Underscore is a hard dependency of Backbone and jQuery pretty much is as well (for the router and DOM manipulation with `Backbone.View`). Aside from those libraries, the only other JavaScript file we have is `app.js` (name it whatever you’d like).

From here on out, the article is going to focus mainly on the contents of the `app.js` file, as that’s where all the fun stuff happens.

## Routing and views

The biggest part of the theme’s JavaScript is the router. It’s used to tell the browser what template to show for a given URL. This isn’t an exhausting article on how the Backbone router works, so it’s good to have a little understanding of it.

To start, we need to create new object extended from `Backbone.Router`. It will contain `initialize` and `routes` methods.

```
var ApplicationRouter = Backbone.Router.extend({
    initialize: function (el) { },

    routes: {
        '': function () {},
        '*else': function () {}
    }
});

// Kick off router
var router = new ApplicationRouter($('#content'));

// Use history API
Backbone.history.start();

```

After I created the constructor function `ApplicationRouter`, you’ll notice I created a new instance of it (assigned the variable `router`) and passed in the element that will contain the application content (`$('#content')`), which is then passed in to the `initialize` method as `el`.

After that, I’m utilizing the history API to manage URL locations (so users can go navigate back and forth between views). I am not, however, passing in `pushState: true`, which I’ve seen used quite a bit in articles. `pushState` has its place, for this example where we’ll be using a hasbang URL structure, it is not needed.

Now that we have an actual router, it’s time to fill it in. In the code above, I just used `''` and `*else` in the routes object. `''` tells the router what to do when the default route is served. `*else` is used for any other route that isn’t set in the `routes` object (we’ll use it for our 404 page). We’ll add more for the actual individual pages in a bit, but first let’s actually serve something to the two routes we’ve already defined.

```
var ApplicationRouter = Backbone.Router.extend({
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});
    },

    routes: {
        '': function () {
            this.switchView(this.pageView);
        },
        '*else': function () {
            this.switchView(this.notFoundView);
        }
    },

    // Switch out views
    switchView: function (view) {
        this.el.html(view.el);
        view.render();
    },
});

// Render views
var view = Backbone.View.extend({
    initialize: function (options) {
        this.template = options.template;
    },

    render: function (data) {
        var content = _.template($(this.template).html()),
        $(this.el).html(content);
    }
});

// Kick off router
var router = new ApplicationRouter($('#content'));

// Use history API
Backbone.history.start();

```

There’s quite a bit going on here, so bear with me. First, in the `initialize` method, I added `this.pageView` and `this.notFoundView`. They create instances of the new `view` object, which is extended from `Backbone.View` (a little further down). Note that I’m also passing in a value for `template`. The value of this needs to be the ID of the script tag in the markup that contains the corresponding template.

Next, inside the `''` and `*else` methods of the `routes` object, it’s now calling `this.switchView()`, passing in `this.pageView` and `this.notFoundView`, which I just explained. The `switchView` method is actually what switches out the templates and calls `render` on the view object. That `render` method grabs the contents of the script tag in the markup and parses it using Underscore’s templating engine. You’ll see why this is important in a minute, when we actually pass data through.

With all of this in place, if you were to run this in the browser you should have a nice little site with front-end routing. It should display the content inside the `#page` script whenever you’re on the index (`/`) route and the content inside the `#notfound` script on any other route.

## Retrieving data

Setting up the router and views is required building any Backbone application, so let’s now dive in to making this WordPress specific by pulling and displaying data from the REST API.

For this article, I’m operating under the impression that we know what five pages we want routes for and they’re hard-coded in the nav. I’m also assuming that they all five use the same template (`#page`). With that in mind, I’ve modified the `routes` object with five more routes.

```
routes: {
    '':
        function () {
            this.getPageContent(11, this.pageView);
        },

    '!beanie-baby':
        function () {
            this.getPageContent(11, this.pageView);
        },

    '!98-degrees':
        function () {
            this.getPageContent(13, this.pageView);
        },

    '!warheads':
        function () {
            this.getPageContent(5, this.pageView);
        },

    '!friends':
        function () {
            this.getPageContent(7, this.pageView);
        },

    '!aol':
        function () {
            this.getPageContent(9, this.pageView);
        },

    '*else':
        function () {
            this.switchView(this.notFoundView);
        }
},

```

You’ll notice something though: I’ve replaced the call to `this.switchView` with `this.getPageContent`. `getPageContent()` is a new function I set up to actually fetch the content from the API. It takes two parameters: `pageID` and `view`. It’s kind of just an extra step between switching views, because in its success callback we still call `this.switchView` to actually do the switching (only this time we have data with us now).

```
// Fetch the actual content from WP API
getPageContent: function (pageID, view) {
    var self = this;

    page.fetch({
        data: $.param({ type: 'page', 'filter[page_id]': pageID }),
        processData: true,
        success: function (result) {
            var page = result.toJSON();

            self.switchView(view, page[0]);
        }
    })
}

```

So, what is `page.fetch`? Well, `page` is actually a Backbone collection. It also has to be set up, outside of the `ApplicationRouter` object.

```
// Pages collection
var pageCollection = Backbone.Collection.extend({
    url: '/wp-json/posts'
});

var page = new pageCollection();

```

**Now** we’re talking! We now have a Backbone collection, view and router all working together.

Back to the `getPageContent` function, basically what it does is calls `.fetch` on the collection, passing in a filter `$.param({ type: 'page', 'filter[page_id]': pageID })`. The different options and ways you can fetch data can again be found on the WP API [documentation site](http://wp-api.org/#posts_retrieve-a-post). In this case, I’m just querying for a specific page, `pageID`, that is defined back up in the `routes` object when we call `this.getPageContent`.

So once it fetches and processes the data, I run `.toJSON()` on the data sent back and then pass it in to `switchView()`, which then calls the `render` method on the Backbone view, which then parses the data using Underscore.

*Phew!*

## Displaying data

The final piece of this theme is to actually display the data in the script templates. Let’s have a look at the contents of `templates/page.php` again:

```
<script id="page" type="text/template">
    <h2><%= data.title %></h2>

    <% if (data.featured_image) { %>
        <img src="<%= data.featured_image.guid %>" class="right">
    <% } %>

    <%= data.content %>
</script>

```

Basically, `data` is in reference to the object that got returned when we fetched it in `getPageContent` and then switched the view, passing it along. In the view’s `render` method, there’s a variable called `vars` that is set to `{data: data}` (the second `data` being the JSON object passed in here). That tells Underscore to parse anything that uses `data` in the template. So in our case, we’re calling `<%= data.title %>`, `<%= data.featured_image %>` and `<%= data.content %>`, all of which correspond to the WordPress data for a given page. Awesome!

Now the theme is pretty much done. It’s basic, but it’s a “front-end” theme nonetheless. Here is the full code (only addition is that of a current page “tracker”):

### Full code

```
var ApplicationRouter = Backbone.Router.extend({
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});
    },

    // Define front-end routes
    routes: {
        '':
            function () {
                this.setActiveEntry('#!beanie-baby');
                this.getPageContent(11, this.pageView);
            },

        '!beanie-baby':
            function () {
                this.setActiveEntry('#!beanie-baby');
                this.getPageContent(11, this.pageView);
            },

        '!98-degrees':
            function () {
                this.setActiveEntry('#!98-degrees');
                this.getPageContent(13, this.pageView);
            },

        '!warheads':
            function () {
                this.setActiveEntry('#!warheads');
                this.getPageContent(5, this.pageView);
            },

        '!friends':
            function () {
                this.setActiveEntry('#!friends');
                this.getPageContent(7, this.pageView);
            },

        '!aol':
            function () {
                this.setActiveEntry('#!aol');
                this.getPageContent(9, this.pageView);
            },

        '*else':
            function () {
                this.switchView(this.notFoundView);
            }
    },

    currentView: null,

    // Switch out views
    switchView: function (view, data) {
        if (this.currentView) {
            this.currentView.remove();
        }

        this.el.html(view.el);
        view.render(data);
        this.currentView = view;
    },

    // Handle active navigation
    setActiveEntry: function (url) {
        $('nav li').css({'font-weight': 'normal'});
        $("nav li a[href='" + url + "']").parents('li').css({'font-weight': 'bold'});
    },

    // Fetch the actual content from WP API
    getPageContent: function (pageID, view) {
        var self = this;

        page.fetch({
            data: $.param({ type: 'page', 'filter[page_id]': pageID }),
            processData: true,
            success: function (result) {
                var page = result.toJSON();

                self.switchView(view, page[0]);
            }
        })
    }
});

// Render views
var view = Backbone.View.extend({
    initialize: function (options) {
        this.template = options.template;
    },

    render: function (data) {
        var content = _.template($(this.template).html()),
            vars = {data: data},
            html = content(vars);

        $(this.el).html(html);
    }
});

// Pages collection
var pageCollection = Backbone.Collection.extend({
    url: '/wp-json/posts'
});

var page = new pageCollection();

// Kick off router
var router = new ApplicationRouter($('#content'));

// Use history API
Backbone.history.start();

```

## What about SEO?

Like I mentioned in the introduction, this whole project is pretty much so I can play around with front-end routing. I have this on a [Flywheel site ](http://ferouting.flywheelsites.com) and will start to mess around with how Google crawls this and what needs to be done to make it fully crawlable and indexed by search engines. Just know that right now, this whole example theme will most likely not be SEO friendly. Stay tuned for my front-end routing SEO ventures!
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

var Router = require('./router');
var router = new Router();

// Set silent to true to not load JS templates on page load
Backbone.history.start({ pushState: true, silent: true });

// Static search
var search = require('./mixins/static_search');
search.events();

// Load web fonts
require('./vendor/webfontloader.js');

WebFont.load({
  google: {
    families: [
      'Droid Serif:400',
      'Droid Serif:400italic',
      'Droid Serif:700',
      'Lato:400',
      'Lato:700'
    ]
  }
});

// Hi-jink all links to route using slashes
$(document).on('click', 'a[data-internal]', function (e) {
  if (! $(e.currentTarget).parents('#wpadminbar').length) {
    var href = $(this).attr('href'),
      protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      router.navigate(href, true);
    }
  }
});

// Google analytics
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-32067301-1', 'auto');
ga('send', 'pageview');

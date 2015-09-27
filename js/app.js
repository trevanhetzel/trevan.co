'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

var Router = require('./router');
var router = new Router();

// Set silent to true to not load JS templates on page load
Backbone.history.start({ pushState: true, silent: true });

// Hi-jink all links to route using slashes
$(document).on('click', 'a:not([data-bypass])', function (e) {
  if (! $(e.currentTarget).parents('#wpadminbar').length) {
    var href = $(this).attr('href'),
      protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      router.navigate(href, true);
    }
  }
});

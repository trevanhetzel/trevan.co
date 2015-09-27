'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Twig = require('twig');
var twig = Twig.twig;
var transition = require('../mixins/page_transition');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function () {
    this.$el = $('.wrapper');
    transition.start();
    this.render();
  },

  render: function () {
    var template = twig({
      href: '/wp-content/themes/trevan/templates/about.twig',
      async: false
    });
    
    // render the template
    var postsHTML = template.render();
    this.$el.html(postsHTML);

    transition.end();
  }
});

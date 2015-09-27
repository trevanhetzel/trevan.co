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
    this.fetch();
    
    transition.start();
  },

  fetch: function () {
    var self = this;

    this.collection.fetch({
      processData: true,
      data: $.param({
        action: 'return_all'
      }),
      success: function (data) {
        var result = data.toJSON();
        self.render(result);
      }
    });
  },

  render: function (data) {
    var template = twig({
      href: '/wp-content/themes/trevan/templates/home.twig',
      async: false
    });
    
    // render the template
    var postsHTML = template.render({posts: data});
    this.$el.html(postsHTML);

    transition.end();
  }
});

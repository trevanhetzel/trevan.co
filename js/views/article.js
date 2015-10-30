'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Twig = require('twig');
var twig = Twig.twig;
var transition = require('../mixins/page_transition');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function (options) {
    this.$el = $('.wrapper');
    this.slug = options.slug;
    this.fetch();

    transition.start();
  },

  fetch: function () {
    var self = this;

    this.collection.fetch({
      processData: true,
      data: $.param({
        action: 'return_one',
        slug: self.slug
      }),
      success: function (data) {
        var result = data.toJSON();

        self.render(result[0]);

        // Set page title
        document.title = result[0].title + ' - Trevan Hetzel';
      }
    });
  },

  render: function (data) {
    var template = twig({
      href: '/wp-content/themes/trevan/templates/article.twig',
      async: false
    });

    // render the template
    var postsHTML = template.render({post: data});
    this.$el.html(postsHTML);

    transition.end();
  }
});

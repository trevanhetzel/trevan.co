'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var HomeView = require('./views/home');
var ArticleView = require('./views/article');
var PostsCollection = require('./collections/posts');

Backbone.$ = $;

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.$el = $('body');
  },

  routes: {
    '': 'home',
    'projects': 'projects',
    'speaking': 'speaking',
    'about': 'about',
    ':slug': 'article'
  },

  home: function () {
    var homeView = new HomeView({collection: new PostsCollection});
  },

  projects: function () {
    console.log('project');
  },

  speaking: function () {
    console.log('speaking');
  },

  about: function () {
    console.log('about');
  },

  article: function (slug) {
    var articleView = new ArticleView({collection: new PostsCollection, slug: slug});
  }
});

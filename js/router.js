'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

// Require views
var HomeView = require('./views/home');
var ArticleView = require('./views/article');
var ProjectsView = require('./views/projects');
var SpeakingView = require('./views/speaking');
var AboutView = require('./views/about');

// Require collections
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

    document.title = 'Trevan Hetzel';
  },

  projects: function () {
    var projectsView = new ProjectsView();

    document.title = 'Projects - Trevan Hetzel';
  },

  speaking: function () {
    var speakingView = new SpeakingView();

    document.title = 'Speaking - Trevan Hetzel';
  },

  about: function () {
    var aboutView = new AboutView();

    document.title = 'About - Trevan Hetzel';
  },

  article: function (slug) {
    var articleView = new ArticleView({collection: new PostsCollection, slug: slug});
  }
});

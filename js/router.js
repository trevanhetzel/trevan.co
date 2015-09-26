'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var HomeView = require('./views/home');

Backbone.$ = $;

module.exports = Backbone.Router.extend({
    initialize: function () {
        this.$el = $('body');
    },

    routes: {
        '': 'home'
    },

    home: function () {
        var homeView = new HomeView(this.el);
    }
});

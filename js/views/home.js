'use strict';

var $ = require('jquery')(window);
var Backbone = require('backbone');

Backbone.$ = $;

module.exports = Backbone.View.extend({
    initialize: function () {
        console.log("home initialize");
    }
});

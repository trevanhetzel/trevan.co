'use strict';

var $ = require('jquery');

module.exports = {
  start: function () {
    $('body').addClass('loading');

    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 200);
  },

  end: function () {
    $('body').removeClass('loading');
  }
}

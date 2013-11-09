/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

    	// Initialize syntax highlighting
    	hljs.initHighlightingOnLoad();

    	// Initialize Reading Time plugin
        $('.post--content').each(function() {
            $(this).readingTime({
            	readingTimeTarget: '.post-reading-time'
            });
        });

    });

}(jQuery));
/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    'use strict';

    $(document).ready(function () {

    	// Initialize syntax highlighting
    	hljs.initHighlightingOnLoad();

    	// Initialize Reading Time plugin
        $('.post--content').each(function() {
            $(this).readingTime({
            	readingTimeTarget: '.post-reading-time'
            });
        });

        // Cache jQuery objects
        var $tagList = $('.tags');

        // Run through tag objects and put them in the DOM
        function displayTags (data) {
            var tags = data.data.tags,
                postsTags = data.data.posts_tags,
                ptArray = [];

            for (var postTag in postsTags) {
                var pId = postsTags[postTag].post_id,
                    tId = postsTags[postTag].tag_id;

                ptArray.push({
                    "post": pId,
                    "tag": tId
                });
            }

            for (var tag in tags) {
                var tagName = tags[tag].name,
                    tagSlug = tags[tag].slug,
                    tagId = tags[tag].id,
                    tagCount = 0;

                $.each(ptArray, function (index, entry) {
                    if (tagId == entry.tag) {
                        tagCount++;
                    }
                });

                if (!(tagId == 1 || tagId == 2 || tagId == 3 || tagId == 4)) {
                    $tagList
                        .append('<li><a href="/tag/' + tagSlug + '">' + tagName +
                        '<span class="tags--count">(' + tagCount + ')</span></li>');
                }
            }
        }

        // Request the JSON & set/get to/from localStorage
        $(function () {
            // Get from localStorage
            var tags = localStorage.getItem("tags");

            // If it's in localStorage, go ahead run the display function
            if (tags != null) {
                displayTags(JSON.parse(tags));
            } else {
                // Else, do the request
                $.getJSON('/ghost/export/', function (data) {
                    displayTags(data);

                    // Save to localStorage
                    localStorage.setItem("tags", JSON.stringify(data));
                });
            }
        });
    });

}(jQuery));
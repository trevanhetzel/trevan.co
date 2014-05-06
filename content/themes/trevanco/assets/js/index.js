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
                ptArray = [],
                totalTagCount = ptArray.length;

            for (var postTag in postsTags) {
                var pId = postsTags[postTag].post_id,
                    tId = postsTags[postTag].tag_id;

                ptArray.push({
                    "post": pId,
                    "tag": tId
                });
            }

            for (var tag in tags) {
                var tagId = tags[tag].id;

                $.each(ptArray, function (index, entry) {
                    if (tagId == entry.tag) {
                        totalTagCount++;
                    }
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

                var percent = (tagCount / totalTagCount).toFixed(1),
                    basePerc = 64,
                    percGroup = null;

                switch (percent) {
                    case "0.1":
                        percGroup = basePerc + 3 + "%";
                        break;

                    case "0.2":
                        percGroup = basePerc + 7 + "%";
                        break;

                    case "0.3":
                        percGroup = basePerc + 11 + "%";
                        break;

                    case "0.4":
                        percGroup = basePerc + 15 + "%";
                        break;

                    case "0.5":
                        percGroup = basePerc + 19 + "%";
                        break;

                    case "0.6":
                        percGroup = basePerc + 23 + "%";
                        break;

                    case "0.7":
                        percGroup = basePerc + 29 + "%";
                        break;

                    case "0.8":
                        percGroup = basePerc + 31 + "%";
                        break;

                    case "0.9":
                        percGroup = basePerc + 35 + "%";
                }

                if (!(tagId == 1 || tagId == 2 || tagId == 3 || tagId == 4)) {
                    $tagList
                        .append('<li><a href="/tag/' + tagSlug + '" style="width:' + percGroup + '"">' + tagName +
                        '<span class="tags--count">' + tagCount + '</span></li>');
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